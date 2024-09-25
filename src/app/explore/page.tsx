"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../firebaseConfig";
import ExplorePage from "../componentPages/ExplorePage/ExplorePage";
import NotLoggedInPage from "../componentPages/NotLoggedInPage/NotLoggedInPage";
import PageLoading from "../components/PageLoading/PageLoading";

const Explore = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <PageLoading />;
  }

  if (user) {
    console.log(user);
    return <ExplorePage />;
  } else {
    return <NotLoggedInPage />;
  }
};

export default Explore;
