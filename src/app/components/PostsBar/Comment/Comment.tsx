import Image from "next/image";
import styles from "./Comment.module.sass";
import CommentTypes from "@/app/types/CommentTypes";

const Comment = ({
  comment: { author, date, hour, offsetUTC, text, image },
}: Props) => {
  return (
    <div className={styles.Comment}>
      <div className={styles.header}>
        {`${author} | ${hour} | ${date} | UTC ${offsetUTC}`}{" "}
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
}

export default Comment;
