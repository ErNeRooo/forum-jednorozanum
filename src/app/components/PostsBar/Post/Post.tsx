import Image from "next/image";
import styles from "./Post.module.sass";
import PostTypes from "@/app/types/PostTypes";
import Comment from "../Comment/Comment";

const Post = ({
  post: {
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
}: Props) => {
  return (
    <>
      <div className={styles.Post}>
        <div className={styles.header}>
          {`${author} | ${category} | ${hours}:${minutes} | ${day}.${month}.${year} | UTC ${offsetUTC}`}
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
