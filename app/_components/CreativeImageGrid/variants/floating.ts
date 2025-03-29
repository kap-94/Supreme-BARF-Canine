import gsap from "gsap";
import classNames from "classnames/bind";
import { VariantConfig } from "../types";
import { getElementDelay, animateElement } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

/**
 * Configuración de la variante "floating"
 */
export const floatingVariant: VariantConfig = {
  /**
   * Inicializa los elementos para la variante floating
   */
  initElements: (
    elements: (HTMLDivElement | null)[],
    childCount: number
  ): void => {
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
  },

  /**
   * Anima los elementos según la configuración de floating
   */
  animateElements: (
    elements: (HTMLDivElement | null)[],
    timeline: gsap.core.Timeline,
    childCount: number
  ): void => {
    // Animar con efecto flotante
    elements.forEach((element, index) => {
      if (element) {
        const delay = 0.15 + index * 0.12;

        animateElement(
          element,
          timeline,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          },
          delay,
          1.2,
          "elastic.out(0.8, 0.5)"
        );
      }
    });
  },

  /**
   * Devuelve la clase CSS para el contenedor
   */
  getContainerClass: (
    childCount: number,
    cx: ReturnType<typeof classNames.bind>,
    className: string = ""
  ): string => {
    return getGridClassName("floating", childCount, cx, className);
  },
};
