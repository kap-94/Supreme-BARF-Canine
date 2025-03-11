"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./CustomIcon.module.scss";

const cx = classNames.bind(styles);

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  color?: "gray" | "white" | "black" | "primary" | "secondary" | "error";
  icon: IconName;
  height?: number;
  width?: number;
  fill?: boolean;
}

export type IconName =
  | "addImage"
  | "airConditioner"
  | "beach"
  | "beverages"
  | "boat"
  | "book"
  | "briefcase"
  | "calendar"
  | "calendarCheck"
  | "change"
  | "changeImage"
  | "check"
  | "check-large"
  | "clock"
  | "close"
  | "cocktail"
  | "computer"
  | "customers"
  | "deleteImage"
  | "download"
  | "drag"
  | "dropDown"
  | "dropper"
  | "edit"
  | "email"
  | "eye"
  | "eyeOff"
  | "facebook"
  | "facebook-icon"
  | "filter"
  | "gaming"
  | "gps"
  | "home"
  | "instagram"
  | "instagram-icon"
  | "left"
  | "moreVert"
  | "mountain"
  | "museum"
  | "music"
  | "right-arrow"
  | "parking"
  | "phone"
  | "plus"
  | "left-arrow"
  | "preview"
  | "question"
  | "reading"
  | "restaurant"
  | "restroom"
  | "rollercoaster"
  | "search"
  | "security"
  | "selfie"
  | "send"
  | "services"
  | "shopping-cart"
  | "snacks"
  | "spa"
  | "store"
  | "surf"
  | "tiktok"
  | "trash"
  | "tree"
  | "tv"
  | "twitter"
  | "user"
  | "venue"
  | "visa"
  | "whatsapp"
  | "wifi"
  | "youtube-icon"
  | "youtube";

export const Icon: FC<IconProps> = (props) => {
  const {
    className = "",
    style,
    icon,
    color = "gray",
    height = 16,
    width = 16,
    fill = false,
  } = props;
  const [importedIcon, setImportedIcon] = useState<string | null>(null);

  useEffect(() => {
    const getIconPath = async () => {
      try {
        const module = await import(`./icons/${icon}.svg`);
        setImportedIcon(module.default);
      } catch (error) {
        console.error(`Failed to load icon: ${icon}`);
      }
    };

    getIconPath();
  }, [icon]);

  if (!importedIcon) {
    return null;
  }

  const iconImageClass = cx("icon__image", {
    "icon__image--primary": color === "primary",
    "icon__image--secondary": color === "secondary",
    "icon__image--white": color === "white",
    "icon__image--black": color === "black",
    "icon__image--error": color === "error",
    "icon__image--fill": fill,
  });

  return (
    <i className={cx("icon", className)} style={style}>
      <Image
        src={importedIcon}
        className={iconImageClass}
        alt={`${icon}-icon`}
        height={height}
        width={width}
      />
    </i>
  );
};

export default Icon;
