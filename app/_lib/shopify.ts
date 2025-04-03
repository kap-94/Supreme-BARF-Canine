// app/_lib/shopify.ts
import { GraphQLClient } from "graphql-request";

// Types
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }>;
  };
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  estimatedCost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string; handle: string };
          image: { url: string; altText: string };
          price: { amount: string; currencyCode: string };
        };
      };
    }>;
  };
  totalQuantity: number;
}

// Response types for GraphQL operations
interface CreateCartResponse {
  cartCreate: {
    cart: ShopifyCart;
  };
}

interface GetCartResponse {
  cart: ShopifyCart;
}

interface AddToCartResponse {
  cartLinesAdd: {
    cart: ShopifyCart;
  };
}

interface UpdateCartItemResponse {
  cartLinesUpdate: {
    cart: ShopifyCart;
  };
}

interface RemoveCartItemResponse {
  cartLinesRemove: {
    cart: ShopifyCart;
  };
}

interface GetProductByHandleResponse {
  product: ShopifyProduct;
}

// Create a storefront API client
// Usando variables de entorno privadas (solo servidor)
// En un componente de servidor o en server actions, estas variables estarán disponibles
const domain = process.env.SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

const storefrontApiVersion = "2023-10"; // Update to the latest version

const endpoint = `https://${domain}/api/${storefrontApiVersion}/graphql.json`;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    "Content-Type": "application/json",
  },
});

// Cart operations
export async function createCart(): Promise<ShopifyCart> {
  const mutation = `
    mutation createCart {
      cartCreate {
        cart {
          id
          checkoutUrl
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
      }
    }
  `;

  const response = await graphQLClient.request<CreateCartResponse>(mutation);
  return response.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
    }
  `;

  try {
    const response = await graphQLClient.request<GetCartResponse>(query, {
      cartId,
    });
    return response.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function addToCart(
  cartId: string,
  lines: CartItem[]
): Promise<ShopifyCart> {
  const mutation = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
      }
    }
  `;

  const response = await graphQLClient.request<AddToCartResponse>(mutation, {
    cartId,
    lines: lines.map((line) => ({
      merchandiseId: line.id,
      quantity: line.quantity,
    })),
  });

  return response.cartLinesAdd.cart;
}

export async function updateCartItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = `
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
      }
    }
  `;

  const response = await graphQLClient.request<UpdateCartItemResponse>(
    mutation,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  return response.cartLinesUpdate.cart;
}

export async function removeCartItem(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const mutation = `
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
      }
    }
  `;

  const response = await graphQLClient.request<RemoveCartItemResponse>(
    mutation,
    {
      cartId,
      lineIds,
    }
  );

  return response.cartLinesRemove.cart;
}

// Product queries
export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        variants(first: 250) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphQLClient.request<GetProductByHandleResponse>(
      query,
      { handle }
    );
    return response.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getFirstVariantIdByProductHandle(
  handle: string
): Promise<string | null> {
  const product = await getProductByHandle(handle);

  if (!product || product.variants.edges.length === 0) {
    return null;
  }

  return product.variants.edges[0].node.id;
}
