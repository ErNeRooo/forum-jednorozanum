"use client";
import styles from "./page.module.sass";
import { getAuth, User } from "firebase/auth";
import { app } from "../firebaseConfig";

const page = () => {
  const auth = getAuth(app);
  const user: User | null = auth.currentUser;

  if (user) {
    console.log(user);

    return (
      <div className={styles.page}>
        <h1>Explore Page</h1>
        <h2>user: {user.email}</h2>
      </div>
    );
  } else {
    return (
      <div className={styles.page}>
        <h1>spierdalaj się zalogować</h1>
      </div>
    );
  }
};

export default page;
