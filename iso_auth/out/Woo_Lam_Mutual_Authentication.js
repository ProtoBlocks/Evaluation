const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const Woo_Lam_Mutual_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "Woo_Lam_Mutual_Authentication",
  principals: [{
    name: "Alice",
    inputs: ["KAT"]
  }, {
    name: "Bob",
    inputs: ["KBT"]
  }, {
    name: "Trent",
    inputs: ["KAT", "KBT"]
  }],
  steps: [{
    origin: "Alice",
    recipients: ["Bob"],
    name: "Hello",
    function: async (Alice, Bob) => {
      Bob.send({
        "Id": Alice.Id
      });
    }
  }, {
    origin: "Bob",
    recipients: ["Alice"],
    name: "Challenge",
    function: async (Bob, Alice) => {
      const Nonce = nonce();
      Alice.send({
        "Nonce": Nonce
      });
    }
  }, {
    origin: "Alice",
    recipients: ["Bob"],
    name: "Response",
    function: async (Alice, Bob) => {
      const Ciphertext = encrypt(Bob.Challenge.Nonce, Alice.Input.KAT);
      Bob.send({
        "Ciphertext": Ciphertext
      });
    }
  }, {
    origin: "Bob",
    recipients: ["Trent"],
    name: "Validation",
    function: async (Bob, Trent) => {
      const Ciphertext = encrypt(Alice.Response.Ciphertext, Bob.Input.KBT);
      Trent.send({
        "Ciphertext": Ciphertext
      });
    }
  }, {
    origin: "Trent",
    recipients: ["Bob"],
    name: "Proof",
    function: async (Trent, Bob) => {
      const Inner = decrypt(Bob.Validation.Ciphertext, Trent.Input.KBT);
      const Nonce = decrypt(Inner, Trent.Input.KAT);
      const Ciphertext = encrypt(Nonce, Trent.Input.KBT);
      Bob.send({
        "Ciphertext": Ciphertext
      });
    }
  }, {
    origin: "Bob",
    recipients: [],
    name: "Verify",
    function: async Bob => {
      const Nonce = decrypt(Trent.Proof.Ciphertext, Bob.Input.KBT);
      return Nonce === Bob.Challenge.Nonce;
    }
  }]
});
