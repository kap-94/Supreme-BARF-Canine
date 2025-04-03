import classNames from "classnames/bind";
import { ClassNamesFn } from "../types";

export const getItemClassName = (index: number, cx: ClassNamesFn): string => {
  return cx("creative-grid__item", `creative-grid__item--${index + 1}`, {
    "creative-grid__item--featured": index === 0,
    "creative-grid__item--secondary": index === 1,
    "creative-grid__item--tertiary": index === 2,
  });
};

export const getGridClassName = (
  variant: string,
  childCount: number,
  cx: ClassNamesFn,
  className: string = ""
): string => {
  return cx(
    "creative-grid",
    `creative-grid--${variant}`,
    `creative-grid--count-${childCount}`,
    className
  );
};
