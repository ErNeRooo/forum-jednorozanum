import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import result from "../types/isDatabaseOperationSuccessfull";

const AddFileToDatabase = async (
  file: File | null,
  storageRef: StorageReference
): Promise<uploadResult> => {
  if (!file)
    return Promise.resolve({
      isSuccessfull: true,
      downloadUrl: null,
      errorMessage: null,
    });

  return uploadBytes(storageRef, file)
    .then(() => {
      return getDownloadURL(storageRef)
        .then((url) => {
          return {
            isSuccessfull: true,
            downloadUrl: url,
            errorMessage: null,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            isSuccessfull: false,
            downloadUrl: null,
            errorMessage: error.message,
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        isSuccessfull: false,
        downloadUrl: null,
        errorMessage: error.message,
      };
    });
};

interface uploadResult {
  isSuccessfull: boolean;
  downloadUrl: string | null;
  errorMessage: string | null;
}

export default AddFileToDatabase;
