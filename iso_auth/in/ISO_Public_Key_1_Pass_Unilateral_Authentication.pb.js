protocol ISO_Public_Key_1_Pass_Unilateral_Authentication [Prover(PrivateKey), Verifier(PublicKey)] {
  step Prove [Prover -> Verifier] {
    const Timestamp = timestamp(10000);
    const Signature = sign(Timestamp + Verifier.Id, Prover.Input.PrivateKey);
    Verifier.send({"Signature": Signature});
  }

  step Verify [Verifier] {
    const Timestamp = timestamp(10000);
    const Verify = verify(Timestamp + Verifier.Id, Verifier.Input.PublicKey);
    return (Verify);
  }
}
