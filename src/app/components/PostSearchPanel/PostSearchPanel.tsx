import { useState } from "react";
import styles from "./PostSearchPanel.module.sass";

const PostSearchPanel = ({ searchPhrase, setSearchPhrase }: Props) => {
  return (
    <div className={styles.PostSearchPanel}>
      <input
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
        type="text"
        placeholder="type here to search by title..."
      />
    </div>
  );
};

interface Props {
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
}

export default PostSearchPanel;
