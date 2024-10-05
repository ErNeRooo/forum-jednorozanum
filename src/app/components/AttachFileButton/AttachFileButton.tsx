import { BaseSyntheticEvent, CSSProperties, useState } from "react";
import styles from "./AttachFileButton.module.sass";
import Image from "next/image";
import icon from "../../../../public/attachmentIcon.svg";

const AttachFileButton = ({ setSelectedFile }: Props) => {
  const [attachmentIconFilter, setAttachmentIconFilter] = useState<string>(
    "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
  );

  const iconStyle: CSSProperties = {
    filter: attachmentIconFilter,
  };

  const handleFileOnChange = (e: BaseSyntheticEvent): void => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <label
        htmlFor="file-input"
        className={styles.button}
        onMouseOver={() => setAttachmentIconFilter("brightness(0%)")}
        onMouseLeave={() =>
          setAttachmentIconFilter(
            "invert(47%) sepia(67%) saturate(566%) hue-rotate(73deg) brightness(97%) contrast(83%)"
          )
        }
      >
        <Image src={icon} alt="attach" style={iconStyle} />
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileOnChange}
      />
    </div>
  );
};

interface Props {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default AttachFileButton;
