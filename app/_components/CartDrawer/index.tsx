// app/_components/CartDrawer/CartDrawer.tsx
"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import classnames from "classnames/bind";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_context/CartContext";
import { Button, Typography } from "@/app/_components";
import styles from "./CartDrawer.module.scss";

const cx = classnames.bind(styles);

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, updateItem, removeItem, isLoading } =
    useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic en el overlay, pero no en el drawer
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayRef.current && drawerRef.current) {
      if (e.target === overlayRef.current) {
        closeCart();
      }
    }
  };

  // Manejar la tecla Escape para cerrar el drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevenir el scroll del body cuando el drawer está abierto
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  // Manejar el scroll a la sección de productos
  const handleExploreProducts = () => {
    closeCart();

    // Dar tiempo a que se cierre el drawer antes de hacer scroll
    setTimeout(() => {
      const productSection = document.getElementById("product-section");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  if (!isCartOpen) {
    return null;
  }

  const handleUpdateQuantity = (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(lineId);
    } else {
      updateItem(lineId, newQuantity);
    }
  };

  const subtotal = cart ? parseFloat(cart.estimatedCost.totalAmount.amount) : 0;
  const currencyCode = cart?.estimatedCost.totalAmount.currencyCode || "MXN";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  return (
    <div
      ref={overlayRef}
      className={cx("cart-drawer-overlay")}
      onClick={handleOverlayClick}
    >
      <div ref={drawerRef} className={cx("cart-drawer")}>
        <div className={cx("cart-drawer__header")}>
          <Typography variant="h4" className={cx("cart-drawer__title")}>
            Tu Carrito
          </Typography>
          <button
            onClick={closeCart}
            className={cx("cart-drawer__close")}
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>

        <div className={cx("cart-drawer__content")}>
          {isLoading ? (
            <div className={cx("cart-drawer__loading")}>
              <div className={cx("cart-drawer__spinner")}></div>
              <Typography variant="p2">Cargando...</Typography>
            </div>
          ) : cart?.lines.edges.length ? (
            <>
              <ul className={cx("cart-drawer__items")}>
                {cart.lines.edges.map(({ node }) => (
                  <li key={node.id} className={cx("cart-drawer__item")}>
                    <div className={cx("cart-drawer__item-image")}>
                      {node.merchandise.image && (
                        <Image
                          src={node.merchandise.image.url}
                          alt={node.merchandise.image.altText || ""}
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>
                    <div className={cx("cart-drawer__item-details")}>
                      <Typography
                        variant="p2"
                        fontWeight={600}
                        className={cx("cart-drawer__item-title")}
                      >
                        {node.merchandise.product.title}
                      </Typography>
                      <Typography
                        variant="p3"
                        className={cx("cart-drawer__item-variant")}
                      >
                        {node.merchandise.title !== "Default Title"
                          ? node.merchandise.title
                          : ""}
                      </Typography>
                      <Typography
                        variant="p2"
                        fontWeight={600}
                        className={cx("cart-drawer__item-price")}
                      >
                        {formatCurrency(
                          parseFloat(node.merchandise.price.amount)
                        )}
                      </Typography>
                    </div>
                    <div className={cx("cart-drawer__item-quantity")}>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(node.id, node.quantity - 1)
                        }
                        className={cx("cart-drawer__quantity-btn")}
                        aria-label="Disminuir cantidad"
                      >
                        -
                      </button>
                      <span className={cx("cart-drawer__quantity-value")}>
                        {node.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(node.id, node.quantity + 1)
                        }
                        className={cx("cart-drawer__quantity-btn")}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(node.id)}
                      className={cx("cart-drawer__remove-btn")}
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className={cx("cart-drawer__footer")}>
                <div className={cx("cart-drawer__subtotal")}>
                  <Typography variant="p2" fontWeight={500}>
                    Subtotal:
                  </Typography>
                  <Typography variant="p2" fontWeight={600}>
                    {formatCurrency(subtotal)}
                  </Typography>
                </div>
                <Typography
                  variant="p3"
                  // className={cx("cart-drawer__tax-note")}
                >
                  Impuestos y gastos de envío calculados al finalizar la compra
                </Typography>

                <div className={cx("cart-drawer__actions")}>
                  <a
                    href={cart.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx("cart-drawer__checkout-link")}
                  >
                    <Button variant="primary" fullWidth>
                      Finalizar Compra
                    </Button>
                  </a>
                  <Button variant="secondary" onClick={closeCart} fullWidth>
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={cx("cart-drawer__empty")}>
              <ShoppingCart
                size={44}
                className={cx("cart-drawer__empty-icon")}
              />
              <Typography variant="p1" fontWeight={600}>
                Tu carrito está vacío
              </Typography>
              <Typography
                variant="p2"
                className={cx("cart-drawer__empty-message")}
              >
                Parece que aún no has agregado productos a tu carrito
              </Typography>
              <Button
                variant="primary"
                onClick={handleExploreProducts}
                className={cx("cart-drawer__shop-btn")}
                fullWidth
              >
                Explorar Productos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
