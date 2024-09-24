"use client";
import { CSSProperties, useState } from "react";
import styles from "./FormForCreatingPosts.module.sass";

const FormForCreatingPosts = ({ setIsFormVisible, isFormVisible }: Props) => {
  const [text, setText] = useState<string>("");

  const handleCreatePostOnClick = (): void => {
    if (text) {
      setIsFormVisible(false);
    }
  };
  const handleCancelOnClick = (): void => {
    setIsFormVisible(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.FormForCreatingPosts}>
        <textarea
          className={styles.input}
          placeholder={"Write something..."}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <section className={styles.buttonsContainer}>
          <div onClick={handleCancelOnClick} className={styles.button}>
            Cancel
          </div>
          <div onClick={handleCreatePostOnClick} className={styles.button}>
            Create Post
          </div>
        </section>
      </div>
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isFormVisible: boolean;
}

export default FormForCreatingPosts;
