import { fireDb } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import PostTypes from "../types/PostTypes";
import isCreated from "../types/isCreated";
import { Exception } from "sass";

const CreatePost = async (post: PostTypes): Promise<isCreated> => {
  return await addDoc(collection(fireDb, "posts"), {
    author: post.author,
    date: post.date,
    hour: post.hour,
    text: post.text,
    category: post.category,
    image: post.image,
    comments: post.comments,
  })
    .then(() => {
      return {
        isCreated: true,
        errorMessage: null,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        isCreated: false,
        errorMessage: error.errorMessage,
      };
    });
};

export default CreatePost;
