"use client";
import styles from "./CreatePostButton.module.sass";

const CreatePostButton = ({ setIsFormVisible }: Props) => {
  const handleOnClick = (): void => {
    setIsFormVisible(true);
  };

  return (
    <div className={styles.CreatePostButton} onClick={handleOnClick}>
      <span>Create Post</span>
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default CreatePostButton;
