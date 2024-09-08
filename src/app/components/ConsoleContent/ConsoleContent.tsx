"use client";
import styles from "./ConsoleContent.module.sass";
import ConsolePrompt from "../ConsolePrompt/ConsolePrompt";
import { BaseSyntheticEvent, ReactElement, useReducer, useState } from "react";
import cmdInputReducer from "@/app/reducers/cmdInputReducer";
import HelpMessage from "../HelpMessage/HelpMessage";
const ConsoleContent = () => {
  const [consoleHistory, dispatch] = useReducer(cmdInputReducer, [
    <span key={0}>{"HexOS PowerShell"}</span>,
    <span key={1}>
      {
        "Copyright (C) Hexagon Industries and Scientific Research Agency. All rights reserved."
      }
    </span>,
    <br key={2} />,
    <span key={3}>{"PS C:\\forum-jednorozanum> forum help"}</span>,
    <HelpMessage key={4} />,
  ]);
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
