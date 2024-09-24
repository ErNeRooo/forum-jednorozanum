"use client"; // Client-side only component
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../firebaseConfig"; // Assuming this is your Firebase app instance
import ExplorePage from "../componentPages/ExplorePage/ExplorePage";
import NotLoggedInPage from "../componentPages/NotLoggedInPage/NotLoggedInPage";

const Explore = () => {
  const [user, setUser] = useState<User | null>(null); // Track auth state
  const [loading, setLoading] = useState(true); // Track loading state
  const auth = getAuth(app); // Initialize Firebase auth

  // Set up the listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state when the auth state changes
      setLoading(false); // Set loading to false once auth state is determined
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  // Show loading state while waiting for auth check
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render pages based on user authentication state
  if (user) {
    console.log(user);
    return <ExplorePage />;
  } else {
    return <NotLoggedInPage />;
  }
};

export default Explore;
