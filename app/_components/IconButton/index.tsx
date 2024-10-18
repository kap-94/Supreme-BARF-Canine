import React, { FC, MouseEvent } from "react";
import classNames from "classnames/bind";

import Icon, { IconName } from "../CustomIcon";
import styles from "./IconButton.module.scss";

const cx = classNames.bind(styles);

interface Props {
  icon: IconName;
  variant?: "primary" | "secondary";
  color?: "white" | "gray" | "error";
  /** large = 40px, medium = 30px */
  size?: "large" | "medium";
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

export const IconButton: FC<Props> = ({
  icon,
  color = "white",
  size = "large",
  onClick,
  className = "",
  variant = "primary",
}) => {
  if (!icon) return null;

  const buttonClasses = cx(
    "button",
    {
      "button--large": size === "large",
      "button--medium": size === "medium",
      "button--primary": variant === "primary",
      "button--secondary": variant === "secondary",
    },
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      <Icon color={color} height={39} icon={icon as IconName} />
    </button>
  );
};

export default IconButton;
