protocol Needham_Schroeder_Symmetric_Key_Protocol [Alice(KAT), Bob(KBT), Trent(KAT, KBT)] {
  step Step1 [Alice -> Trent] {
    const Nonce = nonce();
    Verifier.send({"Nonce": Nonce});
  }
  step Step2 [Trent -> Alice] {
    const KAB = keygen();
    const Inner = encrypt(KAB, Trent.Input.KBT);
    const Outer = encrypt(Inner, Trent.Input.KAT);
    Verifier.send({"Ciphertext": Outer, "Key": KAB});
  }
  step Step3 [Alice -> Bob] {
    const Inner = decrypt(Trent.Step2.Ciphertext, Alice.Input.KAT);
    Verifier.send({"Ciphertext": Inner});
  }
  step Step4 [Bob -> Alice] {
    const KAB = decrypt(Alice.Step3.Ciphertext, Bob.Input.KBT);
    const Ciphertext = encrypt(Bob.Step1.Nonce, KAB);
    Verifier.send({"Ciphertext": Ciphertext});
  }
  step Step5 [Alice -> Bob] {
    const Nonce = decrypt(Alice.Step3.Ciphertext, Trent.Step2.Key);
    const Ciphertext = encrypt(Nonce + "V", Trent.Step2.Key);
    Verifier.send({"Ciphertext": Ciphertext});
  }
  step Verify [Bob] {
    const KAB = decrypt(Alice.Step3.Ciphertext, Bob.Input.KBT);
    const Nonce = decrypt(Alice.Step3.Ciphertext, Trent.Step2.Key);
    const Plaintext = decrypt(Alice.Step5.Ciphertext, KAB);
    return (Plaintext === Nonce + "V");
  }
}
