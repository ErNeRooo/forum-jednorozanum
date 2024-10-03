import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInAccount = async (
  email: string,
  password: string
): Promise<isLoggedIn> => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Logged in: " + userCredential.user.uid);
      return { isLoggedIn: true, errorMessage: null };
    })
    .catch((error) => {
      console.log(error);
      return { isLoggedIn: false, errorMessage: error.message };
    });
};

interface isLoggedIn {
  isLoggedIn: boolean;
  errorMessage: string | null;
}

export default LogInAccount;
