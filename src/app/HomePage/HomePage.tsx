import { BaseSyntheticEvent } from "react";
import styles from "./HomePage.module.sass";
import ConsolePrompt from "../components/ConsolePrompt/ConsolePrompt";

const HomePage = () => {
  const consoleHistory: string[] = [];

  return (
    <div className={styles.HomePage}>
      <span>{"HexOS PowerShell"}</span>
      <span>
        {
          "Copyright (C) Hexagon Industries and Scientific Research Agency. All rights reserved."
        }
      </span>
      <br />
      <span>{"PS C:\\forum-jednorozanum> help"}</span>
      <span>{"AVAILABLE COMMANDS:"}</span>
      <span>{" - forum login (to log into your account)"}</span>
      <span>{" - forum register (to create new account)"}</span>
    </div>
  );
};
export default HomePage;
