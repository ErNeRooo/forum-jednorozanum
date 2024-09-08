"use client";
import styles from "./ConsoleContent.module.sass";
import ConsolePrompt from "../ConsolePrompt/ConsolePrompt";
import { BaseSyntheticEvent, ReactElement, useReducer, useState } from "react";
import cmdInputReducer from "@/app/reducers/cmdInputReducer";
const ConsoleContent = () => {
  const [consoleHistory, dispatch] = useReducer(cmdInputReducer, []);
  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;

    const target = e.target as HTMLInputElement;

    dispatch({ type: "add", value: target.value });

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
