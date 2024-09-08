import { ReactElement, ReducerAction, ReducerWithoutAction } from "react";
import styles from "../components/ConsoleContent/ConsoleContent.module.sass";

const CmdInputReducer = (state: ReactElement[], { value }: Action) => {
  const availableCommands = ["login", "register"];
  const availablePrograms = ["forum"];
  const currentPrompt = (
    <span key={state.length}>{"PS C:\\forum-jednorozanum> " + value}</span>
  );
  const programString = value.split(" ")[0];
  const commandString = value.split(" ")[1];

  let underlineString = "";
  for (let i = 0; i < programString.length; i++) {
    underlineString += "~";
  }

  const ProgramNotFoundErrorMessage = (
    <>
      <span className={styles.errorMessage}>
        {`${programString} : The term \'${programString}\' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.`}
      </span>
      <span className={styles.errorMessage}>{`At line:1 char:1`}</span>
      <span className={styles.errorMessage}>{`+ ${value}`}</span>
      <span className={styles.errorMessage}>{`+ ${underlineString}`}</span>
      <span
        className={styles.errorMessage}
      >{` + CategoryInfo : ObjectNotFound: (${programString}:String) [], CommandNotFoundException`}</span>
      <span
        className={styles.errorMessage}
      >{` + FullyQualifiedErrorId : CommandNotFoundException`}</span>
    </>
  );

  const CommandNotFoundErrorMessage = (
    <span className={styles.errorMessage}>
      {`${programString}: \'${commandString}\' is not a ${programString} command. See 'forum help'.`}
    </span>
  );

  if (!availablePrograms.includes(programString)) {
    return [...state, currentPrompt, ProgramNotFoundErrorMessage];
  } else if (!availableCommands.includes(commandString)) {
    return [...state, currentPrompt, CommandNotFoundErrorMessage];
  }
  return [...state, currentPrompt];
};

interface Action {
  type: string;
  value: string;
}

export default CmdInputReducer;
