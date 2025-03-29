import gsap from "gsap";
import classNames from "classnames/bind";
import { VariantConfig } from "../types";
import { animateElement } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

/**
 * Configuración de la variante "scattered"
 */
export const scatteredVariant: VariantConfig = {
  initElements: (elements, childCount) => {
    elements.forEach((element, index) => {
      if (element) {
        // Posiciones aleatorias
        const randomX = (Math.random() * 200 - 100) * ((index % 3) + 1);
        const randomY = (Math.random() * 200 - 100) * ((index % 3) + 1);
        const randomRotation = Math.random() * 30 - 15;

        gsap.set(element, {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
        });
      }
    });
  },

  animateElements: (elements, timeline) => {
    elements.forEach((element, index) => {
      if (element) {
        const delay = 0.1 + index * 0.2;
        const randomX = (Math.random() * 200 - 100) * ((index % 3) + 1);
        const randomY = (Math.random() * 200 - 100) * ((index % 3) + 1);
        const randomRotation = Math.random() * 30 - 15;
        animateElement(
          element,
          timeline,
          {
            opacity: 0,
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            scale: 0.5,
          },
          delay,
          1.5,
          "elastic.out(1, 0.5)"
        );
      }
    });
  },

  getContainerClass: (childCount, cx, className = "") => {
    return getGridClassName("scattered", childCount, cx, className);
  },
};
