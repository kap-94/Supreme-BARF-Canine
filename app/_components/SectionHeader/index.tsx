import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components";
import styles from "./SectionHeader.module.scss";

const cx = classNames.bind(styles);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  color?: "white" | "black";
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, subtitle, align = "center", className, color = "black" }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("section-header", className, `section-header--${align}`)}
      >
        <Typography
          variant="h2"
          className={cx("section-header__title")}
          color={color}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="p1"
            className={cx("section-header__subtitle")}
            color={color}
          >
            {subtitle}
          </Typography>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
