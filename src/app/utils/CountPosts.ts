import { fireDb } from "../firebaseConfig";
import {
  collection,
  where,
  query,
  getCountFromServer,
} from "firebase/firestore";

const CountPosts = async (category: string): Promise<number> => {
  const Query = query(
    collection(fireDb, "posts"),
    ...(category !== "All" ? [where("category", "==", category)] : [])
  );

  return await getCountFromServer(Query).then((querySnapshot) => {
    if (querySnapshot.data() === undefined) return 0;
    return querySnapshot.data().count;
  });
};

export default CountPosts;
