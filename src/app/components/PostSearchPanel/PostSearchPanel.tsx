import styles from "./PostSearchPanel.module.sass";

const PostSearchPanel = () => {
  return (
    <div className={styles.PostSearchPanel}>
      <input type="text" placeholder="type here to search by title..." />
    </div>
  );
};

export default PostSearchPanel;
