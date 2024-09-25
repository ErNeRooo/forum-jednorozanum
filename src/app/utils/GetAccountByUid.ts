import { fireDb } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Account from "../types/Account";

const GetAccountByUid = async (uid: string): Promise<Account> => {
  return await getDoc(doc(fireDb, "accounts", uid)).then((doc) => {
    return doc.data() as Account;
  });
};

export default GetAccountByUid;
