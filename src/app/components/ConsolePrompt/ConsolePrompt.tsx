"use client";
import styles from "./ConsolePrompt.module.sass";

const ConsolePrompt = ({ handler }: Props) => {
  return (
    <div className={styles.ConsolePrompt}>
      <span>{"PS C:\\forum-jednorozanum>"}</span>
      <input type="text" onKeyDown={handler} />
    </div>
  );
};

interface Props {
  handler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default ConsolePrompt;
