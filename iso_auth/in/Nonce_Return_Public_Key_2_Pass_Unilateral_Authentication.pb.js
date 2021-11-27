protocol Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication [Prover(PrivateKey), Verifier(PublicKey)] {
  step Challenge [Verifier -> Prover] {
    const Nonce = 12345;
    const Ciphertext = encrypt(Nonce, Verifier.Input.PublicKey);
    Prover.send({"Ciphertext": Ciphertext});
  }

  step Response [Prover -> Verifier] {
    const Plaintext = decrypt(Verifier.Challenge.Ciphertext, Prover.Input.PrivateKey);
    Verifier.send({"Plaintext": Plaintext});
  }

  step Verify [Verifier] {
    const Nonce = 12345;
    return (Plaintext === Nonce);
  }
}
