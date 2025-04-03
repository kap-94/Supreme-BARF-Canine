import React from "react";
import { Metadata } from "next";
import ProductPage from "@/app/_components/pages/ProductPage";
import { getProductsData, ProductData } from "@/app/_lib/productsData";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProductData(slug: string): Promise<ProductData> {
  const products = await getProductsData();
  const product = products.find((p) => p.productHandle === slug);
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return product;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductData(slug);

  return {
    title: product.metaTitle || "Producto | Supreme BARF Canine",
    description:
      product.metaDescription ||
      "Descubre los detalles de este producto de alimentación BARF y comida natural para perros.",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = params;
  const productData = await getProductData(slug);

  return <ProductPage productData={productData} />;
}
