"use client";
import styles from "./ConsoleContent.module.sass";
import ConsoleInput from "../ConsoleInput/ConsoleInput";
import { useEffect, useReducer, useRef, useState } from "react";
import cmdInputReducer from "@/app/reducers/cmdInputReducer";
import HelpMessage from "../HelpMessage/HelpMessage";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import PickPromptAnswer from "@/app/utils/PickPromptAnswer";

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
  const ScrollDiv = useRef(null);

  const setDefaultInput = () => {
    setCurrentConsoleInput(
      <ConsoleInput
        handler={handleOnEnter}
        consoleText={"PS C:\\forum-jednorozanum> "}
        type="text"
        isArrowsActive={true}
      />
    );
  };

  const scrollToBottom = () => {
    if (!ScrollDiv.current) return;
    const scroll: HTMLDivElement = ScrollDiv.current as HTMLDivElement;
    scroll.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setDefaultInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [consoleHistory]);

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLInputElement;
    const answer = PickPromptAnswer(target.value);

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

      case "swider easter egg command":
        dispatch({
          type: "swider easter egg command",
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
      <div className={styles.scroll} ref={ScrollDiv}></div>
    </div>
  );
};

export default ConsoleContent;
