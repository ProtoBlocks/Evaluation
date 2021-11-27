protocol Woo_Lam_Mutual_Authentication [Alice(KAT), Bob(KBT), Trent(KAT, KBT)] {
  step Hello [Alice -> Bob] {
    Bob.send({"Id": Alice.Id});
  }
  step Challenge [Bob -> Alice] {
    const Nonce = nonce();
    Alice.send({"Nonce": Nonce});
  }
  step Response [Alice -> Bob] {
    const Ciphertext = encrypt(Bob.Challenge.Nonce, Alice.Input.KAT);
    Bob.send({"Ciphertext": Ciphertext});
  }
  step Validation [Bob -> Trent] {
    const Ciphertext = encrypt(Alice.Response.Ciphertext, Bob.Input.KBT);
    Trent.send({"Ciphertext": Ciphertext});
  }
  step Proof [Trent -> Bob] {
    const Inner = decrypt(Bob.Validation.Ciphertext, Trent.Input.KBT);
    const Nonce = decrypt(Inner, Trent.Input.KAT);
    const Ciphertext = encrypt(Nonce, Trent.Input.KBT);
    Bob.send({"Ciphertext": Ciphertext});
  }
  step Verify [Bob] {
    const Nonce = decrypt(Trent.Proof.Ciphertext, Bob.Input.KBT);
    return (Nonce === Bob.Challenge.Nonce);
  }
}
