import React, { Suspense } from "react";
import ProductGrid, { ProductItem } from "@/app/_components/ProductGrid";
import { getProductsData, ProductData } from "@/app/_lib/productsData";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import SectionHeader from "@/app/_components/SectionHeader";
import ProductCardSkeleton from "@/app/_components/ProductCardSkeleton";
import classNames from "classnames/bind";
import styles from "./FeaturedProducts.module.scss";

const cx = classNames.bind(styles);

// Componente asíncrono que obtiene la data y renderiza el grid de productos
async function FeaturedProductsContent() {
  const data: ProductData[] = await getProductsData();
  // Por ejemplo, tomamos los primeros 3 productos como destacados
  const featured = data.slice(0, 3);

  const mappedProducts: ProductItem[] = featured.map((product) => ({
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
    <ProductGrid
      products={mappedProducts}
      // title=""
      title="Productos destacados"
      subtitle=""
      align="left"
      customAnchorId="featured-products"
      variant="grid"
      isLoading={false}
    />
  );
}

export default async function FeaturedProducts() {
  return (
    <div className={cx("container")}>
      {/* <SectionHeader
        // subtitle="La mejor comida natural para el bienestar de tu mascota"
        align="left"
        className={cx("featured-products__header")}
        /> */}
      <Suspense
        fallback={
          <div className={cx("featured-products")}>
            <ProductGrid
              products={[]}
              title="Productos destacados"
              subtitle=""
              align="left"
              variant="grid"
              isLoading={true}
            />
          </div>
        }
      >
        <div className={cx("featured-products")}>
          <FeaturedProductsContent />
        </div>
      </Suspense>
    </div>
  );
}
