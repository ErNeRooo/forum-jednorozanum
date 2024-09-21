"use client";
import { getAuth, User } from "firebase/auth";
import { app } from "../firebaseConfig";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import NotLoggedInPage from "../pages/NotLoggedInPage/NotLoggedInPage";

const page = () => {
  const auth = getAuth(app);
  const user: User | null = auth.currentUser;

  if (user) return <ExplorePage />;
  else return <NotLoggedInPage />;
};

export default page;
