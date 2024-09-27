import CommentTypes from "./CommentTypes";

export default PostTypes;

interface PostTypes {
  id?: string;
  //date
  year: string;
  month: string;
  day: string;
  offsetUTC: string;
  //hour
  hours: string;
  minutes: string;
  seconds: string;
  miliseconds: string;
  //post
  author: string;
  text: string;
  category: string;
  image: string;
  comments: CommentTypes[];
  isPinned: boolean;
}
