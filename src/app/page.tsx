"use client";
import AuthPage from "./componentPages/AuthPage/AuthPage";
import { useEffect, useState } from "react";
import { UserCredential } from "firebase/auth";
import PageLoading from "./components/PageLoading/PageLoading";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return <AuthPage />;
}
