"use client";
import styles from "./CreateCommentButton.module.sass";

const CreateCommentButton = ({ setIsFormVisible }: Props) => {
  const handleOnClick = (): void => {
    setIsFormVisible(true);
  };

  return (
    <div className={styles.CreateCommentButton} onClick={handleOnClick}>
      <span>Reply</span>
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default CreateCommentButton;
