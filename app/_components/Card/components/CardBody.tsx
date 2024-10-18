import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "../Card.module.scss";

const cx = classNames.bind(styles);

export interface CardBodyProps {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={`${cx("card__body")} ${className}`} style={style}>
      {children}
    </div>
  );
};
