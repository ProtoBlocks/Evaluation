const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication",
  principals: [{
    name: "Prover",
    inputs: ["PrivateKey"]
  }, {
    name: "Verifier",
    inputs: ["PublicKey"]
  }],
  steps: [{
    origin: "Verifier",
    recipients: ["Prover"],
    name: "Challenge",
    function: async (Verifier, Prover) => {
      const Nonce = 12345;
      const Ciphertext = encrypt(Nonce, Verifier.Input.PublicKey);
      Prover.send({
        "Ciphertext": Ciphertext
      });
    }
  }, {
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Response",
    function: async (Prover, Verifier) => {
      const Plaintext = decrypt(Verifier.Challenge.Ciphertext, Prover.Input.PrivateKey);
      Verifier.send({
        "Plaintext": Plaintext
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Nonce = 12345;
      return Plaintext === Nonce;
    }
  }]
});
