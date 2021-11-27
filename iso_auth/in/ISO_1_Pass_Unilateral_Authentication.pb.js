protocol ISO_1_Pass_Unilateral_Authentication [Prover(SecretKey), Verifier(SecretKey)] {
  step Prove [Prover -> Verifier] {
    const Timestamp = timestamp(10000);
    const Ciphertext = encrypt(Timestamp + Verifier.Id, Prover.Input.SecretKey);
    Verifier.send({"Ciphertext": Ciphertext});
  }

  step Verify [Verifier] {
    const Timestamp = timestamp(10000);
    const Plaintext = decrypt(Prover.Response.Ciphertext, Verifier.Input.SecretKey);
    return (Plaintext === Timestamp + Verifier.Id);
  }
}
