"use client";
import { useState } from "react";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import PostsBar from "../../components/PostsBar/PostsBar";
import PostSearchPanel from "../../components/PostSearchPanel/PostSearchPanel";
import styles from "./ExplorePage.module.sass";
import CreatePostButton from "@/app/components/CreatePostButton/CreatePostButton";
import FormForCreatingPosts from "@/app/components/FormForCreatingPosts/FormForCreatingPosts";
import PostTypes from "@/app/types/PostTypes";

const ExplorePage = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("Home");
  const [isCreatePostFormVisible, setIsCreatePostFormVisible] =
    useState<boolean>(false);

  return (
    <div className={styles.ExplorePage}>
      <CategoryPanel
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <PostSearchPanel
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      {isCreatePostFormVisible && (
        <FormForCreatingPosts
          setIsFormVisible={setIsCreatePostFormVisible}
          currentCategory={currentCategory}
          setPosts={setPosts}
        />
      )}
      <section className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.currentCategory}>{currentCategory}</span>
          {` recent posts`}
        </h1>
        <CreatePostButton setIsFormVisible={setIsCreatePostFormVisible} />
      </section>
      <PostsBar
        category={currentCategory}
        posts={posts}
        setPosts={setPosts}
        searchPhrase={searchPhrase}
      />
    </div>
  );
};

export default ExplorePage;
