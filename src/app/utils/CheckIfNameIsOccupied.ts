import { fireDb } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const CheckIfNameIsOccupied = async (name: string): Promise<boolean> => {
  const Query = query(
    collection(fireDb, "accounts"),
    where("name", "==", name)
  );
  return getDocs(Query).then((querySnapshot) => {
    return querySnapshot.docs.length > 0 ? true : false;
  });
};

export default CheckIfNameIsOccupied;
