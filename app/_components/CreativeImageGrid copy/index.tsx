"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./CreativeImageGrid.module.scss";

const cx = classNames.bind(styles);

export type CreativeGridVariant =
  | "cascade"
  | "mosaic"
  | "pavilion"
  | "orbit"
  | "gallery"
  | "showcase"
  | "perspective"
  | "cinematic"
  | "parallax"
  | "editorial"
  | "immersive"
  | "portrait"
  | "floating"
  | "staggered"
  | "scattered"
  | "geometric"
  | "dynamic"
  | "modular"
  | "mondrian"
  | "blueprint"
  | "tetris";

type CreativeImageGridProps = {
  children: ReactNode;
  variant: CreativeGridVariant;
  className?: string;
  animate?: boolean;
  maxImages?: number; // Número máximo de imágenes a mostrar (opcional)
};

const CreativeImageGrid: React.FC<CreativeImageGridProps> = ({
  children,
  variant = "cascade",
  className = "",
  animate = true,
  maxImages = 8, // Por defecto, mostrar hasta 8 imágenes
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  // Usar un array de refs
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Preparar los elementos hijos como un array y limitar al número máximo
  const childrenArray = React.Children.toArray(children).slice(0, maxImages);
  const childCount = childrenArray.length;

  // Resetear referencias cuando cambia el número de hijos
  useEffect(() => {
    imageRefs.current = Array(childCount).fill(null);
  }, [childCount]);

  // Configurar las animaciones
  useEffect(() => {
    if (!animate || !gridRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Estado inicial para el contenedor
      gsap.set(gridRef.current, {
        opacity: 0,
        y: 20,
      });

      // Estados iniciales para cada imagen basados en la variante
      const elements = imageRefs.current.filter(Boolean);

      switch (variant) {
        case "cascade":
          elements.forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                y: 40 + index * 10,
                x: index % 2 === 0 ? -15 : 15,
                rotation: (index % 2 === 0 ? -1 : 1) * (Math.random() * 2 + 1),
              });
            }
          });
          break;

        case "mosaic":
          elements.forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                scale: 0.8,
                y: 30 * (Math.random() - 0.5),
                x: 30 * (Math.random() - 0.5),
              });
            }
          });
          break;

        case "pavilion":
          elements.forEach((element, index) => {
            if (element) {
              if (index === 0) {
                // Imagen central
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.9,
                  y: 10,
                });
              } else {
                // Imágenes satelitales
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.85,
                  y: 15 + index * 8,
                  x: index % 2 === 0 ? -20 : 20,
                });
              }
            }
          });
          break;

        case "orbit":
          elements.forEach((element, index) => {
            if (element) {
              if (index === 0) {
                // Imagen central
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.9,
                  y: 10,
                });
              } else {
                // Imágenes orbitales
                const angle = (index - 1) * (360 / (elements.length - 1));
                const radius = 20;
                const radian = (angle * Math.PI) / 180;

                gsap.set(element, {
                  opacity: 0,
                  scale: 0.85,
                  x: Math.cos(radian) * radius,
                  y: Math.sin(radian) * radius,
                  rotation: angle / 10,
                });
              }
            }
          });
          break;

        case "gallery":
          elements.forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                y: 30,
                x: index % 2 === 0 ? -20 : 20,
                scale: 0.95,
              });
            }
          });
          break;

        case "showcase":
          // Elemento principal centrado
          if (elements[0]) {
            gsap.set(elements[0], {
              opacity: 0,
              scale: 0.9,
              y: 20,
            });
          }

          // Elementos secundarios con posiciones flotantes
          elements.slice(1).forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                scale: 0.8,
                y: index % 2 === 0 ? 40 : -40,
                x: index % 2 === 0 ? -30 : 30,
                rotation: (index % 2 === 0 ? -1 : 1) * (Math.random() * 3 + 2),
              });
            }
          });
          break;

        case "perspective":
          // Animaciones específicas para efecto 3D
          elements.forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                scale: 0.85,
                z: -50,
                rotationY: index % 2 === 0 ? -15 : 15,
                rotationX: index % 3 === 0 ? 5 : -5,
              });
            }
          });
          break;

        case "cinematic":
          // Elemento principal con fade in
          if (elements[0]) {
            gsap.set(elements[0], {
              opacity: 0,
              scale: 1.05,
            });
          }

          // Elementos secundarios con entradas desde diferentes direcciones
          elements.slice(1).forEach((element, index) => {
            if (element) {
              const direction = index % 4;

              if (direction === 0) {
                gsap.set(element, {
                  opacity: 0,
                  x: -50,
                  rotation: -2,
                });
              } else if (direction === 1) {
                gsap.set(element, {
                  opacity: 0,
                  x: 50,
                  rotation: 2,
                });
              } else if (direction === 2) {
                gsap.set(element, {
                  opacity: 0,
                  y: 50,
                  rotation: 1.5,
                });
              } else {
                gsap.set(element, {
                  opacity: 0,
                  y: -50,
                  rotation: -1.5,
                });
              }
            }
          });
          break;

        // Código para añadir en el switch de estados iniciales
        case "parallax":
          // Configurar diferentes profundidades para el efecto parallax
          elements.forEach((element, index) => {
            if (element) {
              const depth = index === 0 ? 0 : (index % 3) + 1;
              gsap.set(element, {
                opacity: 0,
                y: depth * 30,
                scale: 1 - depth * 0.05,
              });
            }
          });
          break;

        case "editorial":
          // Posiciones iniciales para el estilo editorial
          elements.forEach((element, index) => {
            if (element) {
              if (index === 0) {
                // Imagen principal
                gsap.set(element, {
                  opacity: 0,
                  x: -30,
                });
              } else if (index === 1) {
                // Imagen secundaria
                gsap.set(element, {
                  opacity: 0,
                  y: 30,
                });
              } else {
                // Resto de imágenes
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.9,
                  y: 20 * index,
                  x: index % 2 === 0 ? 30 : -30,
                });
              }
            }
          });
          break;

        case "immersive":
          // Posicionamiento inmersivo
          if (elements[0]) {
            gsap.set(elements[0], {
              opacity: 0,
              scale: 1.1,
            });
          }
          elements.slice(1).forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                y: index % 2 === 0 ? -100 : 100,
                scale: 0.8,
              });
            }
          });
          break;

        case "portrait":
          // Estilo de retratos con posiciones iniciales
          elements.forEach((element, index) => {
            if (element) {
              gsap.set(element, {
                opacity: 0,
                rotationY: 15,
                rotationX: -5,
                scale: 0.85,
                transformPerspective: 1000,
              });
            }
          });
          break;

        // Código para añadir en el switch de animaciones
        case "parallax":
          // Animar con efecto parallax
          elements.forEach((element, index) => {
            if (element) {
              const depth = index === 0 ? 0 : (index % 3) + 1;
              const delay = 0.1 + depth * 0.1;

              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.2 - depth * 0.1,
                  ease: "power2.out",
                },
                delay
              );
            }
          });
          break;

        // Corrección para las variantes "editorial" e "immersive"

        // En el switch de animaciones, reemplaza estos dos casos:

        case "editorial":
          // Animar con estilo editorial
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.1;
              let duration = index === 0 ? 0.9 : 0.8;
              let ease = index === 0 ? "power3.out" : "power2.out";

              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  duration: duration,
                  ease: ease,
                },
                delay
              );
            }
          });
          break;

        case "immersive":
          // Animar con efecto inmersivo
          elements.forEach((element, index) => {
            if (element) {
              let delay = index === 0 ? 0.1 : 0.5 + index * 0.2;
              let duration = index === 0 ? 1.5 : 1;
              let ease = index === 0 ? "power2.inOut" : "power3.out";

              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: duration,
                  ease: ease,
                },
                delay
              );
            }
          });
          break;
        case "portrait":
          // Animar con efecto de retrato
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  rotationY: 0,
                  rotationX: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "back.out(1.7)",
                },
                0.15 + index * 0.12
              );
            }
          });
          break;

        case "floating":
          // Elementos flotando libremente en el espacio
          elements.forEach((element, index) => {
            if (element) {
              const randomX = ((Math.random() * 100 - 50) * (index + 1)) / 2;
              const randomY = ((Math.random() * 100 - 50) * (index + 1)) / 2;
              const randomRotation = Math.random() * 20 - 10;

              gsap.set(element, {
                opacity: 0,
                x: randomX,
                y: randomY,
                rotation: randomRotation,
                scale: 0.6 + Math.random() * 0.4,
              });
            }
          });
          break;

        case "staggered":
          // Posiciones escalonadas con variación
          elements.forEach((element, index) => {
            if (element) {
              const xOffset = index % 2 === 0 ? -80 : 80;
              const yOffset = 60 * index;

              gsap.set(element, {
                opacity: 0,
                scale: 0.8,
                x: xOffset,
                y: yOffset,
                rotation: index % 2 === 0 ? -5 : 5,
              });
            }
          });
          break;

        case "scattered":
          // Elementos dispersos aleatoriamente
          elements.forEach((element, index) => {
            if (element) {
              // Posiciones aleatorias más extremas
              const randomX = (Math.random() * 200 - 100) * ((index % 3) + 1);
              const randomY = (Math.random() * 200 - 100) * ((index % 3) + 1);
              const randomRotation = Math.random() * 30 - 15;

              gsap.set(element, {
                opacity: 0,
                x: randomX,
                y: randomY,
                rotation: randomRotation,
                scale: 0.5,
              });
            }
          });
          break;

        // Código para añadir en el switch de animaciones
        case "floating":
          // Animar con efecto flotante
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 1.2,
                  ease: "elastic.out(0.8, 0.5)",
                },
                0.15 + index * 0.12
              );
            }
          });
          break;

        case "staggered":
          // Animar con efecto escalonado
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "back.out(1.5)",
                },
                0.2 + index * 0.15
              );
            }
          });
          break;

        case "scattered":
          // Animar con efecto de reunión desde la dispersión
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 1.5,
                  ease: "elastic.out(1, 0.5)",
                },
                0.1 + index * 0.2
              );
            }
          });
          break;

        case "geometric":
          // Formas geométricas variadas con animación de entrada
          elements.forEach((element, index) => {
            if (element) {
              // Diferentes transformaciones iniciales según la posición
              if (index % 3 === 0) {
                // Elementos cuadrados - escalado desde el centro
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.7,
                  rotation: 0,
                });
              } else if (index % 3 === 1) {
                // Elementos horizontales - entrada desde la izquierda
                gsap.set(element, {
                  opacity: 0,
                  x: -50,
                  scale: 0.9,
                });
              } else {
                // Elementos verticales - entrada desde abajo
                gsap.set(element, {
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                });
              }
            }
          });
          break;

        case "dynamic":
          // Rectángulos con orientaciones variables
          elements.forEach((element, index) => {
            if (element) {
              const isHorizontal = index % 2 === 0;
              const xOffset = isHorizontal ? 70 : 30;
              const yOffset = isHorizontal ? 30 : 70;

              gsap.set(element, {
                opacity: 0,
                x: index % 4 < 2 ? -xOffset : xOffset,
                y: index % 3 === 0 ? -yOffset : yOffset,
                rotation: index % 5 === 0 ? 5 : index % 5 === 1 ? -5 : 0,
                scale: 0.8,
              });
            }
          });
          break;

        case "modular":
          // Elementos modulares con diferentes escalas
          elements.forEach((element, index) => {
            if (element) {
              // Diferentes transformaciones por tipo de módulo
              const moduleType = index % 4; // 4 tipos de módulos

              if (moduleType === 0) {
                // Módulo grande
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
                });
              } else if (moduleType === 1) {
                // Módulo horizontal
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.7,
                  x: -40,
                });
              } else if (moduleType === 2) {
                // Módulo vertical
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.7,
                  x: 40,
                });
              } else {
                // Módulo pequeño cuadrado
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.6,
                  y: -30,
                });
              }
            }
          });
          break;

        // Código para añadir en el switch de animaciones
        case "geometric":
          // Animar con efectos basados en la forma
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.08;
              let duration = 0.7;
              let ease = "power2.out";

              if (index % 3 === 0) {
                // Elementos cuadrados
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    duration: duration,
                    ease: ease,
                  },
                  delay
                );
              } else if (index % 3 === 1) {
                // Elementos horizontales
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: duration,
                    ease: "back.out(1.2)",
                  },
                  delay
                );
              } else {
                // Elementos verticales
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: duration,
                    ease: "back.out(1.2)",
                  },
                  delay
                );
              }
            }
          });
          break;

        case "dynamic":
          // Animar con efectos para rectángulos dinámicos
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.1;

              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "elastic.out(0.6, 0.3)",
                },
                delay
              );
            }
          });
          break;

        case "modular":
          // Animar con efectos por tipo de módulo
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.12;
              let duration = 0.8;
              let ease = "power3.out";

              const moduleType = index % 4;

              if (moduleType === 0) {
                // Módulo grande
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: duration,
                    ease: ease,
                  },
                  delay
                );
              } else if (moduleType === 1 || moduleType === 2) {
                // Módulos rectangulares
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: duration,
                    ease: "back.out(1.5)",
                  },
                  delay
                );
              } else {
                // Módulo pequeño
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: duration,
                    ease: "bounce.out",
                  },
                  delay
                );
              }
            }
          });
          break;

        // Reemplazar "geometric" por "mondrian" en el código de estados iniciales
        case "mondrian":
          // Formas geométricas variadas con animación de entrada
          elements.forEach((element, index) => {
            if (element) {
              // Diferentes transformaciones iniciales según la posición
              if (index % 3 === 0) {
                // Elementos cuadrados - escalado desde el centro
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.7,
                  rotation: 0,
                });
              } else if (index % 3 === 1) {
                // Elementos horizontales - entrada desde la izquierda
                gsap.set(element, {
                  opacity: 0,
                  x: -50,
                  scale: 0.9,
                });
              } else {
                // Elementos verticales - entrada desde abajo
                gsap.set(element, {
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                });
              }
            }
          });
          break;

        // Reemplazar "dynamic" por "blueprint" en el código de estados iniciales
        case "blueprint":
          // Rectángulos con orientaciones variables
          elements.forEach((element, index) => {
            if (element) {
              const isHorizontal = index % 2 === 0;
              const xOffset = isHorizontal ? 70 : 30;
              const yOffset = isHorizontal ? 30 : 70;

              gsap.set(element, {
                opacity: 0,
                x: index % 4 < 2 ? -xOffset : xOffset,
                y: index % 3 === 0 ? -yOffset : yOffset,
                rotation: index % 5 === 0 ? 5 : index % 5 === 1 ? -5 : 0,
                scale: 0.8,
              });
            }
          });
          break;

        // Reemplazar "modular" por "tetris" en el código de estados iniciales
        case "tetris":
          // Elementos modulares con diferentes escalas
          elements.forEach((element, index) => {
            if (element) {
              // Diferentes transformaciones por tipo de módulo
              const moduleType = index % 4; // 4 tipos de módulos

              if (moduleType === 0) {
                // Módulo grande
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
                });
              } else if (moduleType === 1) {
                // Módulo horizontal
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.7,
                  x: -40,
                });
              } else if (moduleType === 2) {
                // Módulo vertical
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.7,
                  x: 40,
                });
              } else {
                // Módulo pequeño cuadrado
                gsap.set(element, {
                  opacity: 0,
                  scale: 0.6,
                  y: -30,
                });
              }
            }
          });
          break;

        // Reemplazar "geometric" por "mondrian" en el código de animaciones
        case "mondrian":
          // Animar con efectos basados en la forma
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.08;
              let duration = 0.7;
              let ease = "power2.out";

              if (index % 3 === 0) {
                // Elementos cuadrados
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    duration: duration,
                    ease: ease,
                  },
                  delay
                );
              } else if (index % 3 === 1) {
                // Elementos horizontales
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: duration,
                    ease: "back.out(1.2)",
                  },
                  delay
                );
              } else {
                // Elementos verticales
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: duration,
                    ease: "back.out(1.2)",
                  },
                  delay
                );
              }
            }
          });
          break;

        // Reemplazar "dynamic" por "blueprint" en el código de animaciones
        case "blueprint":
          // Animar con efectos para rectángulos dinámicos
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.1;

              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "elastic.out(0.6, 0.3)",
                },
                delay
              );
            }
          });
          break;

        // Reemplazar "modular" por "tetris" en el código de animaciones
        case "tetris":
          // Animar con efectos por tipo de módulo
          elements.forEach((element, index) => {
            if (element) {
              let delay = 0.1 + index * 0.12;
              let duration = 0.8;
              let ease = "power3.out";

              const moduleType = index % 4;

              if (moduleType === 0) {
                // Módulo grande
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: duration,
                    ease: ease,
                  },
                  delay
                );
              } else if (moduleType === 1 || moduleType === 2) {
                // Módulos rectangulares
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: duration,
                    ease: "back.out(1.5)",
                  },
                  delay
                );
              } else {
                // Módulo pequeño
                mainTimeline.to(
                  element,
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: duration,
                    ease: "bounce.out",
                  },
                  delay
                );
              }
            }
          });
          break;
      }

      // Configuración de ScrollTrigger
      const scrollTrigger = {
        trigger: gridRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      };

      // Timeline principal
      const mainTimeline = gsap.timeline({ scrollTrigger });

      // Animación del contenedor
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

      // Animaciones específicas por variante
      switch (variant) {
        case "cascade":
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotation: 0,
                  duration: 0.7,
                  ease: "back.out(1.2)",
                },
                0.1 + index * 0.1
              );
            }
          });
          break;

        case "mosaic":
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  duration: 0.7,
                  ease: "elastic.out(1, 0.7)",
                },
                0.05 + index * 0.08
              );
            }
          });
          break;

        case "pavilion":
          // Primero la imagen central
          if (elements[0]) {
            mainTimeline.to(
              elements[0],
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              0.1
            );
          }

          // Luego las imágenes satelitales
          elements.slice(1).forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  duration: 0.6,
                  ease: "back.out(1.5)",
                },
                0.2 + index * 0.1
              );
            }
          });
          break;

        case "orbit":
          // Primero la imagen central
          if (elements[0]) {
            mainTimeline.to(
              elements[0],
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              },
              0.1
            );
          }

          // Luego las imágenes orbitales
          elements.slice(1).forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  duration: 0.7,
                  ease: "back.out(1.3)",
                },
                0.2 + index * 0.07
              );
            }
          });
          break;

        case "gallery":
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "circ.out",
                },
                0.1 + index * 0.1
              );
            }
          });
          break;

        case "showcase":
          // Imagen principal con una animación destacada
          if (elements[0]) {
            mainTimeline.to(
              elements[0],
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
              },
              0.1
            );
          }

          // Imágenes secundarias con animación flotante
          elements.slice(1).forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: 0,
                  rotation:
                    (index % 2 === 0 ? -1 : 1) * (Math.random() * 1 + 0.5),
                  duration: 0.8,
                  ease: "power2.out",
                },
                0.2 + index * 0.12
              );
            }
          });
          break;

        case "perspective":
          // Animar cada elemento con efecto 3D
          elements.forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  rotationY: 0,
                  rotationX: 0,
                  duration: 0.9,
                  ease: "power3.out",
                },
                0.15 + index * 0.12
              );
            }
          });
          break;

        case "cinematic":
          // Imagen principal con fade in suave
          if (elements[0]) {
            mainTimeline.to(
              elements[0],
              {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.inOut",
              },
              0.1
            );
          }

          // Imágenes secundarias con entrada cinematográfica
          elements.slice(1).forEach((element, index) => {
            if (element) {
              mainTimeline.to(
                element,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  duration: 0.8,
                  ease: "power3.out",
                },
                0.3 + index * 0.15
              );
            }
          });
          break;
      }
    });

    return () => {
      mm.revert();
    };
  }, [animate, variant, childCount]);

  // Clase CSS basada en la variante
  const gridClassName = cx(
    "creative-grid",
    `creative-grid--${variant}`,
    `creative-grid--count-${childCount}`, // Clase basada en la cantidad de imágenes
    className
  );

  // Función para manejar las referencias - versión corregida
  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  };

  return (
    <div className={gridClassName} ref={gridRef}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cx(
            "creative-grid__item",
            `creative-grid__item--${index + 1}`,
            {
              "creative-grid__item--featured": index === 0,
              "creative-grid__item--secondary": index === 1,
              "creative-grid__item--tertiary": index === 2,
            }
          )}
          ref={setItemRef(index)}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default CreativeImageGrid;
