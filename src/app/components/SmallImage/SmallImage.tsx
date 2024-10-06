import Image from "next/image";
import styles from "./SmallImage.module.sass";
import { CSSProperties, useState } from "react";
import Loader from "../Loader/Loader";

const SmallImage = ({ url, setIsImageExpanded }: Props) => {
  const [loading, setLoading] = useState(true);

  const loaderStyle: CSSProperties = {
    position: "relative",
    width: "4rem",
  };

  return (
    <div className={styles.image} onClick={() => setIsImageExpanded(true)}>
      {loading ? <Loader style={loaderStyle} /> : null}
      <Image
        src={url}
        alt="post image"
        fill={true}
        style={{ objectFit: "contain" }}
        quality={5}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

interface Props {
  url: string;
  setIsImageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default SmallImage;
