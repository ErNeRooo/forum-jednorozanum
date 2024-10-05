import { fireDb } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import result from "../types/result";

const DeletePostFromDatabase = async (uid: string): Promise<result> => {
  return await deleteDoc(doc(fireDb, "posts", uid))
    .then(() => {
      return {
        isSuccessfull: true,
        errorMessage: null,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        isSuccessfull: false,
        errorMessage: error.message,
      };
    });
};

export default DeletePostFromDatabase;
