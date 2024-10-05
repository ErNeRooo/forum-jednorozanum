import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";
import result from "../types/result";
import GetFileNameFromFirebaseStorageUrl from "./GetFileNameFromFirebaseStorageUrl";

const DeleteFileFromDatabase = async (imageUrl: string): Promise<result> => {
  const imageRef = ref(
    storage,
    "images/" + GetFileNameFromFirebaseStorageUrl(imageUrl)
  );

  return await deleteObject(imageRef)
    .then(() => {
      return {
        isSuccessfull: true,
        errorMessage: null,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        isSuccessfull: false,
        errorMessage: error.message,
      };
    });
};

export default DeleteFileFromDatabase;
