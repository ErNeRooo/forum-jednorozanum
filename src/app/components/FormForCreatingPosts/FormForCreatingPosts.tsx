"use client";
import { CSSProperties, useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import styles from "./FormForCreatingPosts.module.sass";
import { app } from "@/app/firebaseConfig";
import CreatePostErrorPopup from "../CreatePostErrorPopup/CreatePostErrorPopup";
import Loader from "../Loader/Loader";
import PostTypes from "@/app/types/PostTypes";
import CreatePost from "@/app/utils/CreatePost";
import GetAccountByUid from "@/app/utils/GetAccountByUid";
import Account from "@/app/types/Account";

const FormForCreatingPosts = ({
  setIsFormVisible,
  currentCategory,
  setPosts,
  account,
}: Props) => {
  const user: User = getAuth(app).currentUser as User;
  const [text, setText] = useState<string>("");
  const [isCreatePostErrorPopupVisible, setIsCreatePostErrorPopupVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [offsetUTC, setOffsetUTC] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    const timezoneOffset = currentDate.getTimezoneOffset();
    setOffsetUTC(
      timezoneOffset < 0
        ? `UTC +${Math.abs(timezoneOffset / 60)}`
        : `UTC -${timezoneOffset / 60}`
    );

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const loaderStyle: CSSProperties = {
    position: "fixed",
    width: "4rem",
    top: "calc(50% - 2rem)",
    left: "calc(50% - 2rem)",
  };

  return (
    <div className={styles.background}>
      <div className={styles.FormForCreatingPosts}>
        <section className={styles.formHeader}>
          <span className={styles.title}>{`${
            account?.name
          } | ${currentCategory} | ${currentDate.toLocaleTimeString()} | ${currentDate.toLocaleDateString()} | ${offsetUTC} 
          `}</span>
          <span className={styles.counter}>{`${text.length}/500`}</span>
        </section>
        <textarea
          className={styles.input}
          placeholder={"Write something..."}
          onChange={(e) => setText(e.target.value)}
          value={text}
          maxLength={500}
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
      {isLoading && <Loader style={loaderStyle} />}
      {isCreatePostErrorPopupVisible && <CreatePostErrorPopup />}
    </div>
  );
};

interface Props {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentCategory: string;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  account: Account | null;
}

export default FormForCreatingPosts;
