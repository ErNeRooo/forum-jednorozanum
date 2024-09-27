import Image from "next/image";
import styles from "./Post.module.sass";
import PostTypes from "@/app/types/PostTypes";
import Comment from "../Comment/Comment";
import { useState } from "react";
import FormForCreatingComments from "../../FormForCreatingComments/FormForCreatingComments";
import CreateCommentButton from "../../CreateCommentButton/CreateCommentButton";
import { getAuth, User } from "firebase/auth";
import { app } from "@/app/firebaseConfig";
import DeletePostButton from "../../DeletePostButton/DeletePostButton";

const Post = ({
  post: {
    id,
    year,
    month,
    day,
    offsetUTC,
    hours,
    minutes,
    seconds,
    miliseconds,
    author,
    text,
    category,
    image,
    comments,
  },
  userName,
  setPosts,
  setPostsQuantityInCategory,
}: Props) => {
  const [
    isFormForCreatingCommentsVisible,
    setIsFormForCreatingCommentsVisible,
  ] = useState(false);

  return (
    <>
      <div className={styles.Post}>
        <div className={styles.header}>
          <span>{`${author} | ${category} | ${hours}:${minutes}:${seconds} | ${day}.${month}.${year} | UTC ${offsetUTC}`}</span>
          <div className={styles.buttons}>
            <CreateCommentButton
              setIsFormVisible={setIsFormForCreatingCommentsVisible}
            />
            {userName === author && (
              <DeletePostButton
                postUid={id as string}
                setPosts={setPosts}
                setPostsQuantityInCategory={setPostsQuantityInCategory}
              />
            )}
          </div>
        </div>
        <div className={styles.content}>
          {image && (
            <div className={styles.image}>
              <Image src={image} alt="post image" />
            </div>
          )}

          <div className={styles.text}>{text}</div>
        </div>
      </div>
      <div className={styles.comments}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            userName={userName}
            postId={id as string}
            setPosts={setPosts}
          />
        ))}
      </div>
      {isFormForCreatingCommentsVisible && (
        <FormForCreatingComments
          setIsFormVisible={setIsFormForCreatingCommentsVisible}
          setPosts={setPosts}
          userName={userName}
          postUid={id as string}
        />
      )}
    </>
  );
};

interface Props {
  post: PostTypes;
  userName: string;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  setPostsQuantityInCategory: React.Dispatch<React.SetStateAction<number>>;
}

export default Post;
