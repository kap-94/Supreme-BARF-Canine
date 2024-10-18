import React from "react";
import classNames from "classnames/bind";
import { Raleway, Poppins } from "next/font/google";
import {
  TypographyColor,
  TypographyProps,
  TypographyVariant,
} from "./interfaces";
import styles from "./Typography.module.scss";

const cx = classNames.bind(styles);

// Definir las fuentes usando next/font/google
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Mapeo de colores
export const colorMapping: { [key in TypographyColor]: string } = {
  inherit: "inherit",
  initial: "#3A4069", // ui-normal
  primary: "#2a2f53",
  normal: "#222222", // ui-normal
  secondaryElements: "#747995", // ui-secondary-elements
  blue: "#3950EE", // primary
  white: "#fdfdff",
  light: "#d2d4e1",
  error: "#FF0000",
  secondary: "#65656A",
};

// Mapeo de componentes según el variant
export const Typography: React.FC<
  TypographyProps & { fontFamily?: "raleway" | "poppins" }
> = ({
  align = "inherit",
  children,
  className = "",
  color,
  fontWeight,
  gutterBottom = false,
  paragraph = false,
  style,
  textTransform = "none",
  variant = "p1",
  fontFamily, // Nuevo prop para seleccionar la familia de fuente
}) => {
  const componentMapping: {
    [key in TypographyVariant]: keyof JSX.IntrinsicElements;
  } = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    p1: "p",
    p2: "p",
    p3: "p",
    button: "span",
    overline: "span",
  };

  // Mapeo de fuentes según el variant
  const fontMapping: { [key in TypographyVariant]: string } = {
    h1: raleway.className,
    h2: raleway.className,
    h3: poppins.className,
    h4: poppins.className,
    h5: raleway.className,
    p1: raleway.className,
    p2: raleway.className,
    p3: raleway.className,
    button: raleway.className,
    overline: raleway.className,
  };

  // Selecciona la fuente basada en el prop `fontFamily` o en el mapeo por defecto
  const selectedFontFamily = fontFamily
    ? fontFamily === "raleway"
      ? raleway.className
      : poppins.className
    : fontMapping[variant];

  const Component = componentMapping[variant];

  const componentClasses = cx(
    "typography",
    `typography--${variant}`,
    className,
    selectedFontFamily // Aplica la clase de la fuente seleccionada
  );

  const customStyle: React.CSSProperties = {
    color: color ? colorMapping[color] : undefined,
    display: paragraph ? "block" : undefined,
    marginBottom: gutterBottom ? "0.35em" : undefined,
    textAlign: align,
    textTransform,
    fontWeight,
    ...style,
  };

  return (
    <Component className={componentClasses} style={customStyle}>
      {children}
    </Component>
  );
};

export default Typography;
