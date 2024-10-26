// Spinner.tsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

// Definimos las variantes disponibles
type SpinnerVariant = "button" | "inline" | "page";

// Interface para las props del Spinner
interface SpinnerProps {
  variant?: SpinnerVariant;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ variant = "inline", className }) => {
  const spinnerClasses = cx("spinner", `spinner--${variant}`, className);

  return <div className={spinnerClasses} aria-label="Cargando"></div>;
};

export default Spinner;
