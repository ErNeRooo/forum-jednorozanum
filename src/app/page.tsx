"use client";
import HomePage from "./HomePage/HomePage";
import "./global.sass";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
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
      <HomePage />
    </UserCredentialsContext.Provider>
  );
}
