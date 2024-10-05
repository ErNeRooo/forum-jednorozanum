import GetAccountByUid from "./GetAccountByUid";

const GetAccountCategories = async (uid: string): Promise<string[]> => {
  return await GetAccountByUid(uid).then((account) => {
    if (!account) {
      console.log("Account not found");
      return [];
    }
    return account.categories;
  });
};

export default GetAccountCategories;
