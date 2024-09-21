"use client";
import { getAuth, User } from "firebase/auth";
import { app } from "../firebaseConfig";
import ExplorePage from "../pages/ExplorePage/ExplorePage";

const page = () => {
  const auth = getAuth(app);
  const user: User | null = auth.currentUser;

  return <ExplorePage />;

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
