const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const ISO_2_Pass_Unilateral_Authentication_Over_CCF = new __PROTOBLOCKS_PROTOCOL__({
  name: "ISO_2_Pass_Unilateral_Authentication_Over_CCF",
  principals: [{
    name: "Prover",
    inputs: ["Secret"]
  }, {
    name: "Verifier",
    inputs: ["Secret"]
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
      const Hash = hash(Verifier.Challenge.Nonce + Verifier.Id + Prover.Input.Secret);
      Verifier.send({
        "Hash": Hash
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Hash = hash(Verifier.Challenge.Nonce + Verifier.Id + Verifier.Input.Secret);
      return Hash === Prover.Response.Hash;
    }
  }]
});
