"use client";

import React, { useState, useEffect } from "react";
import classnames from "classnames/bind";
import { useCart } from "@/app/_context/CartContext";
import { Button } from "@/app/_components";
import { addToCart, createCart } from "@/app/_actions/shopify-actions";
import Dropdown from "@/app/_components/Dropdown";
import styles from "./AddToCartButton.module.scss";

const cx = classnames.bind(styles);

export interface AddToCartButtonProps {
  variantId: string;
  className?: string;
  children?: React.ReactNode;
  /**
   * Prop para seleccionar el tipo de control para la cantidad:
   * "default" = botones de incremento/decremento
   * "dropdown" = usa el componente Dropdown
   * "none" = no muestra controles de cantidad (para paquetes)
   */
  quantityInputVariant?: "default" | "dropdown" | "none";
  /**
   * Cantidad fija para paquetes
   */
  fixedQuantity?: number;
  /**
   * Si es true, al hacer clic en el botón principal va directo al checkout
   */
  directCheckout?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  variantId,
  className,
  children = "Agregar al Carrito",
  quantityInputVariant = "default",
  fixedQuantity,
  directCheckout = false,
}) => {
  const { cart, addItem, setCart } = useCart();
  const [isAddingCart, setIsAddingCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [quantity, setQuantity] = useState(fixedQuantity || 1);

  // Si hay una cantidad fija, asegurarse de usarla
  useEffect(() => {
    if (fixedQuantity) {
      setQuantity(fixedQuantity);
    }
  }, [fixedQuantity]);

  const handleAddToCart = async () => {
    if (directCheckout) {
      // Si es directo al checkout, usamos el comportamiento de Buy Now
      await handleBuyNow(true);
      return;
    }

    setIsAddingCart(true);
    try {
      await addItem(variantId, quantity);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAddingCart(false);
    }
  };

  const handleBuyNow = async (shouldClearCart = false) => {
    setIsBuying(true);

    try {
      let targetCart = cart;

      // Si debemos limpiar el carrito, creamos uno nuevo
      if (shouldClearCart && cart) {
        try {
          const newCart = await createCart();
          targetCart = newCart;

          // Actualizar el carrito en el contexto
          try {
            localStorage.setItem("shopify_cart_id", newCart.id);
          } catch (e) {
            console.warn("Unable to save cart ID to localStorage:", e);
          }
          setCart(newCart);
        } catch (error) {
          console.error("Error creating new cart:", error);
          // Si falla la creación, usamos el carrito actual
        }
      }

      if (!targetCart) {
        console.error("Carrito no inicializado");
        return;
      }

      const updatedCart = await addToCart(targetCart.id, [
        { id: variantId, quantity },
      ]);

      // Redirige directamente a la URL de checkout de Shopify.
      window.location.href = updatedCart.checkoutUrl;
    } catch (error) {
      console.error("Error buying now:", error);
    } finally {
      setIsBuying(false);
    }
  };

  // Opciones para el dropdown: números del 1 al 10
  const dropdownOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));
  const selectedOption =
    dropdownOptions.find((opt) => parseInt(opt.value, 10) === quantity) ||
    dropdownOptions[0];

  return (
    <div className={cx("add-to-cart", className)}>
      {/* Control de cantidad en la parte superior, alineado a la izquierda */}
      {quantityInputVariant !== "none" && !fixedQuantity && (
        <div className={cx("add-to-cart__quantity")}>
          {quantityInputVariant === "dropdown" ? (
            <Dropdown
              label="Cantidad"
              options={dropdownOptions}
              selected={selectedOption}
              onSelectedChange={(option) =>
                setQuantity(parseInt(option.value, 10))
              }
              variant="primary"
              className={cx("add-to-cart__dropdown")}
            />
          ) : (
            <div className={cx("add-to-cart__default-quantity")}>
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className={cx("add-to-cart__quantity-btn")}
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className={cx("add-to-cart__quantity-value")}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className={cx("add-to-cart__quantity-btn")}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mostrar la cantidad fija de paquete si es un paquete */}
      {/* {fixedQuantity && fixedQuantity > 1 && (
        <div className={cx("add-to-cart__fixed-quantity")}>
          <span className={cx("add-to-cart__fixed-quantity-label")}>
            Cantidad: 
          </span>
          <span className={cx("add-to-cart__fixed-quantity-value")}>
            {fixedQuantity} unidades
          </span>
        </div>
      )} */}

      {/* Botones de acción, alineados a la izquierda */}
      <div className={cx("add-to-cart__actions")}>
        <Button
          variant="primary"
          onClick={handleAddToCart}
          disabled={isAddingCart || isBuying}
          className={cx("add-to-cart__button")}
          icon={{ source: "lucide", name: "shoppingCart" }}
        >
          {isAddingCart || isBuying
            ? directCheckout
              ? "Procesando..."
              : "Agregando..."
            : children}
        </Button>

        {/* Solo mostramos el botón de Comprar Ahora para productos individuales */}
        {!directCheckout && (
          <Button
            variant="secondary"
            onClick={() => handleBuyNow(false)}
            disabled={isAddingCart || isBuying}
            className={cx("add-to-cart__button")}
          >
            {isBuying ? "Procesando..." : "Comprar Ahora"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddToCartButton;
