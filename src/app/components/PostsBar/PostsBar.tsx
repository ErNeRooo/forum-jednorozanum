import PostTypes from "@/app/types/PostTypes";
import styles from "./PostsBar.module.sass";
import Post from "./Post/Post";
import { useEffect, useState } from "react";
import GetPosts from "@/app/utils/GetPosts";

const PostsBar = ({ category, posts, setPosts, searchPhrase }: Props) => {
  useEffect(() => {
    GetPosts(category).then((posts) => setPosts(posts));
  }, [category, setPosts]);

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
