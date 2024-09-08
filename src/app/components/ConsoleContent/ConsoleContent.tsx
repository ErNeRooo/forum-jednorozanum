"use client";
import styles from "./ConsoleContent.module.sass";
import ConsolePrompt from "../ConsolePrompt/ConsolePrompt";
import { BaseSyntheticEvent, ReactElement, useState } from "react";
const ConsoleContent = () => {
  const [consoleHistory, setConsoleHistory] = useState<ReactElement[]>([]);
  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;
    const currentCommand = (
      <span key={consoleHistory.length}>
        {"PS C:\\forum-jednorozanum> " + target.value}
      </span>
    );

    setConsoleHistory((prev) => [...prev, currentCommand]);
    const cmdProgramString = target.value.split(" ")[0];
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
          <span className={styles.errorMessage}>{`+ ${target.value}`}</span>
          <span className={styles.errorMessage}>{`+ ${underlineString}`}</span>
          <span
            className={styles.errorMessage}
          >{` + CategoryInfo : ObjectNotFound: (${cmdProgramString}:String) [], CommandNotFoundException`}</span>
          <span
            className={styles.errorMessage}
          >{` + FullyQualifiedErrorId : CommandNotFoundException`}</span>
        </>
      );

      setConsoleHistory((prev) => [...prev, errorMessage]);
    }

    target.value = "";
  };
  return (
    <div className={styles.ConsoleContent}>
      {consoleHistory}
      <ConsolePrompt handler={handleOnEnter} />
    </div>
  );
};

export default ConsoleContent;
