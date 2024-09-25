import { fireDb } from "../firebaseConfig";
import { getDocs, where, collection, query, orderBy } from "firebase/firestore";
import PostTypes from "../types/PostTypes";

const GetPosts = async (category: string): Promise<PostTypes[]> => {
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
    orderBy("miliseconds", "desc")
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
          image,
          comments,
        } = doc.data() as PostTypes;

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
          image: image,
          comments: comments,
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
