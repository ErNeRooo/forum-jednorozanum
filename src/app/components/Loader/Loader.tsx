import Image from "next/image";
import styles from "./Loader.module.sass";
import hisraLogo from "../../../../public/hisraLogo.png";
import { CSSProperties } from "react";

const Loader = ({ style }: Props) => {
  return (
    <Image
      src={hisraLogo}
      className={styles.Loader}
      alt="Loading..."
      style={style}
    />
  );
};

interface Props {
  style?: CSSProperties;
}

export default Loader;
