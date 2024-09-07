import styles from "./HomePage.module.sass";
import ConsoleContent from "../components/ConsoleContent/ConsoleContent";
import ConsoleHeader from "../components/ConsoleHeader/ConsoleHeader";
const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <ConsoleHeader />
      <ConsoleContent />
    </div>
  );
};
export default HomePage;
