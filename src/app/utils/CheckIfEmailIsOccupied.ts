import { fireDb } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const CheckIfEmailIsOccupied = async (email: string): Promise<boolean> => {
  const Query = query(
    collection(fireDb, "accounts"),
    where("email", "==", email)
  );
  return getDocs(Query).then((querySnapshot) => {
    console.log(querySnapshot.docs.length);
    console.log(querySnapshot);
    console.log(querySnapshot.docs.length > 0 ? true : false);
    return querySnapshot.docs.length > 0 ? true : false;
  });
};

export default CheckIfEmailIsOccupied;
