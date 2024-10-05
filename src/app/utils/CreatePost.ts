import PostTypes from "../types/PostTypes";
import AddPostToDatabase from "./AddPostToDatabase";
import GetAccountByUid from "./GetAccountByUid";
import FormatDate from "./FormatDate";
import GenerateRandomString from "./GenerateRandomString";

const CreatePost = (
  userUid: string,
  text: string,
  currentCategory: string,
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreatePostErrorPopupVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>,
  setPostsQuantityInCategory: React.Dispatch<React.SetStateAction<number>>
) => {
  GetAccountByUid(userUid).then((account) => {
    const date = new Date();
    const {
      year,
      month,
      day,
      offsetUTC,
      hours,
      minutes,
      seconds,
      miliseconds,
    } = FormatDate(date);

    const post: PostTypes = {
      id: `${
        account.name
      }${year}${month}${day}${hours}${minutes}${seconds}${miliseconds}${GenerateRandomString(
        "0123456789ABCDSEFGHIJKLMNOPQRSTUVWXYZ",
        4,
        4
      )}`,
      // date
      year: year,
      month: month,
      day: day,
      offsetUTC: offsetUTC,
      // hour
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      miliseconds: miliseconds,
      // post
      author: account.name,
      text: text,
      category: currentCategory,
      image: "",
      comments: [],
      isPinned: false,
    };

    AddPostToDatabase(post)
      .then(() => {
        setPostsQuantityInCategory((prev) => prev + 1);
        setIsFormVisible(false);
        setIsLoading(false);
        setPosts((prev) => [post, ...prev]);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsCreatePostErrorPopupVisible(true);
        console.error(error);

        setTimeout(() => {
          setIsCreatePostErrorPopupVisible(false);
        }, 5000);
      });
  });
};

export default CreatePost;
