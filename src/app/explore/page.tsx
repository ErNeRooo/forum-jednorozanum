"use client";
import { getAuth, User } from "firebase/auth";
import { app } from "../firebaseConfig";
import ExplorePage from "../componentPages/ExplorePage/ExplorePage";
import NotLoggedInPage from "../componentPages/NotLoggedInPage/NotLoggedInPage";

const Explore = () => {
  const auth = getAuth(app);
  const user: User | null = auth.currentUser;

  if (user) return <ExplorePage />;
  else return <NotLoggedInPage />;
};

export default Explore;
