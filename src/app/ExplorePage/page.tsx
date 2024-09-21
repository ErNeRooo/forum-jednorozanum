"use client";
import styles from "./page.module.sass";
import { getAuth, User } from "firebase/auth";
import { app } from "../firebaseConfig";
import CategoryPanel from "../components/CategoryPanel/CategoryPanel";
import PostSearchPanel from "../components/PostSearchPanel/PostSearchPanel";
import PostsBar from "../components/PostsBar/PostsBar";

const page = () => {
  const auth = getAuth(app);
  const user: User | null = auth.currentUser;

  return (
    <div className={styles.page}>
      <CategoryPanel />
      <PostSearchPanel />
      <h1>{`Home recent posts`}</h1>
      <PostsBar />
    </div>
  );

  /*
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
  }*/
};

export default page;
