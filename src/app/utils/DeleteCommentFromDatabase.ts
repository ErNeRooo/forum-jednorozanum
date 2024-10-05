import { fireDb } from "../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import GetPostByUid from "./GetPostByUid";
import result from "../types/result";

const DeleteCommentFromDatabase = async (
  postUid: string,
  commentUid: string
): Promise<result> => {
  return GetPostByUid(postUid).then((post) => {
    return updateDoc(doc(fireDb, "posts", postUid), {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentUid),
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
  });
};

export default DeleteCommentFromDatabase;
