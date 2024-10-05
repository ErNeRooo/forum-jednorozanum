import PageLoading from "@/app/components/PageLoading/PageLoading";
import styles from "./AuthPage.module.sass";
import ConsoleContent from "@/app/components/ConsoleContent/ConsoleContent";
import { useEffect, useState } from "react";
const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <div className={styles.AuthPage}>
        <ConsoleContent setIsLoading={setIsLoading} />
      </div>
    );
  }
};
export default AuthPage;
