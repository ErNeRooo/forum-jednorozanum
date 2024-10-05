import { fireDb } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Account from "../types/Account";

const GetAccountByUid = async (uid: string): Promise<Account | undefined> => {
  return await getDoc(doc(fireDb, "accounts", uid))
    .then((doc) => {
      if (doc.exists()) {
        const { email, isBanned, name, role, categories } = doc.data();
        return {
          email: email,
          isBanned: isBanned,
          name: name,
          role: role,
          categories: categories,
        };
      }
      console.log("Account not found");
      return undefined;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

export default GetAccountByUid;
