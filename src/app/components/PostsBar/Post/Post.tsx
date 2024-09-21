import Image from "next/image";
import styles from "./Post.module.sass";
import PostTypes from "@/app/types/PostTypes";
import Comment from "../Comment/Comment";

const Post = ({
  post: { id, author, date, hour, text, image, comments },
}: Props) => {
  return (
    <>
      <div className={styles.Post}>
        <div className={styles.header}>{`${author} | ${hour} | ${date}`} </div>
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
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

interface Props {
  post: PostTypes;
}

export default Post;
