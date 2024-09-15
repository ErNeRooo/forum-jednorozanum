import { fireDb } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const FindUserNameByEmail = async (email: string): Promise<string> => {
  const Query = query(
    collection(fireDb, "accounts"),
    where("email", "==", email)
  );
  return getDocs(Query).then((querySnapshot) => {
    return querySnapshot.docs[0].data().name;
  });
};

export default FindUserNameByEmail;
