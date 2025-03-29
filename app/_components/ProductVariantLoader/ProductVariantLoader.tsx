"use client";

import React, { useEffect, useState } from "react";
import { getProductVariantByHandle } from "@/app/_actions/shopify-actions";
import AddToCartButton from "@/app/_components/AddToCartButton";

interface ProductVariantLoaderProps {
  productHandle: string;
  className?: string;
  isMultiPack?: boolean;
  fallbackButton?: React.ReactNode;
}

const ProductVariantLoader: React.FC<ProductVariantLoaderProps> = ({
  productHandle,
  className,
  isMultiPack = false,
  fallbackButton,
}) => {
  const [variantId, setVariantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determinar la cantidad de bolsas basado en el handle del producto
  const getPackQuantity = (): number => {
    if (!isMultiPack) return 1;

    const match = productHandle.match(/paquete-(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    // Si no puede extraer la cantidad del handle pero sabemos que es un paquete,
    // intentar determinar por otros medios
    if (productHandle.includes("paquete-8")) {
      return 8;
    } else if (productHandle.includes("paquete-16")) {
      return 16;
    }

    // Por defecto, si no se puede determinar pero es un paquete, asumimos 1
    return 1;
  };

  const packQuantity = getPackQuantity();

  useEffect(() => {
    const loadVariantId = async () => {
      try {
        setIsLoading(true);
        // Para los paquetes, necesitamos obtener el ID de la variante de la bolsa individual
        const targetHandle = isMultiPack
          ? "formula-de-pollo-perro-adulto-todas-las-razas" // Handle de la bolsa individual
          : productHandle;

        const result = await getProductVariantByHandle(targetHandle);
        setVariantId(result);
      } catch (err) {
        console.error("Error loading product variant:", err);
        setError("No se pudo cargar la información del producto");
      } finally {
        setIsLoading(false);
      }
    };

    loadVariantId();
  }, [productHandle, isMultiPack]);

  if (isLoading) {
    return (
      <div className={className}>
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  if (error || !variantId) {
    return <>{fallbackButton}</>;
  }

  return (
    <AddToCartButton
      quantityInputVariant={isMultiPack ? "none" : "dropdown"}
      variantId={variantId}
      fixedQuantity={packQuantity}
      className={className}
      directCheckout={isMultiPack}
    >
      {isMultiPack ? "Comprar Paquete" : "Agregar al Carrito"}
    </AddToCartButton>
  );
};

export default ProductVariantLoader;
