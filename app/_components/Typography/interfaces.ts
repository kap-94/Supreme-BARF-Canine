// import { GenericFunction } from "@/src/interfaces";
import { ReactNode } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p1"
  | "p2"
  | "p3"
  | "button"
  | "overline";

export type TypographyColor =
  | "inherit"
  | "initial"
  | "primary"
  | "secondaryElements"
  | "blue"
  | "normal"
  | "error"
  | "light"
  | "white"
  | "secondary";

export interface TypographyProps {
  /**
   * @initial "#2a2f53"
   * @blue "#3950EE"
   * @normal "#3A4069"
   * @inherit "inherit"
   * @secondaryElements "#747995"
   * @primary "#2a2f53"
   * @light "#d2d4e1"
   * @error "#FF0000"
   * @white "#fff"
   * @secondary "#65656a"
   */
  color?: TypographyColor;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  children: ReactNode;
  className?: string;
  fontWeight?: number;
  gutterBottom?: boolean;
  paragraph?: boolean;
  style?: React.CSSProperties;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  variant?: TypographyVariant;
  //   onClick?: GenericFunction;
}
