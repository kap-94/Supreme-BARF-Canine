import React, { useContext } from "react";
import { CardContext } from "./Card";
import Typography, { colorMapping } from "../../Typography";
import { TypographyProps } from "../../Typography/interfaces";

export interface CardTitleProps extends Omit<TypographyProps, "children"> {
  title?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  title,
  align = "inherit",
  className = "",
  color,
  fontWeight = 700,
  gutterBottom = false,
  paragraph = false,
  style,
  textTransform = "none",
  variant = "p1",
}) => {
  const { data } = useContext(CardContext);

  const customStyle: React.CSSProperties = {
    color: colorMapping[color || "normal"],
    display: paragraph ? "block" : undefined,
    marginBottom: gutterBottom ? "0.35em" : undefined,
    textAlign: align,
    textTransform,
    fontWeight,
    ...style,
  };

  return (
    <Typography variant={variant} className={className} style={customStyle}>
      {title ? title : data.title}
    </Typography>
  );
};
