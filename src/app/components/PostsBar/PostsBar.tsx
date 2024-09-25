import PostTypes from "@/app/types/PostTypes";
import styles from "./PostsBar.module.sass";
import Post from "./Post/Post";
import { CSSProperties, useEffect, useState } from "react";
import GetPosts from "@/app/utils/GetPosts";
import Loader from "../Loader/Loader";

const PostsBar = ({ category, posts, setPosts, searchPhrase }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    GetPosts(category).then((posts) => {
      setPosts(posts);
      setIsLoading(false);
    });
  }, [category, setPosts]);

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
          <Post key={index} post={post} />
        ))}
    </div>
  );
};

interface Props {
  category: string;
  posts: PostTypes[];
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
  searchPhrase: string;
}

export default PostsBar;
