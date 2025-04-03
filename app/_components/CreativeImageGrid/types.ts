import { ReactNode } from "react";

export type ClassNamesFn = (...args: any[]) => string;

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

export interface CreativeImageGridProps {
  children: ReactNode;
  variant: CreativeGridVariant;
  className?: string;
  animate?: boolean;
  maxImages?: number;
}

export interface VariantConfig {
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
    cx: ClassNamesFn,
    className?: string
  ) => string;
}

// Nuevo tipo para el registro de variantes
export interface VariantRegistry {
  [key: string]: VariantConfig;
}
