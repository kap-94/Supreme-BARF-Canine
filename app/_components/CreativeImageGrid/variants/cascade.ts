import gsap from "gsap";
import classNames from "classnames/bind";
import { VariantConfig } from "../types";
import { getElementDelay, animateElement } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

/**
 * Configuración de la variante "cascade"
 */
export const cascadeVariant: VariantConfig = {
  /**
   * Inicializa los elementos para la variante cascade
   */
  initElements: (
    elements: (HTMLDivElement | null)[],
    childCount: number
  ): void => {
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
  },

  /**
   * Anima los elementos según la configuración de cascade
   */
  animateElements: (
    elements: (HTMLDivElement | null)[],
    timeline: gsap.core.Timeline,
    childCount: number
  ): void => {
    elements.forEach((element, index) => {
      if (element) {
        const delay = getElementDelay(index);

        animateElement(
          element,
          timeline,
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotation: 0,
          },
          delay,
          0.7,
          "back.out(1.2)"
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
    return getGridClassName("cascade", childCount, cx, className);
  },
};
