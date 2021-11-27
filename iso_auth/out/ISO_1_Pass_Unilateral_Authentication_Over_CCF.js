yarn run v1.22.17
$ C:\xampp\htdocs\Evaluation\node_modules\.bin\babel ./iso_auth/in/ISO_1_Pass_Unilateral_Authentication_Over_CCF.pb.js
const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const ISO_1_Pass_Unilateral_Authentication_Over_CCF = new __PROTOBLOCKS_PROTOCOL__({
  name: "ISO_1_Pass_Unilateral_Authentication_Over_CCF",
  principals: [{
    name: "Prover",
    inputs: ["Secret"]
  }, {
    name: "Verifier",
    inputs: ["Secret"]
  }],
  steps: [{
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Prove",
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000);
      const Hash = hash(Timestamp + Verifier.Id + Prover.Input.Secret);
      Verifier.send({
        "Hash": Hash
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Timestamp = timestamp(10000);
      const Hash = hash(Timestamp + Verifier.Id + Verifier.Input.Secret);
      return Hash === Prover.Response.Hash;
    }
  }]
});

Done in 0.42s.
