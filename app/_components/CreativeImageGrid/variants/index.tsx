import { VariantConfig, VariantRegistry, CreativeGridVariant } from "../types";
import { cascadeVariant } from "./cascade";
import { floatingVariant } from "./floating";
import { scatteredVariant } from "./scattered";

// Registro de todas las variantes disponibles
const variantRegistry: VariantRegistry = {
  cascade: cascadeVariant,
  floating: floatingVariant,
  scattered: scatteredVariant,
};

/**
 * Obtiene la configuración de una variante específica
 */
export const getVariantConfig = (
  variant: CreativeGridVariant
): VariantConfig => {
  if (variantRegistry[variant]) {
    return variantRegistry[variant];
  }

  console.warn(`Variant "${variant}" not found. Using "cascade" as fallback.`);
  return variantRegistry.cascade;
};

/**
 * Registra una nueva variante en el sistema
 */
export const registerVariant = (name: string, config: VariantConfig): void => {
  if (variantRegistry[name]) {
    console.warn(`Variant "${name}" already exists and will be overwritten.`);
  }
  variantRegistry[name] = config;
};

// Exportamos todas las variantes individualmente
export { cascadeVariant, floatingVariant, scatteredVariant };
