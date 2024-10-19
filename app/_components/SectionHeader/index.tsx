import React from "react";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components"; // Asegúrate de tener este componente tipográfico
import styles from "./SectionHeader.module.scss";

const cx = classNames.bind(styles);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right"; // Controlar la alineación
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "center", // Por defecto alinea en el centro
  className,
}) => {
  return (
    <div
      className={cx("section-header", className, `section-header--${align}`)}
    >
      <Typography variant="h3" className={cx("section-header__title")}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="p1" className={cx("section-header__subtitle")}>
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeader;
