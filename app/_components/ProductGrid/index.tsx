"use client";

import React from "react";
import { SectionHeader } from "@/app/_components";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";
import classNames from "classnames/bind";
import styles from "./ProductGrid.module.scss";

const cx = classNames.bind(styles);

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  price: string;
  discountedPrice?: string;
  image: string;
  imageAlt: string;
  slug: string;
  isSubscription: boolean;
  badge?: string;
}

interface ProductGridProps {
  products: ProductItem[];
  title?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  variant?: "grid" | "slider";
  withHover?: boolean;
  customAnchorId?: string;
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  align = "left",
  className,
  variant = "grid",
  withHover = true,
  customAnchorId,
  isLoading = false,
}) => {
  return (
    <section className={cx("product-grid", className)} id={customAnchorId}>
      <div className={cx("product-grid__inner-wrapper")}>
        {(title || subtitle) && (
          <SectionHeader
            title={title || ""}
            subtitle={subtitle || ""}
            align={align}
            className={cx("product-grid__header")}
          />
        )}

        <div
          className={cx("product-grid__row", {
            "product-grid__row--slider": variant === "slider",
          })}
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  withHover={withHover}
                  compact={variant === "slider"}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
