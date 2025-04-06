"use client";

import React from "react";
import { SectionHeader } from "@/app/_components";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";
import classNames from "classnames/bind";
import styles from "./ProductGrid.module.scss";
import Link from "next/link";

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
  calculatorUrl?: string;
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
  calculatorUrl = "/#food-calculator-section",
}) => {
  return (
    <section className={cx("product-grid", className)} id={customAnchorId}>
      <div className={cx("product-grid__inner-wrapper")}>
        <div className={cx("product-grid__header-container")}>
          {(title || subtitle) && (
            <SectionHeader
              title={title || ""}
              subtitle={subtitle || ""}
              align={align}
              className={cx("product-grid__header")}
            />
          )}

          <div className={cx("product-grid__calculator-link")}>
            <Link href={calculatorUrl} className={cx("calculator-link")}>
              <span className={cx("calculator-icon")}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3334 1.33325H2.66671C1.93033 1.33325 1.33337 1.93021 1.33337 2.66659V13.3333C1.33337 14.0696 1.93033 14.6666 2.66671 14.6666H13.3334C14.0698 14.6666 14.6667 14.0696 14.6667 13.3333V2.66659C14.6667 1.93021 14.0698 1.33325 13.3334 1.33325Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 4H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 8H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                ¿Quiere saber la cantidad de alimento? Use nuestra calculadora
              </span>
            </Link>
          </div>
        </div>

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
