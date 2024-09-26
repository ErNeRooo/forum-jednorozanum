"use client";
import Image from "next/image";
import styles from "./CreateCommentButton.module.sass";
import replyIcon from "../../../../public/replyIcon.svg";
import { CSSProperties, useState } from "react";

const CreateCommentButton = ({ setIsFormVisible }: Props) => {
  const [filter, setFilter] = useState<string>(
    "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
  );

  const handleOnClick = (): void => {
    setIsFormVisible(true);
  };

  const iconStyle: CSSProperties = {
    filter: filter,
  };

  return (
    <div
      className={styles.CreateCommentButton}
      onClick={handleOnClick}
      onMouseOver={() => setFilter("brightness(0%)")}
      onMouseLeave={() =>
        setFilter(
          "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
        )
      }
    >
      <Image src={replyIcon} alt="reply" style={iconStyle} />
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default CreateCommentButton;
