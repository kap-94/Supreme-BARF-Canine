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
  | "secondary"
  | "accent"
  | "white"
  | "black"
  | "success"
  | "warning"
  | "error";

export interface TypographyProps {
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
  //   onClick?: () => {});
}
