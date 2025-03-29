import React, { Suspense } from "react";
import type { Metadata } from "next";
import ProductGrid, { ProductItem } from "@/app/_components/ProductGrid";
import { getProductsData, ProductData } from "@/app/_lib/productsData";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import classNames from "classnames/bind";
import styles from "./ProductsPage.module.scss";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title:
    "Productos | Supreme BARF Canine: Comida Natural y Dieta BARF para Perros",
  description:
    "Explora nuestra gama de productos para tu perro. Elige entre diversas recetas y presentaciones de dieta BARF y comida natural, cuidadosamente elaboradas para la salud de tu mascota.",
  keywords: [
    "Supreme BARF Canine",
    "productos BARF",
    "comida natural para perros",
    "dieta BARF",
    "alimentación canina",
    "nutrición canina",
    "BARF México",
  ],
};

const breadcrumbItems = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos", current: true },
];

async function ProductsPageContent() {
  const data: ProductData[] = await getProductsData();
  const mappedProducts: ProductItem[] = data.map((product) => ({
    id: product.id,
    title: product.title,
    subtitle: product.subtitle,
    shortDescription: product.description.join(" ").substring(0, 100) + "...",
    price: product.price,
    discountedPrice: product.discountedPrice,
    image: product.images[0]?.url || "",
    imageAlt: product.images[0]?.alt || "",
    slug: product.productHandle,
    isSubscription: product.isSubscription,
    badge: product.packageDiscount || product.subscriptionBadge,
  }));

  return (
    <div className={cx("container")}>
      <Breadcrumbs items={breadcrumbItems} />
      <ProductGrid
        products={mappedProducts}
        title="Nuestros productos"
        subtitle="Descubre la mejor nutrición para tu mascota"
        align="left"
        variant="grid"
        isLoading={false}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className={cx("container")}>
          <Breadcrumbs items={breadcrumbItems} />
          <ProductGrid
            products={[]}
            title="Nuestros productos"
            subtitle="Descubre la mejor nutrición para tu mascota"
            align="left"
            variant="grid"
            isLoading={true}
          />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
