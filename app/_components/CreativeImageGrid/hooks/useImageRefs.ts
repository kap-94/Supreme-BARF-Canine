import { useRef, useEffect } from "react";

/**
 * Hook para gestionar y actualizar las referencias de elementos de imagen
 *
 * @param childCount Número de elementos hijo a referenciar
 * @returns Objeto con refs y función setter
 */
export const useImageRefs = (childCount: number) => {
  // Usar un array de refs
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Resetear referencias cuando cambia el número de hijos
  useEffect(() => {
    imageRefs.current = Array(childCount).fill(null);
  }, [childCount]);

  // Función para asignar una ref a un índice específico
  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  };

  return {
    imageRefs,
    setItemRef,
  };
};

export default useImageRefs;
