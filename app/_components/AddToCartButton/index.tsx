// app/_components/AddToCartButton/AddToCartButton.tsx
"use client";

import React, { useState } from "react";
import classnames from "classnames/bind";
import { useCart } from "@/app/_context/CartContext";
import { Button } from "@/app/_components";
import styles from "./AddToCartButton.module.scss";

const cx = classnames.bind(styles);

interface AddToCartButtonProps {
  variantId: string;
  className?: string;
  children?: React.ReactNode;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  variantId,
  className,
  children = "Agregar al Carrito",
}) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem(variantId, quantity);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className={cx("add-to-cart", className)}>
      <div className={cx("add-to-cart__quantity")}>
        <button
          type="button"
          onClick={decrementQuantity}
          disabled={quantity <= 1 || isAdding}
          className={cx("add-to-cart__quantity-btn")}
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        <span className={cx("add-to-cart__quantity-value")}>{quantity}</span>
        <button
          type="button"
          onClick={incrementQuantity}
          disabled={isAdding}
          className={cx("add-to-cart__quantity-btn")}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <Button
        variant="primary"
        onClick={handleAddToCart}
        disabled={isAdding}
        className={cx("add-to-cart__button")}
        icon={{ source: "lucide", name: "shoppingCart" }}
      >
        {isAdding ? "Agregando..." : children}
      </Button>
    </div>
  );
};

export default AddToCartButton;
