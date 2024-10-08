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
import SortPostsByIsPinned from "@/app/utils/SortPostsByIsPinned";
import SortPostsByDate from "@/app/utils/SortPostsByDate";

const PostsBar = ({
  category,
  posts,
  postsQuantityInCategory,
  setPosts,
  searchPhrase,
  setPostsQuantityInCategory,
  account,
}: Props) => {
  const user: User | null = getAuth(app).currentUser;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [postLimit, setPostLimit] = useState<number>(10);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      setPostLimit(10);
      GetPosts(category, 10).then((posts) => {
        setPosts(SortPostsByIsPinned(posts));
      });
      GetAccountByUid(user.uid).then((account) => {
        if (!account) return;

        setUserName(account.name);
        setIsLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, user]);

  useEffect(() => {
    setPosts((prev) => {
      return SortPostsByIsPinned(SortPostsByDate(prev, "desc"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPosts]);

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
      {posts.length !== undefined &&
        posts
          .filter((post) => post.text.includes(searchPhrase))
          .map((post) => {
            return (
              <Post
                key={post.id}
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
