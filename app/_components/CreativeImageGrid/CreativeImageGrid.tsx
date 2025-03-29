"use client";

import React, { ReactNode, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./styles/CreativeImageGrid.module.scss";
import { CreativeImageGridProps } from "./types";
import { DEFAULT_MAX_IMAGES, DEFAULT_VARIANT } from "./constants";
import { useImageRefs } from "./hooks/useImageRefs";
import { useGridAnimation } from "./hooks/useGridAnimation";
import { getItemClassName } from "./utils/grid";
import { getVariantConfig } from "./variants";

const cx = classNames.bind(styles);

/**
 * CreativeImageGrid - Componente para mostrar imágenes en diferentes layouts creativos
 */
const CreativeImageGrid: React.FC<CreativeImageGridProps> = ({
  children,
  variant = DEFAULT_VARIANT,
  className = "",
  animate = true,
  maxImages = DEFAULT_MAX_IMAGES,
}) => {
  // Referencia al contenedor principal
  const gridRef = useRef<HTMLDivElement>(null);

  // Preparar los elementos hijos como un array y limitar al número máximo
  const childrenArray = React.Children.toArray(children).slice(0, maxImages);
  const childCount = childrenArray.length;

  // Hooks para refs y animaciones
  const { imageRefs, setItemRef } = useImageRefs(childCount);
  useGridAnimation(gridRef, imageRefs, variant, animate, childCount);

  // Obtener la configuración de la variante
  const variantConfig = getVariantConfig(variant);

  // Clase CSS para el contenedor
  const gridClassName = variantConfig.getContainerClass(
    childCount,
    cx,
    className
  );

  return (
    <div
      className={gridClassName}
      ref={gridRef}
      data-ready="false" // <-- Importante: oculta en SSR
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={getItemClassName(index, cx)}
          ref={setItemRef(index)}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default CreativeImageGrid;
