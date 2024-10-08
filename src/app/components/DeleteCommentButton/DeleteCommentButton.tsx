import { CSSProperties, useState } from "react";
import styles from "./DeleteCommentButton.module.sass";
import PostTypes from "@/app/types/PostTypes";
import Image from "next/image";
import DeletePostFromDatabase from "@/app/utils/DeletePostFromDatabase";
import deleteIcon from "../../../../public/deleteIcon.svg";
import DeleteCommentFromDatabase from "@/app/utils/DeleteCommentFromDatabase";
import DeleteFileFromDatabase from "@/app/utils/DeleteFileFromDatabase";

const DeleteCommentButton = ({
  postUid,
  commentUid,
  imageUrl,
  setPosts,
}: Props) => {
  const [filter, setFilter] = useState<string>(
    "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
  );
  const handleOnClick = (): void => {
    DeleteCommentFromDatabase(postUid, commentUid).then(
      ({ isSuccessfull, errorMessage }) => {
        if (imageUrl !== "") DeleteFileFromDatabase(imageUrl);

        if (isSuccessfull) {
          setPosts((prev: PostTypes[]) => {
            return prev.flatMap((post) => {
              if (post.id !== postUid) return post;
              return {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== commentUid
                ),
              };
            });
          });
        } else {
          console.log(errorMessage);
          alert("Failed to delete comment");
        }
      }
    );
  };

  const iconStyle: CSSProperties = {
    filter: filter,
  };

  return (
    <div
      className={styles.DeleteCommentButton}
      onClick={handleOnClick}
      onMouseOver={() => setFilter("brightness(0%)")}
      onMouseLeave={() =>
        setFilter(
          "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
        )
      }
    >
      <Image src={deleteIcon} alt="delete" style={iconStyle} />
    </div>
  );
};

interface Props {
  postUid: string;
  commentUid: string;
  imageUrl: string;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export default DeleteCommentButton;
