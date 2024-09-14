import { fireDb, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AddAccountToDatabase = (
  name: string,
  email: string,
  password: string
) => {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        const userDoc = doc(fireDb, "accounts", user.uid);
        setDoc(userDoc, {
          name: name,
          email: email,
          isBanned: false,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export default AddAccountToDatabase;
