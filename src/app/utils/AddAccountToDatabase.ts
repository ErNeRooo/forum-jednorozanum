import { fireDb, auth } from "../firebaseConfig";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import CheckIfNameIsOccupied from "./CheckIfNameIsOccupied";
import isDatabaseOperationSuccessfull from "../types/isDatabaseOperationSuccessfull";
import Account from "../types/Account";

const AddAccountToDatabase = async (
  name: string,
  email: string,
  password: string
): Promise<isDatabaseOperationSuccessfull> => {
  const nameIsOccupied = await CheckIfNameIsOccupied(name).then(
    (nameIsOccupied) => {
      if (nameIsOccupied) {
        return { isSuccessfull: false, errorMessage: "name already in use" };
      } else {
        return false;
      }
    }
  );
  const userCredential = await setPersistence(
    auth,
    browserSessionPersistence
  ).then(() => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        const userDoc = doc(fireDb, "accounts", user.uid);

        const account: Account = {
          name: name,
          email: email,
          role: "user",
          isBanned: false,
          categories: ["All", "News", "Philosophy", "Earth", "Science", "War"],
        };

        setDoc(userDoc, account);
        return { isSuccessfull: true, errorMessage: null };
      })
      .catch((error) => {
        console.log(error);
        return { isSuccessfull: false, errorMessage: error.message };
      });
  });

  return nameIsOccupied ? nameIsOccupied : userCredential;
};

export default AddAccountToDatabase;
