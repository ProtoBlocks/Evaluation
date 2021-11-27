yarn run v1.22.17
$ C:\xampp\htdocs\Evaluation\node_modules\.bin\babel ./iso_auth/in/ISO_Public_Key_1_Pass_Unilateral_Authentication.pb.js
const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const ISO_Public_Key_1_Pass_Unilateral_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "ISO_Public_Key_1_Pass_Unilateral_Authentication",
  principals: [{
    name: "Prover",
    inputs: ["PrivateKey"]
  }, {
    name: "Verifier",
    inputs: ["PublicKey"]
  }],
  steps: [{
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Prove",
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000);
      const Signature = sign(Timestamp + Verifier.Id, Prover.Input.PrivateKey);
      Verifier.send({
        "Signature": Signature
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Timestamp = timestamp(10000);
      const Verify = verify(Timestamp + Verifier.Id, Verifier.Input.PublicKey);
      return Verify;
    }
  }]
});

Done in 0.43s.
