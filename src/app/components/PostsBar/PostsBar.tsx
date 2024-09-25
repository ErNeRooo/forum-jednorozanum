import PostTypes from "@/app/types/PostTypes";
import styles from "./PostsBar.module.sass";
import Post from "./Post/Post";
import { useEffect, useState } from "react";
import GetPosts from "@/app/utils/GetPosts";

const PostsBar = ({ category, posts, setPosts }: Props) => {
  useEffect(() => {
    GetPosts(category).then((posts) => setPosts(posts));
  }, [category, setPosts]);

  return (
    <div className={styles.PostsBar}>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

interface Props {
  category: string;
  posts: PostTypes[];
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export default PostsBar;
