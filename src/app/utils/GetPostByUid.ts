import { fireDb } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import PostTypes from "../types/PostTypes";

const GetPostByUid = (postUid: string): Promise<PostTypes> => {
  return getDoc(doc(fireDb, "posts", postUid)).then((doc) => {
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
    } = doc.data() as PostTypes;

    return {
      id: postUid,
      year: year,
      month: month,
      day: day,
      offsetUTC: offsetUTC,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      miliseconds: miliseconds,
      author: author,
      text: text,
      category: category,
      image: image,
      comments: comments,
    };
  });
};

export default GetPostByUid;
