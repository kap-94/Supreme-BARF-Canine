import { ReactNode } from "react";
import classNames from "classnames/bind";

// Definición de todas las variantes disponibles
export type CreativeGridVariant =
  | "cascade"
  | "mosaic"
  | "pavilion"
  | "orbit"
  | "gallery"
  | "showcase"
  | "perspective"
  | "cinematic"
  | "parallax"
  | "editorial"
  | "immersive"
  | "portrait"
  | "floating"
  | "staggered"
  | "scattered"
  | "geometric"
  | "dynamic"
  | "modular"
  | "mondrian"
  | "blueprint"
  | "tetris";

// Props para el componente principal
export interface CreativeImageGridProps {
  children: ReactNode;
  variant: CreativeGridVariant;
  className?: string;
  animate?: boolean;
  maxImages?: number;
}

// Configuración de animación para un elemento individual
export interface ElementAnimationConfig {
  initial?: gsap.TweenVars;
  animation?: gsap.TweenVars;
  delay?: number;
  duration?: number;
  ease?: string;
}

// Configuración completa de una variante
export interface VariantConfig {
  // Cambiamos para aceptar elementos que pueden ser null
  initElements: (
    elements: (HTMLDivElement | null)[],
    childCount: number
  ) => void;
  animateElements: (
    elements: (HTMLDivElement | null)[],
    timeline: gsap.core.Timeline,
    childCount: number
  ) => void;
  getContainerClass: (
    childCount: number,
    cx: ReturnType<typeof classNames.bind>,
    className?: string
  ) => string;
}

// Registro de todas las variantes disponibles
export interface VariantRegistry {
  [key: string]: VariantConfig;
}
