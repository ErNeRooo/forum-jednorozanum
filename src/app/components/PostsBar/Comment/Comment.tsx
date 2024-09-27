import Image from "next/image";
import styles from "./Comment.module.sass";
import CommentTypes from "@/app/types/CommentTypes";
import PostTypes from "@/app/types/PostTypes";
import DeleteCommentButton from "../../DeleteCommentButton/DeleteCommentButton";
import Account from "@/app/types/Account";

const Comment = ({
  comment: { id, author, date, hour, offsetUTC, text, image },
  userName,
  postId,
  account,
  setPosts,
}: Props) => {
  return (
    <div className={styles.Comment}>
      <div className={styles.header}>
        {`${author} | ${hour} | ${date} | UTC ${offsetUTC}`}
        {(author === userName || account?.role === "admin") && (
          <DeleteCommentButton
            postUid={postId}
            commentUid={id as string}
            setPosts={setPosts}
          />
        )}
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
  );
};

interface Props {
  comment: CommentTypes;
  userName: string;
  postId: string;
  account: Account | null;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export default Comment;
