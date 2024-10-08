import DeletePostFromDatabase from "@/app/utils/DeletePostFromDatabase";
import styles from "./DeletePostButton.module.sass";
import PostTypes from "@/app/types/PostTypes";
import Image from "next/image";
import deleteIcon from "../../../../public/deleteIcon.svg";
import { CSSProperties, useState } from "react";
import DeleteFileFromDatabase from "@/app/utils/DeleteFileFromDatabase";

const DeletePostButton = ({
  postUid,
  imageUrl,
  setPosts,
  setPostsQuantityInCategory,
}: Props) => {
  const [filter, setFilter] = useState<string>(
    "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
  );
  const handleOnClick = (): void => {
    DeletePostFromDatabase(postUid).then(({ isSuccessfull, errorMessage }) => {
      if (imageUrl !== "") DeleteFileFromDatabase(imageUrl);

      if (isSuccessfull) {
        setPosts((prev) => prev.filter((post) => post.id !== postUid));
        setPostsQuantityInCategory((prev) => prev - 1);
      } else {
        console.log(errorMessage);
        alert("Failed to delete post");
      }
    });
  };

  const iconStyle: CSSProperties = {
    filter: filter,
  };

  return (
    <div
      className={styles.DeletePostButton}
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
  imageUrl: string;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  setPostsQuantityInCategory: React.Dispatch<React.SetStateAction<number>>;
}

export default DeletePostButton;
