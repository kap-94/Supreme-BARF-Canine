import React from "react";
import classNames from "classnames/bind";

/**
 * Obtiene las clases CSS para un elemento del grid
 *
 * @param index Índice del elemento (0-based)
 * @param cx Función de classNames.bind
 * @returns String con las clases CSS
 */
export const getItemClassName = (
  index: number,
  cx: ReturnType<typeof classNames.bind>
): string => {
  const result = cx(
    "creative-grid__item",
    `creative-grid__item--${index + 1}`,
    {
      "creative-grid__item--featured": index === 0,
      "creative-grid__item--secondary": index === 1,
      "creative-grid__item--tertiary": index === 2,
    }
  );

  // Asegurar que el resultado es interpretado como string
  return result as string;
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
  cx: ReturnType<typeof classNames.bind>,
  className: string = ""
): string => {
  // Aseguramos que classNames devuelva siempre un string
  const result = cx(
    "creative-grid",
    `creative-grid--${variant}`,
    `creative-grid--count-${childCount}`,
    className
  );

  // TypeScript puede inferir 'unknown' en algunos casos, así que forzamos el tipo string
  return result as string;
};

/**
 * Limita el número de elementos hijo a un máximo
 *
 * @param children Elementos hijo
 * @param maxElements Número máximo de elementos a mostrar
 * @returns Array con los elementos limitados
 */
export const limitChildElements = (
  children: React.ReactNode,
  maxElements: number
): React.ReactNode[] => {
  // Usamos una aserción de tipo para asegurar que el resultado sea un array de ReactNode
  return React.Children.toArray(children).slice(
    0,
    maxElements
  ) as React.ReactNode[];
};
