import { ReactElement, ReducerAction, ReducerWithoutAction } from "react";
import styles from "../components/ConsoleContent/ConsoleContent.module.sass";

const CmdInputReducer = (state: ReactElement[], { value }: Action) => {
  const currentCommand = (
    <span key={state.length}>{"PS C:\\forum-jednorozanum> " + value}</span>
  );
  const cmdProgramString = value.split(" ")[0];
  let underlineString = "";
  for (let i = 0; i < cmdProgramString.length; i++) {
    underlineString += "~";
  }

  if (cmdProgramString !== "forum") {
    const errorMessage = (
      <>
        <span className={styles.errorMessage}>
          {`${cmdProgramString} : The term \'${cmdProgramString}\' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.`}
        </span>
        <span className={styles.errorMessage}>{`At line:1 char:1`}</span>
        <span className={styles.errorMessage}>{`+ ${value}`}</span>
        <span className={styles.errorMessage}>{`+ ${underlineString}`}</span>
        <span
          className={styles.errorMessage}
        >{` + CategoryInfo : ObjectNotFound: (${cmdProgramString}:String) [], CommandNotFoundException`}</span>
        <span
          className={styles.errorMessage}
        >{` + FullyQualifiedErrorId : CommandNotFoundException`}</span>
      </>
    );
    return [...state, errorMessage];
  }
  return [...state, currentCommand];
};

interface Action {
  type: string;
  value: string;
}

export default CmdInputReducer;
