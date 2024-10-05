"use client";
import {
  BaseSyntheticEvent,
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getAuth, User } from "firebase/auth";
import styles from "./FormForCreatingPosts.module.sass";
import { app } from "@/app/firebaseConfig";
import CreatePostErrorPopup from "../CreatePostErrorPopup/CreatePostErrorPopup";
import Loader from "../Loader/Loader";
import PostTypes from "@/app/types/PostTypes";
import CreatePost from "@/app/utils/CreatePost";
import Account from "@/app/types/Account";
import AttachFileButton from "../AttachFileButton/AttachFileButton";

const FormForCreatingPosts = ({
  setIsFormVisible,
  currentCategory,
  setPosts,
  account,
  setPostsQuantityInCategory,
}: Props) => {
  const user: User = getAuth(app).currentUser as User;
  const [text, setText] = useState<string>("");
  const [isCreatePostErrorPopupVisible, setIsCreatePostErrorPopupVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [offsetUTC, setOffsetUTC] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const memoCurrentDate = useMemo(() => currentDate, [currentDate]);

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

    textAreaRef.current?.focus();

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
      setPosts,
      setPostsQuantityInCategory
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
          } | ${currentCategory} | ${memoCurrentDate.toLocaleTimeString()} | ${memoCurrentDate.toLocaleDateString()} | ${offsetUTC} 
          `}</span>
          <span className={styles.counter}>{`${text.length}/500`}</span>
        </section>
        <textarea
          className={styles.text}
          placeholder={"Write something..."}
          onChange={(e) => setText(e.target.value)}
          value={text}
          maxLength={500}
          ref={textAreaRef}
        />
        <section className={styles.attachmentBar}>
          <AttachFileButton setSelectedFile={setSelectedFile} />
          <span className={styles.uploadedFiles}>{selectedFile?.name}</span>
        </section>
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
  currentCategory: string;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  account: Account | null;
  setPostsQuantityInCategory: React.Dispatch<React.SetStateAction<number>>;
}

export default FormForCreatingPosts;
