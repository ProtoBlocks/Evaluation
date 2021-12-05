const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const ISO_3_Pass_Mutual_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "ISO_3_Pass_Mutual_Authentication",
  principals: [{
    name: "Alice",
    inputs: ["AliceSecret", "BobPublic"]
  }, {
    name: "Bob",
    inputs: ["BobSecret", "AlicePublic"]
  }],
  steps: [{
    origin: "Bob",
    recipients: ["Alice"],
    name: "Input",
    function: async ({
      bob: Bob,
      alice: Alice
    }) => {
      const Nonce = nonce();
      Prover.send({
        "Nonce": Nonce
      });
    }
  }, {
    origin: "Alice",
    recipients: ["Bob"],
    name: "AliceProve",
    function: async ({
      alice: Alice,
      bob: Bob
    }) => {
      const Signature = sign(Bob.Input.Nonce + Bob.Id, Alice.Input.AliceSecret);
      const Nonce = nonce();
      Prover.send({
        "Signature": Signature,
        "Nonce": Nonce
      });
    }
  }, {
    origin: "Bob",
    recipients: ["Alice"],
    name: "BobProveVerify",
    function: async ({
      bob: Bob,
      alice: Alice
    }) => {
      const Signature = sign(Alice.AliceProve.Nonce + Alice.Id, Bob.Input.BobSecret);
      const Verify = verify(Bob.Input.Nonce + Bob.Id, Bob.Input.AlicePublic);
      Prover.send({
        "Signature": Signature,
        "Verify": Verify
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "AliceVerify",
    function: async ({
      verifier: Verifier
    }) => {
      const Verify = verify(Alice.AliceProve.Nonce + Alice.Id, Alice.Input.BobPublic);
      return Verify && Bob.BobProveVerify.Verify;
    }
  }]
});
