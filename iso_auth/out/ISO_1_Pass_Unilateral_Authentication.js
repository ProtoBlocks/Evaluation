yarn run v1.22.17
$ C:\xampp\htdocs\Evaluation\node_modules\.bin\babel ./iso_auth/in/ISO_1_Pass_Unilateral_Authentication.pb.js
const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const ISO_1_Pass_Unilateral_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "ISO_1_Pass_Unilateral_Authentication",
  principals: [{
    name: "Prover",
    inputs: ["SecretKey"]
  }, {
    name: "Verifier",
    inputs: ["SecretKey"]
  }],
  steps: [{
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Prove",
    function: async (Prover, Verifier) => {
      const Timestamp = timestamp(10000);
      const Ciphertext = encrypt(Timestamp + Verifier.Id, Prover.Input.SecretKey);
      Verifier.send({
        "Ciphertext": Ciphertext
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Timestamp = timestamp(10000);
      const Plaintext = decrypt(Prover.Response.Ciphertext, Verifier.Input.SecretKey);
      return Plaintext === Timestamp + Verifier.Id;
    }
  }]
});

Done in 0.42s.
