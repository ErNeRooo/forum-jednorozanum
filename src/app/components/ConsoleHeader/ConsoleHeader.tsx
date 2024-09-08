import styles from "./ConsoleHeader.module.sass";

const ConsoleHeader = () => {
  return (
    <div className={styles.ConsoleHeader}>
      <span>{"HexOS PowerShell"}</span>
      <span>
        {
          "Copyright (C) Hexagon Industries and Scientific Research Agency. All rights reserved."
        }
      </span>
      <br />
      <span>{"PS C:\\forum-jednorozanum> forum help"}</span>
      <span className={styles.response}>{"AVAILABLE COMMANDS:"}</span>
      <span className={styles.response}>
        {"forum login (to log into your account)"}
      </span>
      <span className={styles.response}>
        {"forum register (to create new account)"}
      </span>
    </div>
  );
};

export default ConsoleHeader;
