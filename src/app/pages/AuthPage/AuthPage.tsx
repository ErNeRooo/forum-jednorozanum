import styles from "./AuthPage.module.sass";
import ConsoleContent from "@/app/components/ConsoleContent/ConsoleContent";
const AuthPage = () => {
  return (
    <div className={styles.HomePage}>
      <ConsoleContent />
    </div>
  );
};
export default AuthPage;
