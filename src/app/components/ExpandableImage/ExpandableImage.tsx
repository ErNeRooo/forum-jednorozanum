import Image from "next/image";
import styles from "./ExpandableImage.module.sass";
import { useState } from "react";
import FullImage from "../FullImage/FullImage";
import Loader from "../Loader/Loader";
import SmallImage from "../SmallImage/SmallImage";

const ExpandableImage = ({ imageUrl }: Props) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  return (
    <>
      <SmallImage url={imageUrl} setIsImageExpanded={setIsImageExpanded} />
      {isImageExpanded && (
        <FullImage url={imageUrl} setIsImageExpanded={setIsImageExpanded} />
      )}
    </>
  );
};

interface Props {
  imageUrl: string;
}

export default ExpandableImage;
