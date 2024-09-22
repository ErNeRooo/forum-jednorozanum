import { PromptAnswer } from "../types/PromptAnswer";
import { SplitPrompt } from "./SplitPrompt";

const PickPromptAnswer = (value: string): PromptAnswer => {
  if (value === "") {
    return "just save command";
  }

  const { program, command } = SplitPrompt(value);

  if (program === "swider") {
    return "swider easter egg command";
  } else if (program === "forum") {
    switch (command) {
      case "help":
        return "help";
      case "login":
        return "login";
      case "register":
        return "register";
      default:
        return "command not found";
    }
  } else {
    return "program not found";
  }
};

export default PickPromptAnswer;
