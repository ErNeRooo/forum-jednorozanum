import Image from "next/image";
import styles from "./Post.module.sass";
import PostTypes from "@/app/types/PostTypes";
import Comment from "../Comment/Comment";
import { useState } from "react";
import FormForCreatingComments from "../../FormForCreatingComments/FormForCreatingComments";
import CreateCommentButton from "../../CreateCommentButton/CreateCommentButton";
import DeletePostButton from "../../DeletePostButton/DeletePostButton";
import Account from "@/app/types/Account";
import PinPostButton from "../../PinPostButton/PinPostButton";
import CommentsVisibilityButton from "../../CommentsVisibilityButton/CommentsVisibilityButton";

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
    imageUrl,
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
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

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
                imageUrl={imageUrl}
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
          {imageUrl && (
            <div className={styles.image}>
              <Image
                src={imageUrl}
                alt="post image"
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          )}

          <div className={styles.text}>{text}</div>
        </div>
      </div>
      <div className={styles.comments}>
        {isCommentsVisible
          ? comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                userName={userName}
                postId={id}
                setPosts={setPosts}
                account={account}
              />
            ))
          : null}
      </div>
      {comments.length > 0 && (
        <CommentsVisibilityButton
          setIsCommentsVisible={setIsCommentsVisible}
          isCommentsVisible={isCommentsVisible}
        />
      )}
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
