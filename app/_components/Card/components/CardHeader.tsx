import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "../Card.module.scss";

const cx = classNames.bind(styles);

export interface CardHeaderProps {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={`${cx("card__header")} ${className}`} style={style}>
      {children}
    </div>
  );
};
