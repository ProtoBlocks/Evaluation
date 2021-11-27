yarn run v1.22.17
$ C:\xampp\htdocs\Evaluation\node_modules\.bin\babel ./iso_auth/in/Nonce_Return_2_Pass_Unilateral_Authentication.pb.js
const {
  Protocol: __PROTOBLOCKS_PROTOCOL__
} = require("protoblocks");

const Nonce_Return_2_Pass_Unilateral_Authentication = new __PROTOBLOCKS_PROTOCOL__({
  name: "Nonce_Return_2_Pass_Unilateral_Authentication",
  principals: [{
    name: "Prover",
    inputs: ["SecretKey"]
  }, {
    name: "Verifier",
    inputs: ["SecretKey"]
  }],
  steps: [{
    origin: "Verifier",
    recipients: ["Prover"],
    name: "Challenge",
    function: async (Verifier, Prover) => {
      const Nonce = nonce();
      const Ciphertext = encrypt(Nonce, Verifier.Input.SecretKey);
      Prover.send({
        "Ciphertext": Ciphertext
      });
    }
  }, {
    origin: "Prover",
    recipients: ["Verifier"],
    name: "Response",
    function: async (Prover, Verifier) => {
      const Plaintext = decrypt(Verifier.Challenge.Ciphertext, Prover.Input.SecretKey);
      Verifier.send({
        "Plaintext": Plaintext
      });
    }
  }, {
    origin: "Verifier",
    recipients: [],
    name: "Verify",
    function: async Verifier => {
      const Nonce = decrypt(Verifier.Challenge.Ciphertext, Verifier.Input.SecretKey);
      return Plaintext === Nonce;
    }
  }]
});

Done in 0.42s.
