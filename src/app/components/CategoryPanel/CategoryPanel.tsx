import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import styles from "./CategoryPanel.module.sass";
import GetAccountCategories from "@/app/utils/GetAccountCategories";

const CategoryPanel = ({ currentCategory, setCurrentCategory }: Props) => {
  const user = getAuth().currentUser as User;
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    GetAccountCategories(user.uid).then((Categories) => {
      setCategories(Categories);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.CategoryPanel}>
      {categories.map((category, index) => (
        <div
          key={category}
          className={
            styles.category + currentCategory === category ? styles.active : ""
          }
          onClick={() => setCurrentCategory(category)}
        >
          {index !== categories.length - 1 ? category + " / " : category}
        </div>
      ))}
    </div>
  );
};

interface Props {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default CategoryPanel;
