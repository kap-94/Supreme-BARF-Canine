import React, { ReactElement, createContext } from "react";
import { CardDataContextProps, CardData } from "../interfaces";
import classNames from "classnames/bind";
import styles from "../Card.module.scss";

export interface CardProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  data: CardData;
  style?: React.CSSProperties;
}

const cx = classNames.bind(styles);

export const CardContext = createContext({} as CardDataContextProps);
const { Provider } = CardContext;

export const Card: React.FC<CardProps> = ({
  children,
  className,
  data,
  style,
}: CardProps) => {
  return (
    <div className={`${cx("card")} ${className}`} style={style}>
      <Provider value={{ data }}>{children}</Provider>
    </div>
  );
};

export default Card;
