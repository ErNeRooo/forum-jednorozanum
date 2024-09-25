import { fireDb, auth } from "../firebaseConfig";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import CheckIfNameIsOccupied from "./CheckIfNameIsOccupied";
import isCreated from "../types/isCreated";

const AddAccountToDatabase = async (
  name: string,
  email: string,
  password: string
): Promise<isCreated> => {
  const nameIsOccupied = await CheckIfNameIsOccupied(name).then(
    (nameIsOccupied) => {
      if (nameIsOccupied) {
        return { isCreated: false, errorMessage: "name already in use" };
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
        setDoc(userDoc, {
          name: name,
          email: email,
          isBanned: false,
          categories: ["All", "News", "Philosophy", "Earth", "Science", "War"],
        });
        return { isCreated: true, errorMessage: null };
      })
      .catch((error) => {
        console.log(error);
        return { isCreated: false, errorMessage: error.message };
      });
  });

  return nameIsOccupied ? nameIsOccupied : userCredential;
};

export default AddAccountToDatabase;
