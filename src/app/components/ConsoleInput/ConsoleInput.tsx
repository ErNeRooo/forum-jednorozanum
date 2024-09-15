"use client";
import { useEffect, useRef } from "react";
import styles from "./ConsoleInput.module.sass";

const ConsoleInput = ({ handler, consoleText, type }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      console.log(typeof inputRef.current);
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.ConsoleInput}>
      <span>{consoleText}</span>
      <input
        type={type}
        onKeyDown={handler}
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
}

export default ConsoleInput;
