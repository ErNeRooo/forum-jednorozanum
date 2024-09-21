import { useState } from "react";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import PostsBar from "../../components/PostsBar/PostsBar";
import PostSearchPanel from "../../components/PostSearchPanel/PostSearchPanel";
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
