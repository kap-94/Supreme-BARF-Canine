// app/_actions/shopify-actions.ts
"use server";

import {
  CartItem,
  ShopifyCart,
  ShopifyProduct,
  createCart as createShopifyCart,
  getCart as getShopifyCart,
  addToCart as addItemToShopifyCart,
  updateCartItem as updateShopifyCartItem,
  removeCartItem as removeShopifyCartItem,
  getProductByHandle,
  getFirstVariantIdByProductHandle,
} from "@/app/_lib/shopify";

/**
 * Estas server actions exponen las funciones de Shopify API,
 * permitiendo que los componentes cliente las utilicen de forma segura
 * manteniendo las credenciales de API solo en el servidor.
 */

export async function createCart(): Promise<ShopifyCart> {
  return await createShopifyCart();
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  return await getShopifyCart(cartId);
}

export async function addToCart(
  cartId: string,
  lines: CartItem[]
): Promise<ShopifyCart> {
  return await addItemToShopifyCart(cartId, lines);
}

export async function updateCartItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  return await updateShopifyCartItem(cartId, lineId, quantity);
}

export async function removeCartItem(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  return await removeShopifyCartItem(cartId, lineIds);
}

export async function getProductVariantByHandle(
  handle: string
): Promise<string | null> {
  return await getFirstVariantIdByProductHandle(handle);
}

export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  return await getProductByHandle(handle);
}
