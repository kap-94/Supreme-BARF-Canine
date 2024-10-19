import React, { forwardRef } from "react";
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

// Usamos forwardRef para permitir la referencia
const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, subtitle, align = "center", className }, ref) => {
    return (
      <div
        ref={ref} // Pasar el ref al div contenedor
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
  }
);

// Agrega un displayName para que el nombre del componente sea visible en herramientas de depuración
SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
