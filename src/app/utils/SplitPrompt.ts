export const SplitPrompt = (value: string) => {
  const splitValue = value.split(" ");

  const program = splitValue[0];
  const command = splitValue[1];

  return {
    fullPrompt: value,
    program: program,
    command: command,
  };
};
