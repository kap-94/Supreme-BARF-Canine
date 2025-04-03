import CreativeImageGrid from "./CreativeImageGrid";
import { registerVariant } from "./variants";
import type { CreativeGridVariant, VariantConfig } from "./types";

// Re-exportamos el componente como default export
export default CreativeImageGrid;

// También exportamos tipos y funciones de utilidad que puedan ser útiles
export { registerVariant, type CreativeGridVariant, type VariantConfig };
