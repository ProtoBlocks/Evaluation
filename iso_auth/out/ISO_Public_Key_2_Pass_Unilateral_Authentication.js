yarn run v1.22.17
$ C:\xampp\htdocs\Evaluation\node_modules\.bin\babel ./iso_auth/in/ISO_Public_Key_2_Pass_Unilateral_Authentication.pb.js
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
    function: async (Verifier, Prover) => {
      const Nonce = nonce();
      Prover.send({
        "Nonce": Nonce
      });
    }
  }, {
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Response",
    function: async (Prover, Verifier) => {
      const Signature = sign(Verifier.Challenge.Nonce + Verifier.Id, Prover.Input.PrivateKey);
      Verifier.send({
        "Signature": Signature
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Verify = verify(Verifier.Challenge.Nonce + Verifier.Id, Verifier.Input.PublicKey);
      return Verify;
    }
  }]
});

Done in 0.42s.
