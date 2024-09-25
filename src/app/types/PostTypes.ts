import CommentTypes from "./CommentTypes";

export default PostTypes;

interface PostTypes {
  author: string;
  date: string;
  hour: string;
  text: string;
  category: string;
  image: string;
  comments: CommentTypes[];
}
