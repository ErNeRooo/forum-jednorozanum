import { deleteUser, getAuth, User } from "firebase/auth";
import result from "../types/result";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";

const DeleteLoggedUser = (): Promise<result> => {
  const user: User = getAuth().currentUser as User;
  const userDoc = doc(fireDb, "accounts", user.uid);

  return deleteDoc(userDoc)
    .then(() => {
      return deleteUser(user)
        .then(() => {
          return { isSuccessfull: true, errorMessage: null };
        })
        .catch((error) => {
          return { isSuccessfull: false, errorMessage: error.message };
        });
    })
    .catch((error) => {
      console.log(error);
      return { isSuccessfull: false, errorMessage: error.message };
    });
};

export default DeleteLoggedUser;
