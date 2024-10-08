import CommentTypes from "../types/CommentTypes";
import { fireDb } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import GetPostByUid from "./GetPostByUid";
import result from "../types/result";

const AddCommentToDatabase = async (
  postUid: string,
  comment: CommentTypes
): Promise<result> => {
  return await GetPostByUid(postUid)
    .then((post) => {
      updateDoc(doc(fireDb, "posts", postUid), {
        ...post,
        comments: [...post.comments, comment],
      });
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

export default AddCommentToDatabase;
