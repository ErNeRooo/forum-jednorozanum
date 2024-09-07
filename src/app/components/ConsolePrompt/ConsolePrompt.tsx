"use client";
import { BaseSyntheticEvent } from "react";
import styles from "./ConsolePrompt.module.sass";

const ConsolePrompt = ({ handler }: Props) => {
  return (
    <div className={styles.ConsolePrompt}>
      <span>{"PS C:\\forum-jednorozanum>"}</span>
      <input type="text" onDragEnterCapture={handler} />
    </div>
  );
};

interface Props {
  handler: (e: BaseSyntheticEvent) => void;
}

export default ConsolePrompt;
