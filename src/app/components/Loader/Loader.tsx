import Image from "next/image";
import styles from "./Loader.module.sass";
import hisraLogo from "../../../../public/hisraLogo.png";

const Loader = () => {
  return (
    <Image
      src={hisraLogo}
      placeholder="blur"
      className={styles.Loader}
      alt="Loading..."
    />
  );
};

export default Loader;
