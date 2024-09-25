"use client";
import { BaseSyntheticEvent, useState } from "react";
import styles from "./NotLoggedInPage.module.sass";
import { useRouter } from "next/navigation";
import PageLoading from "@/app/components/PageLoading/PageLoading";

const NotLoggedInPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleOnClick = (): void => {
    setIsLoading(true);
    router.replace("/");
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className={styles.NotLoggedInPage}>
      <h1>{"You're not logged in"}</h1>
      <h2>{"Please log in to see the posts"}</h2>
      <div className={styles.logInButton} onClick={handleOnClick}>
        {"Go to log in / sign up page"}
      </div>
    </div>
  );
};

export default NotLoggedInPage;
