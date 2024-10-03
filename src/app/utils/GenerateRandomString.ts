const GenerateRandomString = (characters: string): string => {
  const minLength = 4;
  const maxLength = 24;

  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

export default GenerateRandomString;
