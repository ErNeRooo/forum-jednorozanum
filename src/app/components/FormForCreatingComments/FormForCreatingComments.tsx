"use client";
import { CSSProperties, useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import styles from "./FormForCreatingComments.module.sass";
import { app } from "@/app/firebaseConfig";
import CreatePostErrorPopup from "../CreatePostErrorPopup/CreatePostErrorPopup";
import Loader from "../Loader/Loader";
import PostTypes from "@/app/types/PostTypes";
import CreatePost from "@/app/utils/CreatePost";
import Account from "@/app/types/Account";
import CreateComment from "@/app/utils/CreateComment";

const FormForCreatingComments = ({
  setIsFormVisible,
  setPosts,
  userName,
  postUid,
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

    CreateComment(
      postUid,
      user.uid,
      text,
      setIsFormVisible,
      setIsLoading,
      setIsCreatePostErrorPopupVisible,
      setPosts as React.Dispatch<
        React.SetStateAction<(prev: PostTypes[]) => PostTypes[] | PostTypes[]>
      >
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
      <div className={styles.FormForCreatingComments}>
        <section className={styles.formHeader}>
          <span
            className={styles.title}
          >{`${userName} | ${currentDate.toLocaleTimeString()} | ${currentDate.toLocaleDateString()} | ${offsetUTC} 
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
            Create
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
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  userName: string;
  postUid: string;
}

export default FormForCreatingComments;
