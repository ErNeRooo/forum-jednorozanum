const GenerateRandomString = (
  availableCharacters: string,
  minLength: number,
  maxLength: number
): string => {
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    randomString += availableCharacters[randomIndex];
  }

  return randomString;
};

export default GenerateRandomString;
