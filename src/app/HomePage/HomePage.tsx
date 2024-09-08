import styles from "./HomePage.module.sass";
import ConsoleContent from "../components/ConsoleContent/ConsoleContent";
const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <ConsoleContent />
    </div>
  );
};
export default HomePage;
