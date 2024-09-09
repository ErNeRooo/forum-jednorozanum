"use client";
import styles from "./ConsoleInput.module.sass";

const ConsoleInput = ({ handler, consoleText, type }: Props) => {
  return (
    <div className={styles.ConsoleInput}>
      <span>{consoleText}</span>
      <input type={type} onKeyDown={handler} />
    </div>
  );
};

interface Props {
  handler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  consoleText: string;
  type: string;
}

export default ConsoleInput;
