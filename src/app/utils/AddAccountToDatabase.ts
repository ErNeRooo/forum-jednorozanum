import { fireDb, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import CheckIfNameIsOccupied from "./CheckIfNameIsOccupied";

const AddAccountToDatabase = async (
  name: string,
  email: string,
  password: string
): Promise<isCreatedObjectTypes> => {
  const nameIsOccupied = await CheckIfNameIsOccupied(name).then(
    (nameIsOccupied) => {
      if (nameIsOccupied) {
        return { isCreated: false, errorMessage: "name already in use" };
      }
    }
  );

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;
      const userDoc = doc(fireDb, "accounts", user.uid);
      setDoc(userDoc, {
        name: name,
        email: email,
        isBanned: false,
      });
      return { isCreated: true, errorMessage: null };
    })
    .catch((error) => {
      console.log(error);
      return { isCreated: false, errorMessage: error.message };
    });

  return nameIsOccupied ? nameIsOccupied : userCredential;
};

interface isCreatedObjectTypes {
  isCreated: boolean;
  errorMessage: string | null;
}

export default AddAccountToDatabase;
