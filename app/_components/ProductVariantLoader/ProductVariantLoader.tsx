"use client";

import React, { useEffect, useState } from "react";
import { getProductVariantByHandle } from "@/app/_actions/shopify-actions";
import AddToCartButton from "@/app/_components/AddToCartButton";
import { Minus, Plus } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./ProductVariantLoader.module.scss";

const cx = classNames.bind(styles);

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
  const [quantity, setQuantity] = useState(1);

  // Determinar la cantidad inicial de bolsas basado en el handle del producto
  const getInitialPackQuantity = (): number => {
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

  useEffect(() => {
    // Inicializar la cantidad basada en el tipo de producto
    setQuantity(1); // Siempre comenzamos con 1 unidad
  }, [productHandle]);

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

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className={cx("product-variant-loader", className)}>
        <div className={cx("loading-spinner")}>Cargando...</div>
      </div>
    );
  }

  if (error || !variantId) {
    return <>{fallbackButton}</>;
  }

  const basePackQuantity = getInitialPackQuantity();
  // Para paquetes, multiplicamos la cantidad base por la cantidad seleccionada
  const finalQuantity = isMultiPack ? basePackQuantity * quantity : quantity;

  return (
    <div className={cx("product-variant-loader", className)}>
      {/* Solo mostrar el contador para productos individuales */}
      {!isMultiPack && (
        <div className={cx("quantity-selector")}>
          <button
            className={cx("quantity-btn", "quantity-btn--minus")}
            onClick={decrementQuantity}
            aria-label="Disminuir cantidad"
            type="button"
          >
            <Minus size={18} strokeWidth={2.5} color="#000000" />
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={cx("quantity-input")}
            value={quantity}
            onChange={handleQuantityChange}
            aria-label="Cantidad"
          />

          <button
            className={cx("quantity-btn", "quantity-btn--plus")}
            onClick={incrementQuantity}
            aria-label="Aumentar cantidad"
            type="button"
          >
            <Plus size={18} strokeWidth={2.5} color="#000000" />
          </button>
        </div>
      )}

      <AddToCartButton
        quantityInputVariant="none" // Ya manejamos la cantidad aquí
        variantId={variantId}
        fixedQuantity={isMultiPack ? basePackQuantity : quantity}
        className={cx("add-button")}
        directCheckout={isMultiPack}
      >
        {isMultiPack ? "Comprar Paquete" : "Agregar al Carrito"}
      </AddToCartButton>
    </div>
  );
};

export default ProductVariantLoader;
