import { fireDb } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import PostTypes from "../types/PostTypes";

const GetPostByUid = (postUid: string): Promise<PostTypes> => {
  console.log("GetPostByUid: " + postUid);
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
      imageUrl,
      comments,
      isPinned,
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
      imageUrl: imageUrl,
      comments: comments,
      isPinned: isPinned,
    };
  });
};

export default GetPostByUid;
