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

const PostsBar = ({
  category,
  posts,
  postsQuantityInCategory,
  setPosts,
  searchPhrase,
  setPostsQuantityInCategory,
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
    });
    GetAccountByUid(user.uid).then((account) => {
      setUserName(account.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
        .map((post, index) => (
          <Post
            key={index}
            post={post}
            setPosts={setPosts}
            userName={userName}
            setPostsQuantityInCategory={setPostsQuantityInCategory}
          />
        ))}

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
}

export default PostsBar;
