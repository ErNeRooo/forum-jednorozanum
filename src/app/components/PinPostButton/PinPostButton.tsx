import PostTypes from "@/app/types/PostTypes";
import styles from "./PinPostButton.module.sass";
import UpdatePinPost from "@/app/utils/UpdatePinPost";
import { CSSProperties, useState } from "react";
import Image from "next/image";
import pinIcon from "../../../../public/pinIcon.svg";
import SortPostsByIsPinned from "@/app/utils/SortPostsByIsPinned";

const PinPostButton = ({ postUid, isPinned, setIsPinned, setPosts }: Props) => {
  const pickColor = isPinned
    ? "brightness(0%)"
    : "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)";
  const [filter, setFilter] = useState<string>(pickColor);

  const handleClick = (): void => {
    setIsPinned(!isPinned);
    UpdatePinPost(postUid, isPinned).then(() => {
      setPosts((prev) => {
        return SortPostsByIsPinned(
          prev.map((post) => {
            if (post.id !== postUid) return post;
            return { ...post, isPinned: !isPinned };
          })
        );
      });
    });
  };

  const iconStyle: CSSProperties = {
    filter: filter,
  };

  return (
    <div
      className={styles.PinPostButton + (isPinned ? " " + styles.pinned : "")}
      onClick={handleClick}
      onMouseOver={() => setFilter("brightness(0%)")}
      onMouseLeave={() => setFilter(pickColor)}
      key={postUid}
    >
      <Image src={pinIcon} alt="pin" style={iconStyle} />
    </div>
  );
};

interface Props {
  postUid: string;
  isPinned: boolean;
  setIsPinned: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export default PinPostButton;
