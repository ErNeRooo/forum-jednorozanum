import PostTypes from "../types/PostTypes";
import AddPostToDatabase from "./AddPostToDatabase";
import GetAccountByUid from "./GetAccountByUid";
import FormatDate from "./FormatDate";
import GenerateRandomString from "./GenerateRandomString";
import AddFileToDatabase from "./AddFileToDatabase";
import { ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

const CreatePost = (
  userUid: string,
  text: string,
  currentCategory: string,
  image: File | null,
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreatePostErrorPopupVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>,
  setPostsQuantityInCategory: React.Dispatch<React.SetStateAction<number>>
) => {
  GetAccountByUid(userUid).then((account) => {
    if (!account) return;

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

    const imageUniqueName = image
      ? `${GenerateRandomString(
          "0123456789ABCDSEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          10,
          10
        )}_${day}-${month}-${year}`
      : "";

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
      imageUrl: "",
      comments: [],
      isPinned: false,
    };

    const storageRef = ref(storage, `images/${imageUniqueName}`);

    AddFileToDatabase(image, storageRef)
      .then((result) => {
        if (result.isSuccessfull) {
          post.imageUrl = result.downloadUrl ? result.downloadUrl : "";

          AddPostToDatabase(post).then((result) => {
            if (!result.isSuccessfull) {
              console.error(result.errorMessage);
              return Promise.resolve();
            }
          });
        } else {
          console.error(result.errorMessage);
          return Promise.resolve();
        }
      })
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
