import gsap from "gsap";
import { VariantConfig } from "../types";
import { animateElement, getElementDelay } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

export const floatingVariant: VariantConfig = {
  initElements: (elements, childCount) => {
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

  animateElements: (elements, timeline, childCount) => {
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

  getContainerClass: (childCount, cx, className = "") => {
    return getGridClassName("floating", childCount, cx, className);
  },
};
