"use client";
import styles from "./ConsoleContent.module.sass";
import ConsolePrompt from "../ConsolePrompt/ConsolePrompt";
import { BaseSyntheticEvent, useState } from "react";
const ConsoleContent = () => {
  const [consoleHistory, setConsoleHistory] = useState<string[]>([
    "Enter Login > HisraEmployee",
    "Enter Password > ********",
  ]);
  const handleOnEnter = (e: BaseSyntheticEvent): void => {
    setConsoleHistory((prev) => [...prev, e.target.value]);
  };
  return (
    <div className={styles.ConsoleContent}>
      {consoleHistory.map((item, index) => {
        if (item[0] === "P" && item[1] === "S")
          return <span key={index}>{item}</span>;
        return (
          <span className={styles.response} key={index}>
            {item}
          </span>
        );
      })}
      <ConsolePrompt handler={handleOnEnter} />
    </div>
  );
};

export default ConsoleContent;
