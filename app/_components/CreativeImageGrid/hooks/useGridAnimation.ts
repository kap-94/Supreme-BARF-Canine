import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import { CreativeGridVariant } from "../types";
import { animateContainer, createAnimationTimeline } from "../utils/animation";
import { getVariantConfig } from "../variants";

/**
 * Hook para manejar las animaciones del grid
 *
 * @param gridRef Referencia al contenedor del grid
 * @param imageRefs Referencias a los elementos de imagen
 * @param variant Variante seleccionada
 * @param animate Flag para activar/desactivar animaciones
 * @param childCount Número de elementos hijo
 */
export const useGridAnimation = (
  gridRef: RefObject<HTMLDivElement>,
  imageRefs: RefObject<Array<HTMLDivElement | null>>,
  variant: CreativeGridVariant,
  animate: boolean,
  childCount: number
): void => {
  useLayoutEffect(() => {
    // No animar si la animación está desactivada o no hay referencia
    if (!animate || !gridRef.current) return;

    const gridElement = gridRef.current;
    const elements = imageRefs.current?.filter(Boolean) || [];

    // Obtener configuración de la variante
    const variantConfig = getVariantConfig(variant);

    // 1. Inicializa estados de los elementos (opacidad 0, x/y inicial, etc.)
    //    Esto asegura que, antes de mostrarse, estén "listos" para animar.
    variantConfig.initElements(elements, childCount);

    // 2. Cambiamos el atributo para mostrar el contenedor una vez listos
    //    (de "false" a "true"). Ya no estará oculto.
    gridElement.setAttribute("data-ready", "true");

    // 3. Configuramos la animación con GSAP MatchMedia + ScrollTrigger (si lo usas)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Creamos el timeline
      const mainTimeline = createAnimationTimeline(gridElement);

      // Animación del contenedor (fade in principal)
      animateContainer(gridElement, mainTimeline);

      // Animación individual de los elementos
      variantConfig.animateElements(elements, mainTimeline, childCount);
    });

    // Limpieza al desmontar
    return () => {
      mm.revert();
    };
  }, [animate, variant, childCount, gridRef, imageRefs]);
};

export default useGridAnimation;
