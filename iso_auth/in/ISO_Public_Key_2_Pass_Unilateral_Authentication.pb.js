protocol ISO_Public_Key_2_Pass_Unilateral_Authentication [Prover(PrivateKey), Verifier(PublicKey)] {
  step Challenge [Verifier -> Prover] {
    const Nonce = nonce();
    Prover.send({"Nonce": Nonce});
  }

  step Response [Prover -> Verifier] {
    const Signature = sign(Verifier.Challenge.Nonce + Verifier.Id, Prover.Input.PrivateKey);
    Verifier.send({"Signature": Signature});
  }

  step Verify [Verifier] {
    const Verify = verify(Verifier.Challenge.Nonce + Verifier.Id, Verifier.Input.PublicKey);
    return (Verify);
  }
}
