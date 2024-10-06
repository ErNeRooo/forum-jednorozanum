import Image from "next/image";
import styles from "./FullImage.module.sass";
import Loader from "../Loader/Loader";
import { CSSProperties, useState } from "react";

const FullImage = ({ url, setIsImageExpanded }: Props) => {
  const [loading, setLoading] = useState(true);

  const loaderStyle: CSSProperties = {
    width: "8rem",
    top: "calc( 50% - 4rem )",
    left: "calc( 50% - 4rem )",
  };

  return (
    <div className={styles.FullImage} onClick={() => setIsImageExpanded(false)}>
      {loading ? <Loader style={loaderStyle} /> : null}
      <Image
        src={url}
        alt="full image"
        fill={true}
        style={{ objectFit: "contain" }}
        quality={100}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

interface Props {
  url: string;
  setIsImageExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default FullImage;
