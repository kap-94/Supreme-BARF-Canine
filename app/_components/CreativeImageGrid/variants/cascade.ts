import gsap from "gsap";
import { VariantConfig } from "../types";
import { animateElement, getElementDelay } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

export const cascadeVariant: VariantConfig = {
  initElements: (elements, childCount) => {
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

  animateElements: (elements, timeline, childCount) => {
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

  getContainerClass: (childCount, cx, className = "") => {
    return getGridClassName("cascade", childCount, cx, className);
  },
};
