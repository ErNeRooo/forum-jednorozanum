"use client";
import { BaseSyntheticEvent } from "react";
import styles from "./NotLoggedInPage.module.sass";
import { useRouter } from "next/navigation";

const NotLoggedInPage = () => {
  const router = useRouter();
  const handleOnClick = (e: BaseSyntheticEvent): void => {
    router.replace("/");
  };

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
