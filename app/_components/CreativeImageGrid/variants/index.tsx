import { VariantConfig, VariantRegistry, CreativeGridVariant } from "../types";
import { cascadeVariant } from "./cascade";
// import { mosaicVariant } from "./mosaic";
// import { pavilionVariant } from "./pavilion";
// import { orbitVariant } from "./orbit";
// import { galleryVariant } from "./gallery";
// import { showcaseVariant } from "./showcase";
// import { perspectiveVariant } from "./perspective";
// import { cinematicVariant } from "./cinematic";
// import { parallaxVariant } from "./parallax";
// import { editorialVariant } from "./editorial";
// import { immersiveVariant } from "./immersive";
// import { portraitVariant } from "./portrait";
import { floatingVariant } from "./floating";
// import { staggeredVariant } from "./staggered";
import { scatteredVariant } from "./scattered";
// import { geometricVariant } from "./geometric";
// import { dynamicVariant } from "./dynamic";
// import { modularVariant } from "./modular";
// import { mondrianVariant } from "./mondrian";
// import { blueprintVariant } from "./blueprint";
// import { tetrisVariant } from "./tetris";

// Registro de todas las variantes disponibles
const variantRegistry: VariantRegistry = {
  cascade: cascadeVariant,
  // mosaic: mosaicVariant,
  // pavilion: pavilionVariant,
  // orbit: orbitVariant,
  // gallery: galleryVariant,
  // showcase: showcaseVariant,
  // perspective: perspectiveVariant,
  // cinematic: cinematicVariant,
  // parallax: parallaxVariant,
  // editorial: editorialVariant,
  // immersive: immersiveVariant,
  // portrait: portraitVariant,
  // floating: floatingVariant,
  // staggered: staggeredVariant,
  scattered: scatteredVariant,
  // geometric: geometricVariant,
  // dynamic: dynamicVariant,
  // modular: modularVariant,
  // mondrian: mondrianVariant,
  // blueprint: blueprintVariant,
  // tetris: tetrisVariant,
};

/**
 * Obtiene la configuración de una variante específica
 *
 * @param variant Nombre de la variante
 * @returns Configuración de la variante
 */
export const getVariantConfig = (
  variant: CreativeGridVariant
): VariantConfig => {
  // Si la variante existe en el registro, devolverla
  if (variantRegistry[variant]) {
    return variantRegistry[variant];
  }

  // Si no existe, retornar la variante por defecto (cascade)
  console.warn(`Variant "${variant}" not found. Using "cascade" as fallback.`);
  return variantRegistry.cascade;
};

/**
 * Registra una nueva variante en el sistema
 *
 * @param name Nombre único de la variante
 * @param config Configuración de la variante
 */
export const registerVariant = (name: string, config: VariantConfig): void => {
  if (variantRegistry[name]) {
    console.warn(`Variant "${name}" already exists and will be overwritten.`);
  }

  variantRegistry[name] = config;
};

// Exportamos todas las variantes individualmente para uso directo
export {
  cascadeVariant,
  // mosaicVariant,
  // pavilionVariant,
  // orbitVariant,
  // galleryVariant,
  // showcaseVariant,
  // perspectiveVariant,
  // cinematicVariant,
  // parallaxVariant,
  // editorialVariant,
  // immersiveVariant,
  // portraitVariant,
  floatingVariant,
  // staggeredVariant,
  scatteredVariant,
  // geometricVariant,
  // dynamicVariant,
  // modularVariant,
  // mondrianVariant,
  // blueprintVariant,
  // tetrisVariant,
};
