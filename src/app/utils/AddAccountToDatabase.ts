import { fireDb, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AddAccountToDatabase = async (
  name: string,
  email: string,
  password: string
): Promise<isCreatedObjectTypes> => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;
      const userDoc = doc(fireDb, "accounts", user.uid);
      setDoc(userDoc, {
        name: name,
        email: email,
        isBanned: false,
      });
      return { isLoggedIn: true, errorMessage: null };
    })
    .catch((error) => {
      console.log(error);
      return { isLoggedIn: false, errorMessage: error.message };
    });
};

interface isCreatedObjectTypes {
  isLoggedIn: boolean;
  errorMessage: string | null;
}

export default AddAccountToDatabase;
