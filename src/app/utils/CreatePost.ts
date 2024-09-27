import PostTypes from "../types/PostTypes";
import AddPostToDatabase from "./AddPostToDatabase";
import GetAccountByUid from "./GetAccountByUid";
import FormatDate from "./FormatDate";

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
    };

    AddPostToDatabase(post)
      .then(() => {
        setPosts((posts) => [post, ...posts]);
        setPostsQuantityInCategory((prev) => prev + 1);
        setIsFormVisible(false);
        setIsLoading(false);
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
