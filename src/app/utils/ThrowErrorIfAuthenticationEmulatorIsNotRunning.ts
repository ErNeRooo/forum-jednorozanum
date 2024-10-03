const ThrowErrorIfAuthenticationEmulatorIsNotRunning = async () => {
  const AuthEmulatorUrl: string | undefined = process.env.AUTH_EMULATOR_URL;

  if (AuthEmulatorUrl === undefined)
    throw new Error("No Authentication Emulator URL found");

  const response: Response = await fetch(AuthEmulatorUrl).then(
    (response) => response
  );

  if (!response.ok) throw new Error("Authentication Emulator is not running");
};

export default ThrowErrorIfAuthenticationEmulatorIsNotRunning;
