import Image from "next/image";
import styles from "./Comment.module.sass";

const Comment = ({
  comment: { id, author, date, hour, text, image },
}: Props) => {
  return (
    <div className={styles.Comment}>
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
  );
};

interface Props {
  comment: {
    id: string;
    author: string;
    date: string;
    hour: string;
    text: string;
    image: string;
  };
}

export default Comment;
