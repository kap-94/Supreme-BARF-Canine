import gsap from "gsap";
import {
  ANIMATION_DELAYS,
  ANIMATION_DURATIONS,
  SCROLL_TRIGGER_CONFIG,
} from "../constants";

/**
 * Configura y devuelve un timeline de GSAP con ScrollTrigger
 *
 * @param trigger Elemento de referencia para el ScrollTrigger
 * @returns Timeline de GSAP configurado
 */
export const createAnimationTimeline = (
  trigger: HTMLElement | HTMLDivElement
): gsap.core.Timeline => {
  // Limpieza previa
  gsap.killTweensOf(trigger);

  // Configuración de ScrollTrigger
  const scrollTrigger = {
    trigger,
    ...SCROLL_TRIGGER_CONFIG,
  };

  // Timeline principal
  const timeline = gsap.timeline({
    scrollTrigger,
    reversed: false, // Dirección normal
    paused: false, // Iniciar inmediatamente
    smoothChildTiming: true, // Mejor coordinación de animaciones
    autoRemoveChildren: false, // Mantener las animaciones en el timeline
  });

  return timeline;
};

/**
 * Configura la animación inicial del contenedor
 *
 * @param container Elemento contenedor
 * @param timeline Timeline de GSAP a utilizar
 */
export const animateContainer = (
  container: HTMLElement | HTMLDivElement,
  timeline: gsap.core.Timeline
): void => {
  // Limpiar cualquier animación existente
  gsap.killTweensOf(container);

  // Estado inicial para el contenedor
  gsap.set(container, {
    opacity: 0,
    y: 20,
    immediateRender: true,
    overwrite: "auto",
  });

  // Animación del contenedor
  timeline.to(
    container,
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION_DURATIONS.container,
      ease: "power2.out",
      overwrite: "auto",
    },
    ANIMATION_DELAYS.container
  );
};

/**
 * Obtiene un cálculo de delay para un elemento específico
 *
 * @param index Índice del elemento
 * @param increment Incremento por elemento (opcional)
 * @param baseDelay Delay base (opcional)
 * @returns Delay calculado
 */
export const getElementDelay = (
  index: number,
  increment: number = ANIMATION_DELAYS.elementIncrement,
  baseDelay: number = ANIMATION_DELAYS.elementBase
): number => {
  return baseDelay + index * increment;
};

/**
 * Aplica animaciones con GSAP a un elemento
 *
 * @param element Elemento a animar
 * @param timeline Timeline de GSAP
 * @param config Configuración de la animación
 * @param delay Delay para la animación
 */
export const animateElement = (
  element: HTMLElement | HTMLDivElement,
  timeline: gsap.core.Timeline,
  config: gsap.TweenVars,
  delay: number,
  duration: number = ANIMATION_DURATIONS.element.medium,
  ease: string = "power2.out"
): void => {
  // Asegurar que no hay animaciones conflictivas
  gsap.killTweensOf(element);

  // Añadir la animación al timeline
  timeline.to(
    element,
    {
      ...config,
      duration,
      ease,
      overwrite: "auto", // Asegurar que sobrescribe propiedades conflictivas
    },
    delay
  );
};
