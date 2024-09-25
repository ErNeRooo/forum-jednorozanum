"use client";
import AuthPage from "./componentPages/AuthPage/AuthPage";
import UserCredentialsContext from "./context/UserCredentialsContext";
import { useEffect, useState } from "react";
import { UserCredential } from "firebase/auth";
import PageLoading from "./components/PageLoading/PageLoading";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [userCredentials, setUserCredentials] = useState<UserCredential | null>(
    null
  );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <UserCredentialsContext.Provider
      value={{ userCredentials, setUserCredentials }}
    >
      <AuthPage />
    </UserCredentialsContext.Provider>
  );
}
