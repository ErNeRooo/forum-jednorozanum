import { fireDb } from "../firebaseConfig";
import {
  getDocs,
  where,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import PostTypes from "../types/PostTypes";

const GetPosts = async (
  category: string,
  limitOfPosts: number
): Promise<PostTypes[]> => {
  const posts: PostTypes[] = [];
  const Query = query(
    collection(fireDb, "posts"),
    ...(category !== "All" ? [where("category", "==", category)] : []),
    orderBy("year", "desc"),
    orderBy("month", "desc"),
    orderBy("day", "desc"),
    orderBy("hours", "desc"),
    orderBy("minutes", "desc"),
    orderBy("seconds", "desc"),
    orderBy("miliseconds", "desc"),
    limit(limitOfPosts)
  );

  return getDocs(Query)
    .then((snapshot) => {
      for (const doc of snapshot.docs) {
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
        } = doc.data();

        posts.push({
          id: doc.id,
          //date
          year: year,
          month: month,
          day: day,
          offsetUTC: offsetUTC,
          //hour
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          miliseconds: miliseconds,
          //post
          author: author,
          text: text,
          category: category,
          imageUrl: doc.data().imageUrl,
          comments: comments,
          isPinned: isPinned,
        });
      }

      return posts;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export default GetPosts;
