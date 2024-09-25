import CommentTypes from "../types/CommentTypes";
import { fireDb } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import GetPostByUid from "./GetPostByUid";
import isCreated from "../types/isCreated";

const AddCommentToDatabase = async (
  postUid: string,
  comment: CommentTypes
): Promise<isCreated> => {
  return await GetPostByUid(postUid)
    .then((post) => {
      updateDoc(doc(fireDb, "posts", postUid), {
        ...post,
        comments: [...post.comments, comment],
      });
      return {
        isCreated: true,
        errorMessage: null,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        isCreated: false,
        errorMessage: error.message,
      };
    });
};

export default AddCommentToDatabase;
