"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./ImageGrid.module.scss";

const cx = classNames.bind(styles);

export type ImageGridVariant =
  | "masonry" // Opción 1: Diseño simétrico con efecto masonry
  | "diagonal" // Opción 2: Diseño creativo con diagonal
  | "stepped" // Opción 3: Diseño simétrico con tres columnas escalonadas
  | "cinematic" // Opción 4: Diseño cinematográfico panorámico
  | "filmstrip" // Opción 5: Diseño de cinta de película
  | "overlapping" // Diseño con superposición
  | "rotated" // Diseño con rotaciones sutiles
  | "asymmetric" // Grid asimétrico con diferentes alturas
  | "staggered" // Diseño escalonado vertical
  | "geometric" // Diseño geométrico con formas distintas
  | "dynamic-spacing"; // Espaciado dinámico y ángulos

type ImageGridProps = {
  children: ReactNode;
  variant: ImageGridVariant;
  className?: string;
  animate?: boolean;
};

const ImageGrid: React.FC<ImageGridProps> = ({
  children,
  variant = "masonry",
  className = "",
  animate = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const tertiaryRef = useRef<HTMLDivElement>(null);

  // Set up animation effects
  useEffect(() => {
    if (!animate || !gridRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Set initial states for the grid
      gsap.set(gridRef.current, {
        opacity: 0,
        y: 20,
      });

      // Referencias a los elementos contenedores
      const containers = [
        primaryRef.current,
        secondaryRef.current,
        tertiaryRef.current,
      ].filter(Boolean);

      // Configuraciones de animación basadas en variantes
      if (variant === "rotated" || variant === "dynamic-spacing") {
        // Para variantes con rotaciones, añadimos rotaciones iniciales
        if (primaryRef.current) {
          gsap.set(primaryRef.current, {
            opacity: 0,
            y: 40,
            rotation: -1,
            transformOrigin: "center center",
          });
        }

        if (secondaryRef.current) {
          gsap.set(secondaryRef.current, {
            opacity: 0,
            y: -25,
            rotation: 1,
            transformOrigin: "center center",
          });
        }

        if (tertiaryRef.current) {
          gsap.set(tertiaryRef.current, {
            opacity: 0,
            y: 30,
            rotation: -0.5,
            transformOrigin: "center center",
          });
        }
      } else if (variant === "geometric") {
        containers.forEach((container, index) => {
          if (container) {
            gsap.set(container, {
              opacity: 0,
              y: 20 + index * 5,
              scale: 0.98,
              // Sin rotación para esta variante
            });
          }
        });
      } else if (variant === "overlapping") {
        // Para variantes con superposición, añadimos desplazamientos específicos
        containers.forEach((container, index) => {
          if (container) {
            gsap.set(container, {
              opacity: 0,
              y: index === 0 ? 30 : index === 1 ? -30 : 20,
              x: index === 0 ? -20 : index === 1 ? 0 : 15,
            });
          }
        });
      } else if (variant === "asymmetric" || variant === "stepped") {
        // Para variantes escalonadas o asimétricas
        containers.forEach((container, index) => {
          if (container) {
            gsap.set(container, {
              opacity: 0,
              y: index === 0 ? 0 : index === 1 ? -30 : 30,
            });
          }
        });
      } else {
        // Configuración predeterminada para otras variantes
        containers.forEach((container, index) => {
          if (container) {
            gsap.set(container, {
              opacity: 0,
              y: 20 + index * 5,
              scale: 0.98,
            });
          }
        });
      }

      // Create scroll trigger
      const scrollTrigger = {
        trigger: gridRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      };

      // Main timeline for grid
      const mainTimeline = gsap.timeline({ scrollTrigger });

      mainTimeline.to(
        gridRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );

      // Staggered animation for containers
      containers.forEach((container, index) => {
        if (container) {
          // Determinar la rotación final según la variante y el contenedor
          let finalRotation = 0;

          if (variant === "rotated" || variant === "dynamic-spacing") {
            finalRotation =
              container === primaryRef.current
                ? -1
                : container === secondaryRef.current
                ? 1
                : -0.5;
          }

          mainTimeline.to(
            container,
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              rotation: finalRotation,
              duration: 0.8,
              ease: "power2.out",
            },
            0.2 + index * 0.2
          );
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, [animate, variant]);

  // Create class based on variant
  const gridClassName = cx("image-grid", `image-grid--${variant}`, className);

  // Obtener los elementos hijos como un array
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={gridClassName} ref={gridRef}>
      {/* Contenedor primario (anteriormente "main") */}
      {childrenArray[0] && (
        <div className={cx("image-grid__primary")} ref={primaryRef}>
          {childrenArray[0]}
        </div>
      )}

      {/* Contenedor secundario (anteriormente "tall") */}
      {childrenArray[1] && (
        <div className={cx("image-grid__secondary")} ref={secondaryRef}>
          {childrenArray[1]}
        </div>
      )}

      {/* Contenedor terciario (anteriormente "small") */}
      {childrenArray[2] && (
        <div className={cx("image-grid__tertiary")} ref={tertiaryRef}>
          {childrenArray[2]}
        </div>
      )}

      {/* Contenedores adicionales si hay más de 3 elementos */}
      {childrenArray.slice(3).map((child, index) => (
        <div key={index} className={cx("image-grid__additional")}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
