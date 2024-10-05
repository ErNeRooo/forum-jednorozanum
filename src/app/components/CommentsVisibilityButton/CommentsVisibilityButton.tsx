import Image from "next/image";
import styles from "./CommentsVisibilityButton.module.sass";
import showIcon from "../../../../public/showCommentsIcon.svg";
import hideIcon from "../../../../public/hideCommentsIcon.svg";
import { useState } from "react";

const CommentsVisibilityButton = ({
  setIsCommentsVisible,
  isCommentsVisible,
}: Props) => {
  const [filter, setFilter] = useState<string>(
    "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
  );
  const [backgroundColor, setBackgroundColor] = useState<string>("black");

  const handleOnClick = (): void => {
    setIsCommentsVisible((prev) => !prev);

    if (isCommentsVisible) {
      setFilter("brightness(0%)");
      setBackgroundColor("#31A436");
    } else {
      setFilter(
        "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
      );
      setBackgroundColor("black");
    }
  };

  const handleOnMouseOver = (): void => {
    if (isCommentsVisible) {
      setFilter(
        "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
      );
      setBackgroundColor("black");
    } else {
      setFilter("brightness(0%)");
      setBackgroundColor("#31A436");
    }
  };

  const handleOnMouseLeave = (): void => {
    if (isCommentsVisible) {
      setFilter("brightness(0%)");
      setBackgroundColor("#31A436");
    } else {
      setFilter(
        "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
      );
      setBackgroundColor("black");
    }
  };

  return (
    <div
      className={styles.CommentsVisibilityButton}
      onClick={handleOnClick}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Image
        src={isCommentsVisible ? hideIcon : showIcon}
        alt="show comments"
        style={{
          filter: filter,
        }}
      />
    </div>
  );
};

interface Props {
  setIsCommentsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentsVisible: boolean;
}

export default CommentsVisibilityButton;
