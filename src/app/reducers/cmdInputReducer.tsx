import { ReactElement, ReducerAction, ReducerWithoutAction } from "react";
import styles from "../components/ConsoleContent/ConsoleContent.module.sass";
import HelpMessage from "../components/HelpMessage/HelpMessage";
import { PromptAnswer } from "../types/PromptAnswer";
import { SplitPrompt } from "../utils/SplitPrompt";

const CmdInputReducer = (
  state: ReactElement[],
  { type, value, consoleTitle }: Action
) => {
  const { fullPrompt, program, command } = SplitPrompt(value);

  let underlineString = "";
  for (let i = 0; i < program.length; i++) {
    underlineString += "~";
  }

  const ProgramNotFoundErrorMessage = () => (
    <>
      <span className={styles.errorMessage}>
        {`${program} : The term \'${program}\' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.`}
      </span>
      <span className={styles.errorMessage}>{`At line:1 char:1`}</span>
      <span className={styles.errorMessage}>{`+ ${fullPrompt}`}</span>
      <span className={styles.errorMessage}>{`+ ${underlineString}`}</span>
      <span
        className={styles.errorMessage}
      >{` + CategoryInfo : ObjectNotFound: (${program}:String) [], CommandNotFoundException`}</span>
      <span
        className={styles.errorMessage}
      >{` + FullyQualifiedErrorId : CommandNotFoundException`}</span>
    </>
  );

  const CommandNotFoundErrorMessage = () => (
    <span className={styles.errorMessage}>
      {`${program}: \'${command}\' is not a ${program} command. See 'forum help'.`}
    </span>
  );

  const currentInput: ReactElement = (
    <span>{`${consoleTitle} ${fullPrompt}`}</span>
  );

  switch (type) {
    case "program not found":
      return [...state, currentInput, ProgramNotFoundErrorMessage()];
    case "command not found":
      return [...state, currentInput, CommandNotFoundErrorMessage()];
    case "help":
      return [...state, currentInput, <HelpMessage key={state.length} />];
    case "justSaveCommand":
      return [...state, currentInput];
    default:
      return state;
  }
};

export interface Action {
  type: PromptAnswer;
  value: string;
  consoleTitle: string;
}

export default CmdInputReducer;
