import { CSSProperties } from "react";
import styles from "./PageLoading.module.sass";
import Loader from "../Loader/Loader";

const PageLoading = () => {
  const loaderStyle: CSSProperties = {
    width: "10rem",
  };
  return (
    <div className={styles.PageLoading}>
      <Loader style={loaderStyle} />
      <span className={styles.loadingTitle}>
        Hexagons Industries and Scientific Research Agency
      </span>
    </div>
  );
};

export default PageLoading;
