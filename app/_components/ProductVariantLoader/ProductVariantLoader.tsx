// app/_components/ProductVariantLoader/ProductVariantLoader.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getProductVariantByHandle } from "@/app/_actions/shopify-actions";
import AddToCartButton from "@/app/_components/AddToCartButton";

interface ProductVariantLoaderProps {
  productHandle: string;
  className?: string;
  fallbackButton?: React.ReactNode;
}

const ProductVariantLoader: React.FC<ProductVariantLoaderProps> = ({
  productHandle,
  className,
  fallbackButton,
}) => {
  const [variantId, setVariantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVariantId = async () => {
      try {
        setIsLoading(true);
        const result = await getProductVariantByHandle(productHandle);
        setVariantId(result);
      } catch (err) {
        console.error("Error loading product variant:", err);
        setError("No se pudo cargar la información del producto");
      } finally {
        setIsLoading(false);
      }
    };

    loadVariantId();
  }, [productHandle]);

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
    <AddToCartButton variantId={variantId} className={className}>
      Agregar al Carrito
    </AddToCartButton>
  );
};

export default ProductVariantLoader;
