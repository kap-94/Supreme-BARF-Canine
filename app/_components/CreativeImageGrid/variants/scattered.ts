import gsap from "gsap";
import classNames from "classnames/bind";
import { VariantConfig } from "../types";
import { animateElement } from "../utils/animation";
import { getGridClassName } from "../utils/grid";

// Rotaciones finales de los elementos
const FINAL_ROTATIONS: { [key: number]: number } = {
  1: -3,
  2: 5,
  3: -5,
  4: 2,
  5: -1,
  6: 6,
  7: -4,
  8: 3,
};

// Posiciones finales basadas en el CSS (en porcentajes)
const FINAL_POSITIONS: { [key: number]: { x: number; y: number } } = {
  1: { x: 30, y: 25 }, // left: 30%, top: 25%
  2: { x: 10, y: 5 }, // left: 10%, top: 5%
  3: { x: -15, y: 15 }, // right: 15% (equivale a left: -15%)
  4: { x: 15, y: -10 }, // left: 15%, bottom: 10% (equivale a top: -10%)
  5: { x: -10, y: -15 }, // right: 10%, bottom: 15% (equivale a left: -10%, top: -15%)
  6: { x: -5, y: 35 }, // right: 5%, top: 35% (equivale a left: -5%)
  7: { x: 5, y: -30 }, // left: 5%, bottom: 30% (equivale a top: -30%)
  8: { x: 55, y: 60 }, // left: 55%, top: 60%
};

export const scatteredVariant: VariantConfig = {
  initElements: (elements, childCount) => {
    elements.forEach((element, index) => {
      if (!element) return;

      // Limpiar animaciones existentes
      gsap.killTweensOf(element);

      // Obtener posición y rotación final
      const finalPos = FINAL_POSITIONS[index + 1] || { x: 0, y: 0 };
      const finalRotation = FINAL_ROTATIONS[index + 1] || 0;

      // Calcular posición inicial aleatoria (más extrema)
      const randomXOffset = (Math.random() * 200 - 100) * ((index % 3) + 1);
      const randomYOffset = (Math.random() * 200 - 100) * ((index % 3) + 1);

      const initialX = finalPos.x + randomXOffset;
      const initialY = finalPos.y + randomYOffset;
      const initialRotation = finalRotation + (Math.random() * 40 - 20);

      // Aplicar estado inicial
      gsap.set(element, {
        opacity: 0,
        xPercent: initialX,
        yPercent: initialY,
        rotation: initialRotation,
        scale: 0.5,
        force3D: true,
        immediateRender: true,
        overwrite: "auto",
      });

      // Guardar posición final como propiedad del elemento
      element.dataset.finalX = finalPos.x.toString();
      element.dataset.finalY = finalPos.y.toString();
    });
  },

  animateElements: (elements, timeline) => {
    timeline.reversed(false);

    elements.forEach((element, index) => {
      if (!element) return;

      const delay = 0.1 + index * 0.2;
      const finalRotation = FINAL_ROTATIONS[index + 1] || 0;

      // Recuperar posición final guardada
      const finalX = parseFloat(element.dataset.finalX || "0");
      const finalY = parseFloat(element.dataset.finalY || "0");

      animateElement(
        element,
        timeline,
        {
          opacity: 1,
          xPercent: finalX,
          yPercent: finalY,
          rotation: finalRotation,
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
