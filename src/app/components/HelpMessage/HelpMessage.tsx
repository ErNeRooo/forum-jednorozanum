import styles from "../ConsoleContent/ConsoleContent.module.sass";

const HelpMessage = () => {
  return (
    <>
      <span className={styles.response}>{"AVAILABLE COMMANDS:"}</span>
      <span className={styles.response}>
        {"forum login (to log into your account)"}
      </span>
      <span className={styles.response}>
        {"forum register (to create new account)"}
      </span>
      <span className={styles.response}>
        {"forum help (to see all commands)"}
      </span>
    </>
  );
};

export default HelpMessage;
