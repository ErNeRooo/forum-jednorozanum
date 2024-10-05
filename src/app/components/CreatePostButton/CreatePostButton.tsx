"use client";
import styles from "./CreatePostButton.module.sass";
import addIcon from "../../../../public/addIcon.svg";
import Image from "next/image";
import { CSSProperties, useState } from "react";

const CreatePostButton = ({ setIsFormVisible }: Props) => {
  const [filter, setFilter] = useState<string>(
    "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
  );
  const handleOnClick = (): void => {
    setIsFormVisible(true);
  };

  const iconStyle: CSSProperties = {
    filter: filter,
    transform: "scale(2)",
  };

  return (
    <div
      className={styles.CreatePostButton}
      onClick={handleOnClick}
      onMouseOver={() => setFilter("brightness(0%)")}
      onMouseLeave={() =>
        setFilter(
          "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
        )
      }
    >
      <Image src={addIcon} alt="create post" style={iconStyle} />
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default CreatePostButton;
