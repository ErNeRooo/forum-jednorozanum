import PostTypes from "@/app/types/PostTypes";
import styles from "./PostsBar.module.sass";
import Post from "./Post/Post";
import { CSSProperties, useEffect, useState } from "react";
import GetPosts from "@/app/utils/GetPosts";
import Loader from "../Loader/Loader";
import GetAccountByUid from "@/app/utils/GetAccountByUid";
import { getAuth, User } from "firebase/auth";
import { app } from "@/app/firebaseConfig";
import SeeMorePostsButton from "../SeeMorePostsButton/SeeMorePostsButton";
import Account from "@/app/types/Account";

const PostsBar = ({
  category,
  posts,
  postsQuantityInCategory,
  setPosts,
  searchPhrase,
  setPostsQuantityInCategory,
  account,
}: Props) => {
  const user: User = getAuth(app).currentUser as User;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [postLimit, setPostLimit] = useState<number>(10);

  useEffect(() => {
    setIsLoading(true);
    setPostLimit(10);
    GetPosts(category, 10).then((posts) => {
      setPosts(posts);
      setIsLoading(false);

      setPosts((prev) => {
        return [...prev].sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        });
      });
    });
    GetAccountByUid(user.uid).then((account) => {
      setUserName(account.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {}, []);

  const loaderStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3rem",
  };

  if (isLoading) {
    return (
      <div className={styles.PostsBar}>
        <Loader style={loaderStyle} />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.PostsBar}>
        <span
          className={styles.noPosts}
        >{`There are no posts in ${category} :/`}</span>
      </div>
    );
  }

  return (
    <div className={styles.PostsBar}>
      {posts
        .filter((post) => post.text.includes(searchPhrase))
        .map((post, index) => {
          console.log(post.id);
          posts.length === index + 1 && console.log("---");
          return (
            <Post
              key={post.id as string}
              post={post}
              setPosts={setPosts}
              userName={userName}
              setPostsQuantityInCategory={setPostsQuantityInCategory}
              account={account}
            />
          );
        })}

      {postsQuantityInCategory > posts.length && (
        <SeeMorePostsButton
          postLimit={postLimit}
          category={category}
          setPostLimit={setPostLimit}
          setPosts={setPosts}
        />
      )}
    </div>
  );
};

interface Props {
  category: string;
  posts: PostTypes[];
  postsQuantityInCategory: number;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  searchPhrase: string;
  setPostsQuantityInCategory: React.Dispatch<React.SetStateAction<number>>;
  account: Account | null;
}

export default PostsBar;
