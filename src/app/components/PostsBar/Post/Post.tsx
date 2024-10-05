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
import Account from "@/app/types/Account";
import PinPostButton from "../../PinPostButton/PinPostButton";

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
    isPinned,
  },
  userName,
  setPosts,
  setPostsQuantityInCategory,
  account,
}: Props) => {
  const [
    isFormForCreatingCommentsVisible,
    setIsFormForCreatingCommentsVisible,
  ] = useState(false);
  const [isPinnedState, setIsPinnedState] = useState(isPinned);

  return (
    <>
      <div
        key={id}
        className={styles.Post + " " + (isPinned ? styles.pinned : "")}
      >
        <div className={styles.header}>
          <span>{`${author} | ${category} | ${hours}:${minutes}:${seconds} | ${day}.${month}.${year} | UTC ${offsetUTC}`}</span>
          <div className={styles.buttons}>
            <CreateCommentButton
              setIsFormVisible={setIsFormForCreatingCommentsVisible}
            />
            {(userName === author || account?.role === "admin") && (
              <DeletePostButton
                postUid={id}
                setPosts={setPosts}
                setPostsQuantityInCategory={setPostsQuantityInCategory}
              />
            )}
            {account?.role === "admin" && (
              <PinPostButton
                postUid={id}
                isPinned={isPinnedState}
                setIsPinned={setIsPinnedState}
                setPosts={setPosts}
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
            postId={id}
            setPosts={setPosts}
            account={account}
          />
        ))}
      </div>
      {isFormForCreatingCommentsVisible && (
        <FormForCreatingComments
          setIsFormVisible={setIsFormForCreatingCommentsVisible}
          setPosts={setPosts}
          userName={userName}
          postUid={id}
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
  account: Account | null;
}

export default Post;
