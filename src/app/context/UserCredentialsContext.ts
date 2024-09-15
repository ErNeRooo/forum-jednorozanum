import { createContext } from "react";
import UserCredentialsContextTypes from "../types/UserCredentialsContextTypes";

const UserCredentialsContext = createContext<UserCredentialsContextTypes>({
  userCredentials: null,
  setUserCredentials: () => {},
});

export default UserCredentialsContext;
