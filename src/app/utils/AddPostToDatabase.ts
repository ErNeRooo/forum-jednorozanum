import { fireDb } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import PostTypes from "../types/PostTypes";
import isDatabaseOperationSuccessfull from "../types/isDatabaseOperationSuccessfull";

const AddPostToDatabase = async (
  post: PostTypes
): Promise<isDatabaseOperationSuccessfull> => {
  const {
    year,
    month,
    day,
    offsetUTC,
    hours,
    minutes,
    seconds,
    miliseconds,
    author,
    text,
    category,
    image,
    comments,
  } = post;
  return await addDoc(collection(fireDb, "posts"), {
    // date
    year: year,
    month: month,
    day: day,
    offsetUTC: offsetUTC,
    // hour
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    miliseconds: miliseconds,
    // post
    author: author,
    text: text,
    category: category,
    image: image,
    comments: comments,
  })
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
        errorMessage: error.errorMessage,
      };
    });
};

export default AddPostToDatabase;
