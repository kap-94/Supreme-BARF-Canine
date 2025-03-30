import React from "react";
import classNames from "classnames/bind";

/**
 * Obtiene las clases CSS para un elemento del grid
 *
 * @param index Índice del elemento (0-based)
 * @param cx Función de classNames.bind
 * @returns String con las clases CSS
 */
export const getItemClassName = (index: number, cx: ClassNamesFn): string => {
  return cx("creative-grid__item", `creative-grid__item--${index + 1}`, {
    "creative-grid__item--featured": index === 0,
    "creative-grid__item--secondary": index === 1,
    "creative-grid__item--tertiary": index === 2,
  });
};

/**
 * Genera el nombre de clase del contenedor principal basado en variante y cantidad
 *
 * @param variant Nombre de la variante
 * @param childCount Número de elementos hijo
 * @param cx Función de classNames.bind
 * @param className Clases adicionales opcionales
 * @returns String con las clases CSS
 */
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

type ClassNamesFn = (...args: any[]) => string;
