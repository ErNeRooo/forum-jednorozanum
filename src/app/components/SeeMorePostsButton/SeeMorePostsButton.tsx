import PostTypes from "@/app/types/PostTypes";
import styles from "./SeeMorePostsButton.module.sass";
import GetPosts from "@/app/utils/GetPosts";

const SeeMorePostsButton = ({
  postLimit,
  category,
  setPostLimit,
  setPosts,
}: Props) => {
  const handleClick = (): void => {
    setPostLimit(postLimit + 10);
    GetPosts(category, postLimit + 10).then((posts) => {
      const newPosts = posts.slice(postLimit, posts.length);
      setPosts((prev) => [...prev, ...newPosts]);
    });
  };

  return (
    <div className={styles.SeeMorePostsButton} onClick={handleClick}>
      <span>See More</span>
    </div>
  );
};

interface Props {
  postLimit: number;
  category: string;
  setPostLimit: React.Dispatch<React.SetStateAction<number>>;
  setPosts: React.Dispatch<React.SetStateAction<PostTypes[]>>;
}

export default SeeMorePostsButton;
