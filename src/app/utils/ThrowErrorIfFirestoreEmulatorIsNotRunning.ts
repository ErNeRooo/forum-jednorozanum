const ThrowErrorIfFirestoreEmulatorIsNotRunning = async () => {
  const FirestoreEmulatorUrl: string | undefined =
    process.env.FIRESTORE_EMULATOR_URL;

  if (FirestoreEmulatorUrl === undefined) {
    throw new Error("No Firestore Emulator URL found");
  }

  const response: Response = await fetch(FirestoreEmulatorUrl).then(
    (response) => response
  );

  if (!response.ok) throw new Error("Firestore Emulator is not running");
};

export default ThrowErrorIfFirestoreEmulatorIsNotRunning;
