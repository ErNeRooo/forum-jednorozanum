"use client";
import { useEffect, useState } from "react";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import PostsBar from "../../components/PostsBar/PostsBar";
import PostSearchPanel from "../../components/PostSearchPanel/PostSearchPanel";
import styles from "./ExplorePage.module.sass";
import CreatePostButton from "@/app/components/CreatePostButton/CreatePostButton";
import FormForCreatingPosts from "@/app/components/FormForCreatingPosts/FormForCreatingPosts";
import PostTypes from "@/app/types/PostTypes";
import GetAccountByUid from "@/app/utils/GetAccountByUid";
import { app } from "@/app/firebaseConfig";
import { getAuth, User } from "firebase/auth";
import Account from "@/app/types/Account";
import CountPosts from "@/app/utils/CountPosts";
import PageLoading from "@/app/components/PageLoading/PageLoading";

const ExplorePage = () => {
  const user: User | null = getAuth(app).currentUser;
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [isCreatePostFormVisible, setIsCreatePostFormVisible] =
    useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [postsQuantityInCategory, setPostsQuantityInCategory] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      GetAccountByUid(user.uid).then((account) => {
        if (!account) return;
        setAccount(account);
      });
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      CountPosts(currentCategory).then((postsQuantity) => {
        setPostsQuantityInCategory(postsQuantity);
      });
    }
  }, [currentCategory, user]);

  if (isLoading) {
    return <PageLoading />;
  } else {
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
            account={account}
            setPostsQuantityInCategory={setPostsQuantityInCategory}
          />
        )}
        <section className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.currentCategory}>{currentCategory}</span>
            {`recent posts`}
          </h1>
          <CreatePostButton setIsFormVisible={setIsCreatePostFormVisible} />
        </section>
        <span>{`Found ${postsQuantityInCategory} ${
          postsQuantityInCategory === 1 ? "post" : "posts"
        } in ${currentCategory}`}</span>
        <PostsBar
          category={currentCategory}
          posts={posts}
          postsQuantityInCategory={postsQuantityInCategory}
          setPosts={setPosts}
          searchPhrase={searchPhrase}
          setPostsQuantityInCategory={setPostsQuantityInCategory}
          account={account}
        />
      </div>
    );
  }
};

export default ExplorePage;
