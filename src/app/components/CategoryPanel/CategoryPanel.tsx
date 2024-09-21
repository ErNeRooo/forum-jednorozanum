import styles from "./CategoryPanel.module.sass";

const CategoryPanel = ({ currentCategory, setCurrentCategory }: Props) => {
  const mockCategories = [
    "Home",
    "Games",
    "Music",
    "Video",
    "Pictures",
    "Anime",
    "Manga",
    "Books",
    "Movies",
    "Software",
    "Cars",

    "Other",
  ];

  return (
    <div className={styles.CategoryPanel}>
      {mockCategories.map((category, index) => (
        <div
          key={category}
          className={
            styles.category + currentCategory === category ? styles.active : ""
          }
          onClick={() => setCurrentCategory(category)}
        >
          {index !== mockCategories.length - 1 ? category + " / " : category}
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
