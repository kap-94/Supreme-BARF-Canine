// app/_components/CartIcon/CartIcon.tsx
"use client";

import React from "react";
import classnames from "classnames/bind";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_context/CartContext";
import Typography from "../Typography";
import styles from "./CartButton.module.scss";

const cx = classnames.bind(styles);

const CartButton: React.FC = () => {
  const { cart, openCart } = useCart();
  const itemCount = cart?.totalQuantity || 0;
  const hasItems = itemCount > 0;

  return (
    <button
      className={cx("cart-button")}
      onClick={openCart}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <div className={cx("cart-button__icon-container")}>
        <ShoppingCart
          className={cx("cart-button__svg")}
          size={24}
          color="white"
          fill="white"
          strokeWidth={1.5}
        />
        {hasItems && (
          <span className={cx("cart-button__badge")}>
            <Typography variant="p3" fontWeight={600} color="white">
              {itemCount}
            </Typography>
          </span>
        )}
      </div>
      <Typography
        variant="p2"
        fontWeight={500}
        color="white"
        className={cx("cart-button__text")}
      >
        Carrito
      </Typography>
    </button>
  );
};

export default CartButton;
