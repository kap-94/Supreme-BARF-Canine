import gsap from "gsap";
import { VariantConfig } from "../types";
import { animateElement } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

const FINAL_CONFIG = {
  1: { rotation: -3, x: 30, y: 25, width: 40, height: 55, zIndex: 5 },
  2: { rotation: 5, x: 10, y: 5, width: 30, height: 40, zIndex: 4 },
  3: { rotation: -5, x: -15, y: 15, width: 25, height: 35, zIndex: 3 },
  4: { rotation: 2, x: 15, y: -10, width: 20, height: 28, zIndex: 2 },
  5: { rotation: -1, x: -10, y: -15, width: 28, height: 38, zIndex: 3 },
  6: { rotation: 6, x: -5, y: 35, width: 18, height: 22, zIndex: 1 },
  7: { rotation: -4, x: 5, y: -30, width: 15, height: 25, zIndex: 1 },
  8: { rotation: 3, x: 55, y: 60, width: 22, height: 20, zIndex: 1 },
} as const;

export const scatteredVariant: VariantConfig = {
  initElements: (elements, childCount) => {
    elements.forEach((element, index) => {
      if (!element) return;

      gsap.killTweensOf(element);

      const configKey = Math.min(index + 1, 8) as keyof typeof FINAL_CONFIG;
      const finalConfig = FINAL_CONFIG[configKey];
      const randomFactor = (index % 3) + 1;

      gsap.set(element, {
        opacity: 0,
        xPercent: finalConfig.x + (Math.random() * 200 - 100) * randomFactor,
        yPercent: finalConfig.y + (Math.random() * 200 - 100) * randomFactor,
        rotation: finalConfig.rotation + (Math.random() * 40 - 20),
        scale: 0.5,
        force3D: true,
        immediateRender: true,
        overwrite: "auto",
      });

      gsap.set(element, {
        width: `${finalConfig.width}%`,
        height: `${finalConfig.height}%`,
        zIndex: finalConfig.zIndex,
      });
    });
  },

  animateElements: (elements, timeline, childCount) => {
    timeline.reversed(false);

    elements.forEach((element, index) => {
      if (!element) return;

      const configKey = Math.min(index + 1, 8) as keyof typeof FINAL_CONFIG;
      const finalConfig = FINAL_CONFIG[configKey];
      const delay = 0.1 + index * 0.2;

      animateElement(
        element,
        timeline,
        {
          opacity: 1,
          xPercent: finalConfig.x,
          yPercent: finalConfig.y,
          rotation: finalConfig.rotation,
          scale: 1,
          force3D: true,
          overwrite: "auto",
        },
        delay,
        1.5,
        "elastic.out(1, 0.5)"
      );
    });
  },

  getContainerClass: (childCount, cx, className = "") => {
    return getGridClassName("scattered", childCount, cx, className);
  },
};
