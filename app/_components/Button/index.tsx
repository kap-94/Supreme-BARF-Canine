import React, { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import Icon, { IconName } from "@/app/_components/CustomIcon";
import { Typography } from "@/app/_components";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  fullWidth?: boolean;
  href?: string;
  icon?: IconName;
  onClick?: any;
  pill?: boolean;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent" | "link-light" | "link-dark";
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    size = "medium",
    type = "button",
    variant = "primary",
    children,
    className = "",
    disabled = false,
    fullWidth = false,
    icon,
    onClick,
    pill = false,
    style,
    elevation = 0,
    href,
  }) => {
    const buttonClasses = cx(
      "button",
      `button--${size}`,
      `button--${variant}`,
      `button--elevation-${elevation}`,
      {
        "button--full-width": fullWidth,
        "button--pill": pill,
      },
      className
    );

    // Return a Link for "link-light" or "link-dark" variants
    if ((variant === "link-light" || variant === "link-dark") && href) {
      return (
        <Link href={href} className={buttonClasses} style={style}>
          <Typography
            variant="p1"
            fontFamily="raleway"
            fontWeight={800}
            className={cx("button__text")}
          >
            {children}
          </Typography>
          {icon && (
            <Icon
              icon={icon}
              height={32}
              width={32}
              className={cx("button__icon")}
            />
          )}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={buttonClasses}
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && <Icon icon={icon} className={cx("button__icon")} />}
        <Typography
          variant="p1"
          fontFamily="poppins"
          fontWeight={700}
          className={cx("button__text")}
        >
          {children}
        </Typography>
      </button>
    );
  }
);

export default Button;
