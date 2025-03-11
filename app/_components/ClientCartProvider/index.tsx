// app/_components/ClientCartProvider/ClientCartProvider.tsx
"use client";

import React from "react";
import { CartProvider } from "@/app/_context/CartContext";

export const ClientCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CartProvider>{children}</CartProvider>;
};

export default ClientCartProvider;
