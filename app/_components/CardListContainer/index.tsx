import React from "react";
import classNames from "classnames/bind";
import styles from "./CardListContainer.module.scss";

const cx = classNames.bind(styles);

interface CardListContainerProps {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  itemIndicator?: "none" | "number" | "circle"; // Opción para elegir entre nada, número o círculo
  hideLine?: boolean; // Opción para ocultar la línea vertical
}

const CardListContainer: React.FC<CardListContainerProps> = ({
  children,
  orientation = "vertical",
  itemIndicator = "none", // Valor predeterminado: nada
  hideLine = false,
}) => {
  return (
    <div
      className={cx(
        "card-list-container",
        `card-list-container--${orientation}`
      )}
    >
      {!hideLine && <div className={cx("card-list-container__line")} />}{" "}
      {/* Línea entre los elementos */}
      {React.Children.map(children, (child, index) => (
        <div
          className={cx("card-list-container__item", {
            "card-list-container__item--numbered": itemIndicator === "number",
            "card-list-container__item--circled": itemIndicator === "circle",
          })}
        >
          {itemIndicator === "number" && (
            <div className={cx("card-list-container__number-top")}>
              {index + 1}
            </div>
          )}
          {itemIndicator === "circle" && (
            <div className={cx("card-list-container__circle")} />
          )}

          {/* El contenido de cada item */}
          <div className={cx("card-list-container__content")}>{child}</div>
        </div>
      ))}
    </div>
  );
};

export default CardListContainer;
