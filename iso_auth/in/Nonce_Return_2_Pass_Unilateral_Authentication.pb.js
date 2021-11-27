protocol Nonce_Return_2_Pass_Unilateral_Authentication [Prover(SecretKey), Verifier(SecretKey)] {
  step Challenge [Verifier -> Prover] {
    const Nonce = nonce();
    const Ciphertext = encrypt(Nonce, Verifier.Input.SecretKey);
    Prover.send({"Ciphertext": Ciphertext});
  }

  step Response [Prover -> Verifier] {
    const Plaintext = decrypt(Verifier.Challenge.Ciphertext, Prover.Input.SecretKey);
    Verifier.send({"Plaintext": Plaintext});
  }

  step Verify [Verifier] {
    const Nonce = decrypt(Verifier.Challenge.Ciphertext, Verifier.Input.SecretKey);
    return (Plaintext === Nonce);
  }
}
