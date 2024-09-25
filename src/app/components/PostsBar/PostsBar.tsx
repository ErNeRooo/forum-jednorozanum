import PostTypes from "@/app/types/PostTypes";
import styles from "./PostsBar.module.sass";
import Post from "./Post/Post";
import { useEffect, useState } from "react";
import GetPosts from "@/app/utils/GetPosts";

const PostsBar = ({ category }: Props) => {
  const [posts, setPosts] = useState<PostTypes[]>([]);

  useEffect(() => {
    GetPosts(category).then((posts) => setPosts(posts));
  }, [category]);

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
}

export default PostsBar;
