"use client";
import AuthPage from "./pages/AuthPage/AuthPage";
import UserCredentialsContext from "./context/UserCredentialsContext";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
export default function Home() {
  //firebase.initializeApp(firebaseConfig);
  const [userCredentials, setUserCredentials] = useState<UserCredential | null>(
    null
  );

  return (
    <UserCredentialsContext.Provider
      value={{ userCredentials, setUserCredentials }}
    >
      <AuthPage />
    </UserCredentialsContext.Provider>
  );
}
