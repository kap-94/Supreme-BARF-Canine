"use client";

import React, { ReactNode, useRef, useEffect, useState } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Preparar los elementos hijos como un array y limitar al número máximo
  const childrenArray = React.Children.toArray(children).slice(0, maxImages);
  const childCount = childrenArray.length;

  // Hooks para refs y animaciones
  const { imageRefs, setItemRef } = useImageRefs(childCount);
  useGridAnimation(
    gridRef,
    imageRefs,
    variant,
    animate,
    childCount,
    setIsReady
  );

  // Obtener la configuración de la variante
  const variantConfig = getVariantConfig(variant);

  // Clase CSS para el contenedor
  const gridClassName = variantConfig.getContainerClass(
    childCount,
    cx,
    className
  );

  // Efecto para limpiar estilos al desmontar
  useEffect(() => {
    return () => {
      if (gridRef.current) {
        gridRef.current.setAttribute("data-ready", "false");
      }
    };
  }, [variant]);

  return (
    <div
      className={gridClassName}
      ref={gridRef}
      data-ready={isReady ? "true" : "false"}
      data-variant={variant}
      style={{
        opacity: isReady ? 1 : 0,
        visibility: isReady ? "visible" : "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
      }}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={getItemClassName(index, cx)}
          ref={setItemRef(index)}
          style={{ opacity: isReady ? 1 : 0 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default CreativeImageGrid;
