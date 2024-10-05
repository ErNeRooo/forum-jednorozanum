import { fireDb } from "../firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import PostTypes from "../types/PostTypes";
import isDatabaseOperationSuccessfull from "../types/isDatabaseOperationSuccessfull";

const AddPostToDatabase = async (
  post: PostTypes
): Promise<isDatabaseOperationSuccessfull> => {
  const {
    id,
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
    isPinned,
  } = post;

  const docRef = doc(fireDb, "posts", id);

  return await setDoc(docRef, {
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
    isPinned: isPinned,
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
