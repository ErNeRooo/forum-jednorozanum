import PostTypes from "../types/PostTypes";
import GetAccountByUid from "./GetAccountByUid";
import FormatDate from "./FormatDate";
import AddCommentToDatabase from "./AddCommentToDatabase";
import CommentTypes from "../types/CommentTypes";

const CreateComment = (
  postUid: string,
  userUid: string,
  text: string,
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCreatePostErrorPopupVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setPosts: React.Dispatch<
    React.SetStateAction<(prev: PostTypes[]) => PostTypes[] | PostTypes[]>
  >
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

    const comment: CommentTypes = {
      author: account.name,
      date: `${year}-${month}-${day}`,
      hour: `${hours}:${minutes}:${seconds}`,
      offsetUTC: offsetUTC,
      text: text,
      image: "",
    };

    AddCommentToDatabase(postUid, comment)
      .then(() => {
        setPosts((prev: PostTypes[]) => {
          return prev.flatMap((post) => {
            if (post.id === postUid) {
              return {
                ...post,
                comments: [...post.comments, comment],
              };
            }
            return post;
          });
        });
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

export default CreateComment;
