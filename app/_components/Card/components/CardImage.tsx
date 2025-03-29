import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { CardContext } from "./Card";
import styles from "../Card.module.scss";
import Typography from "../../Typography";

const cx = classNames.bind(styles);

export interface CardImageProps {
  image?: { src: string; alt: string };
  className?: string;
  width: number;
  height: number;
  title?: string;
  subtitle?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
  image,
  className,
  width,
  height,
  title,
  subtitle,
}) => {
  const { data } = useContext(CardContext);

  let imageToShow: { src: string; alt: string };
  const defaultImage = {
    src: "/man-in-the-sky.png",
    alt: "No Image",
  };

  if (image) {
    imageToShow = image;
  } else if (data.image) {
    imageToShow = data.image;
  } else {
    imageToShow = defaultImage;
  }

  return (
    <div className={`${cx("card__image-container")} ${className}`}>
      <Image
        src={imageToShow.src}
        alt={imageToShow.alt}
        className={cx("card__image")}
        width={width}
        height={height}
      />
      {title && subtitle && (
        <div className={cx("card__image-overlay")}>
          <Typography variant="p3" color="white">
            {title}
          </Typography>
          <Typography variant="p1" color="white">
            {subtitle}
          </Typography>
        </div>
      )}
    </div>
  );
};
