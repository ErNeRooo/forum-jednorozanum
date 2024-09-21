"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ConsoleInput.module.sass";

const ConsoleInput = ({
  handler,
  consoleText,
  type,
  isArrowsActive,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  let countArrowClicks = -1;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnChange = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!isArrowsActive) {
      handler(e);
      return;
    }

    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setHistory([e.currentTarget.value, ...history]);
      console.log(history);
    } else if (e.key === "ArrowUp" && history.length > 0) {
      countArrowClicks < history.length - 1
        ? countArrowClicks++
        : countArrowClicks;
      e.currentTarget.value = history[countArrowClicks];
    } else if (e.key === "ArrowDown" && history.length > 0) {
      countArrowClicks > -1 ? countArrowClicks-- : countArrowClicks;
      if (countArrowClicks === -1) {
        e.currentTarget.value = "";
        return;
      }

      e.currentTarget.value = history[countArrowClicks];
    } else {
      countArrowClicks = -1;
    }

    handler(e);
  };

  return (
    <div className={styles.ConsoleInput}>
      <span>{consoleText}</span>
      <input
        type={type}
        onKeyDown={handleOnChange}
        ref={inputRef}
        onBlur={() => inputRef.current && inputRef.current.focus()}
      />
    </div>
  );
};

interface Props {
  handler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  consoleText: string;
  type: string;
  isArrowsActive: boolean;
}

export default ConsoleInput;
