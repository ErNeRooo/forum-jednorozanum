"use client";
import { useState } from "react";
import { getAuth, User } from "firebase/auth";
import styles from "./FormForCreatingPosts.module.sass";
import CreatePost from "@/app/utils/CreatePost";
import { app } from "@/app/firebaseConfig";
import FindAccountByUid from "@/app/utils/FindAccountByUid";
import CreatePostErrorPopup from "../CreatePostErrorPopup/CreatePostErrorPopup";
import Loader from "../Loader/Loader";

const FormForCreatingPosts = ({ setIsFormVisible, currentCategory }: Props) => {
  const auth = getAuth(app);
  const user: User = auth.currentUser as User;
  const [text, setText] = useState<string>("");
  const [isCreatePostErrorPopupVisible, setIsCreatePostErrorPopupVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreatePostOnClick = (): void => {
    if (!text || user === null) return;

    setIsLoading(true);

    FindAccountByUid(user.uid).then((account) => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formatedDate = `${day < 10 ? `0${day}` : day}.${
        month < 10 ? `0${month}` : month
      }.${year}`;
      const formatedHour = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;

      CreatePost({
        author: account.name,
        date: formatedDate,
        hour: formatedHour,
        text: text,
        category: currentCategory,
        image: "",
        comments: [],
      })
        .then(() => {
          setIsFormVisible(false);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsCreatePostErrorPopupVisible(true);
          console.error(error);

          setTimeout(() => {
            setIsCreatePostErrorPopupVisible(false);
          }, 5000);
        });
    });
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
      {isLoading && <Loader />}
      {isCreatePostErrorPopupVisible && <CreatePostErrorPopup />}
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentCategory: string;
}

export default FormForCreatingPosts;
