import GetAccountByUid from "./GetAccountByUid";

const GetAccountCategories = async (uid: string): Promise<string[]> => {
  return await GetAccountByUid(uid).then((account) => {
    return account.categories;
  });
};

export default GetAccountCategories;
