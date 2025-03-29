"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ShopifyCart, CartItem } from "@/app/_lib/shopify";
import {
  createCart,
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "@/app/_actions/shopify-actions";

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  setCart: (cart: ShopifyCart) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_STORAGE_KEY = "shopify_cart_id";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize or fetch cart on component mount
  useEffect(() => {
    const initializeCart = async () => {
      let storedCartId = null;

      // Use try-catch to handle localStorage issues in SSR or private browsing
      try {
        storedCartId = localStorage.getItem(CART_ID_STORAGE_KEY);
      } catch (error) {
        console.warn("Unable to access localStorage:", error);
      }

      if (storedCartId) {
        const existingCart = await getCart(storedCartId);

        if (existingCart) {
          setCart(existingCart);
          setIsLoading(false);
          return;
        }
      }

      // Create new cart if no existing cart was found
      try {
        const newCart = await createCart();
        setCart(newCart);

        try {
          localStorage.setItem(CART_ID_STORAGE_KEY, newCart.id);
        } catch (error) {
          console.warn("Unable to save cart ID to localStorage:", error);
        }
      } catch (error) {
        console.error("Error creating cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const addItem = async (variantId: string, quantity: number) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await addToCart(cart.id, [
        { id: variantId, quantity },
      ]);
      setCart(updatedCart);
      openCart(); // Open cart drawer after adding an item
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await updateCartItem(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await removeCartItem(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cart,
    isLoading,
    isCartOpen,
    openCart,
    closeCart,
    addItem,
    updateItem,
    removeItem,
    setCart, // Exponemos setCart para poder actualizarlo desde componentes
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
