import CommentTypes from "./CommentTypes";

export default PostTypes;

interface PostTypes {
  id: string;
  author: string;
  date: string;
  hour: string;
  text: string;
  image: string;
  comments: CommentTypes[];
}
