protocol ISO_2_Pass_Unilateral_Authentication_Over_CCF [Prover(Secret), Verifier(Secret)] {
  step Challenge [Verifier -> Prover] {
    const Nonce = nonce();
    Prover.send({"Nonce": Nonce});
  }

  step Response [Prover -> Verifier] {
    const Hash = hash(Verifier.Challenge.Nonce + Verifier.Id + Prover.Input.Secret);
    Verifier.send({"Hash": Hash});
  }

  step Verify [Verifier] {
    const Hash = hash(Verifier.Challenge.Nonce + Verifier.Id + Verifier.Input.Secret);
    return (Hash === Prover.Response.Hash);
  }
}
