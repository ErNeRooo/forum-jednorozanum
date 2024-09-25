"use client";
import { useState } from "react";
import { getAuth, User } from "firebase/auth";
import styles from "./FormForCreatingPosts.module.sass";
import AddAccountToDatabase from "@/app/utils/AddAccountToDatabase";
import { app } from "@/app/firebaseConfig";
import FindAccountByUid from "@/app/utils/FindAccountByUid";
import CreatePostErrorPopup from "../CreatePostErrorPopup/CreatePostErrorPopup";
import Loader from "../Loader/Loader";
import FormatDate from "@/app/utils/FormatDate";
import PostTypes from "@/app/types/PostTypes";
import AddPostToDatabase from "@/app/utils/AddPostToDatabase";
import CreatePost from "@/app/utils/CreatePost";

const FormForCreatingPosts = ({
  setIsFormVisible,
  currentCategory,
  setPosts,
}: Props) => {
  const auth = getAuth(app);
  const user: User = auth.currentUser as User;
  const [text, setText] = useState<string>("");
  const [isCreatePostErrorPopupVisible, setIsCreatePostErrorPopupVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreatePostOnClick = (): void => {
    if (!text || user === null) return;

    CreatePost(
      user.uid,
      text,
      currentCategory,
      setIsFormVisible,
      setIsLoading,
      setIsCreatePostErrorPopupVisible,
      setPosts
    );

    setIsLoading(true);
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
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export default FormForCreatingPosts;
