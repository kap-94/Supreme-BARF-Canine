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
 * @param setIsReady Callback para indicar cuando el grid está listo
 */
export const useGridAnimation = (
  gridRef: RefObject<HTMLDivElement>,
  imageRefs: RefObject<Array<HTMLDivElement | null>>,
  variant: CreativeGridVariant,
  animate: boolean,
  childCount: number,
  setIsReady: (ready: boolean) => void
): void => {
  useLayoutEffect(() => {
    // No animar si la animación está desactivada o no hay referencia
    if (!animate || !gridRef.current) {
      setIsReady(true); // Mostrar inmediatamente si no hay animación
      return;
    }

    const gridElement = gridRef.current;
    const elements = imageRefs.current?.filter(Boolean) || [];

    // Obtener configuración de la variante
    const variantConfig = getVariantConfig(variant);

    // PASO 1: Asegurarnos de que el grid está completamente oculto al principio
    gsap.set(gridElement, {
      opacity: 0,
      visibility: "hidden",
      immediateRender: true,
      overwrite: "auto",
    });

    // PASO 2: Limpiar completamente las animaciones existentes
    elements.forEach((element) => {
      if (element) {
        gsap.killTweensOf(element);
      }
    });

    // PASO 3: Ejecutar setup inicial ANTES de mostrar el grid
    variantConfig.initElements(elements, childCount);

    // Usar requestAnimationFrame para sincronizar con el ciclo de renderizado
    const rafId = requestAnimationFrame(() => {
      // Verificar que el componente sigue montado
      if (!gridElement) return;

      // Configurar match media
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1px)", () => {
        try {
          // Crear timeline principal
          const mainTimeline = createAnimationTimeline(gridElement);
          mainTimeline.reversed(false);

          // Animación del contenedor principal
          animateContainer(gridElement, mainTimeline);

          // Animación de los elementos individuales
          variantConfig.animateElements(elements, mainTimeline, childCount);

          // Marcar como listo para mostrar (después de configurar todo)
          setIsReady(true);
        } catch (error) {
          console.error("Animation error:", error);
          setIsReady(true); // Mostrar de todos modos si hay error
        }
      });
    });

    // Limpieza al desmontar
    return () => {
      cancelAnimationFrame(rafId);
      gsap.matchMedia().revert();

      // Limpiar todas las animaciones GSAP
      elements.forEach((element) => {
        if (element) {
          gsap.killTweensOf(element);
        }
      });

      // Resetear el grid
      if (gridRef.current) {
        gridRef.current.setAttribute("data-ready", "false");
      }
    };
  }, [animate, variant, childCount, gridRef, imageRefs, setIsReady]);
};

export default useGridAnimation;
