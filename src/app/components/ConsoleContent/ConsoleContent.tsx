"use client";
import styles from "./ConsoleContent.module.sass";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import {
  BaseSyntheticEvent,
  ReactElement,
  useEffect,
  useReducer,
  useState,
} from "react";
import cmdInputReducer from "@/app/reducers/cmdInputReducer";
import HelpMessage from "../HelpMessage/HelpMessage";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { SplitPrompt } from "@/app/utils/SplitPrompt";
import { PromptAnswer } from "@/app/types/PromptAnswer";

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
  const [currentConsoleInput, setCurrentConsoleInput] = useState<JSX.Element>(
    <span>{"PS C:\\forum-jednorozanum> "}</span>
  );

  const setDefaultInput = () => {
    setCurrentConsoleInput(
      <ConsoleInput
        handler={handleOnEnter}
        consoleText={"PS C:\\forum-jednorozanum> "}
        type="text"
      />
    );
  };

  useEffect(() => {
    setDefaultInput();
  }, []);

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLInputElement;
    const answer = pickAnswerToPrompt(target.value);

    switch (answer) {
      case "program not found":
        dispatch({
          type: "program not found",
          value: target.value,
          consoleTitle: "PS C:\\forum-jednorozanum>",
        });
        break;

      case "command not found":
        dispatch({
          type: "command not found",
          value: target.value,
          consoleTitle: "PS C:\\forum-jednorozanum>",
        });
        break;

      case "help":
        dispatch({
          type: "help",
          value: target.value,
          consoleTitle: "PS C:\\forum-jednorozanum>",
        });
        break;

      case "login":
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: "PS C:\\forum-jednorozanum>",
        });
        setCurrentConsoleInput(
          <LoginForm dispatch={dispatch} ExitForm={() => setDefaultInput()} />
        );
        break;

      case "register":
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: "PS C:\\forum-jednorozanum>",
        });
        setCurrentConsoleInput(
          <RegisterForm
            dispatch={dispatch}
            ExitForm={() => setDefaultInput()}
          />
        );
        break;

      case "just save command":
        dispatch({
          type: "just save command",
          value: target.value,
          consoleTitle: "PS C:\\forum-jednorozanum>",
        });
        break;
    }

    target.value = "";
  };
  return (
    <div className={styles.ConsoleContent}>
      {consoleHistory}
      {currentConsoleInput}
    </div>
  );
};

const pickAnswerToPrompt = (value: string): PromptAnswer => {
  if (value === "") {
    return "just save command";
  }

  const { program, command } = SplitPrompt(value);

  if (program !== "forum") {
    return "program not found";
  }

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
};

export default ConsoleContent;
