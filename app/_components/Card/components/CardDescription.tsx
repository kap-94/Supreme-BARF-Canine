import React, { useContext } from "react";
import { TypographyProps } from "../../Typography/interfaces";
import { CardContext } from "./Card";
import Typography, { colorMapping } from "../../Typography";

export interface CardDescriptionProps
  extends Omit<TypographyProps, "children"> {
  description?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  description,
  align = "inherit",
  className = "",
  color = "initial",
  gutterBottom = false,
  paragraph = false,
  style,
  fontWeight = 500,
  textTransform = "none",
  variant = "p2",
}) => {
  const { data } = useContext(CardContext);

  const customStyle: React.CSSProperties = {
    color: colorMapping[color || "initial"],
    display: paragraph ? "block" : undefined,
    marginBottom: gutterBottom ? "0.35em" : undefined,
    textAlign: align,
    textTransform,
    fontWeight,
    ...style,
  };

  return (
    <Typography variant={variant} className={className} style={customStyle}>
      {description ? description : data.description}
    </Typography>
  );
};
