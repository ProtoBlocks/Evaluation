protocol ISO_3_Pass_Mutual_Authentication [Alice(AliceSecret, BobPublic), Bob(BobSecret, AlicePublic)] {
  step Input [Bob -> Alice] {
    const Nonce = nonce();
    Prover.send({"Nonce": Nonce});
  }

  step AliceProve [Alice -> Bob] {
    const Signature = sign(Bob.Input.Nonce + Bob.Id, Alice.Input.AliceSecret);
    const Nonce = nonce();
    Prover.send({"Signature": Signature, "Nonce": Nonce});
  }

  step BobProveVerify [Bob -> Alice] {
    const Signature = sign(Alice.AliceProve.Nonce + Alice.Id, Bob.Input.BobSecret);
    const Verify = verify(Bob.Input.Nonce + Bob.Id, Bob.Input.AlicePublic);
    Prover.send({"Signature": Signature, "Verify": Verify});
  }

  step AliceVerify [Verifier] {
    const Verify = verify(Alice.AliceProve.Nonce + Alice.Id, Alice.Input.BobPublic);
    return (Verify && Bob.BobProveVerify.Verify);
  }
}
