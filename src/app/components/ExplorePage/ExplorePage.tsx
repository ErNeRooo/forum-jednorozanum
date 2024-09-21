import { useState } from "react";
import CategoryPanel from "../CategoryPanel/CategoryPanel";
import PostsBar from "../PostsBar/PostsBar";
import PostSearchPanel from "../PostSearchPanel/PostSearchPanel";
import styles from "./ExplorePage.module.sass";

const ExplorePage = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("Home");

  return (
    <div className={styles.ExplorePage}>
      <CategoryPanel
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <PostSearchPanel />
      <h1>
        <span>{currentCategory}</span>
        {` recent posts`}
      </h1>
      <PostsBar />
    </div>
  );
};

export default ExplorePage;
