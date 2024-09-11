const HideString = (stringToHide: string): string => {
  let hiddenString = "";

  for (let i = 0; i < stringToHide.length; i++) {
    hiddenString += "*";
  }

  return hiddenString;
};

export default HideString;
