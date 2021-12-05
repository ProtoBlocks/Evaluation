const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const ISO_Public_Key_2_Pass_Unilateral_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "ISO_Public_Key_2_Pass_Unilateral_Authentication",
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
    function: async ({
      verifier: Verifier,
      prover: Prover
    }) => {
      const Nonce = nonce();
      Prover.send({
        "Nonce": Nonce
      });
    }
  }, {
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Response",
    function: async ({
      prover: Prover,
      verifier: Verifier
    }) => {
      const Signature = sign(Verifier.Challenge.Nonce + Verifier.Id, Prover.Input.PrivateKey);
      Verifier.send({
        "Signature": Signature
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async ({
      verifier: Verifier
    }) => {
      const Verify = verify(Verifier.Challenge.Nonce + Verifier.Id, Verifier.Input.PublicKey);
      return Verify;
    }
  }]
});
