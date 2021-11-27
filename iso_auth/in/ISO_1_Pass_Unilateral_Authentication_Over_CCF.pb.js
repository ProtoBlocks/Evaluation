protocol ISO_1_Pass_Unilateral_Authentication_Over_CCF [Prover(Secret), Verifier(Secret)] {
  step Prove [Prover -> Verifier] {
    const Timestamp = timestamp(10000);
    const Hash = hash(Timestamp + Verifier.Id + Prover.Input.Secret);
    Verifier.send({"Hash": Hash});
  }

  step Verify [Verifier] {
    const Timestamp = timestamp(10000);
    const Hash = hash(Timestamp + Verifier.Id + Verifier.Input.Secret);
    return (Hash === Prover.Response.Hash);
  }
}
