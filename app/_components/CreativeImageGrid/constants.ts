import { CreativeGridVariant } from "./types";

// Valores predeterminados del componente
export const DEFAULT_MAX_IMAGES = 8;
export const DEFAULT_VARIANT: CreativeGridVariant = "cascade";

// Duración de las animaciones
export const ANIMATION_DURATIONS = {
  container: 0.8,
  element: {
    short: 0.7,
    medium: 0.9,
    long: 1.2,
  },
};

// Demoras en las animaciones
export const ANIMATION_DELAYS = {
  container: 0,
  elementBase: 0.1,
  elementIncrement: 0.1,
};

// Configuración de ScrollTrigger
export const SCROLL_TRIGGER_CONFIG = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

// Punto de ruptura para dispositivos móviles (debe coincidir con SCSS)
export const BREAKPOINTS = {
  medium: 768, // Match $medium de SCSS
  small: 480, // Match $small de SCSS
};
