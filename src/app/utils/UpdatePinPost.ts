import isDatabaseOperationSuccessfull from "../types/isDatabaseOperationSuccessfull";
import { fireDb } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

const UpdatePinPost = async (
  postUid: string,
  isPinned: boolean
): Promise<isDatabaseOperationSuccessfull> => {
  return await updateDoc(doc(fireDb, "posts", postUid), {
    isPinned: !isPinned,
  })
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

export default UpdatePinPost;
