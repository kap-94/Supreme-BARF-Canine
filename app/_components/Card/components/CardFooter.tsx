import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "../Card.module.scss";

const cx = classNames.bind(styles);

export interface CardFooterProps {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={`${cx("card__footer")} ${className}`} style={style}>
      {children}
    </div>
  );
};
