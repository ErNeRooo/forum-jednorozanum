import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useContext } from "react";
import UserCredentialsContext from "../context/UserCredentialsContext";

const useLogInAccount = () => {
  const { setUserCredentials } = useContext(UserCredentialsContext);
  const LogIn = async (
    email: string,
    password: string
  ): Promise<isLoggedInObject> => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUserCredentials(userCredential);
        return { isLoggedIn: true, errorMessage: null };
      })
      .catch((error) => {
        console.log(error);
        return { isLoggedIn: false, errorMessage: error.message };
      });
  };

  return { LogIn };
};

interface isLoggedInObject {
  isLoggedIn: boolean;
  errorMessage: string | null;
}

export default useLogInAccount;
