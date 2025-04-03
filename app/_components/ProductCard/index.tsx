"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/app/_components";
import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";

const cx = classNames.bind(styles);

interface ProductCardProps {
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
  withHover?: boolean;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  subtitle,
  shortDescription,
  price,
  discountedPrice,
  image,
  imageAlt,
  slug,
  isSubscription,
  badge,
  withHover = true,
  compact = false,
}) => {
  return (
    <div
      className={cx("featured-product-card", {
        "featured-product-card--with-hover": withHover,
        "featured-product-card--compact": compact,
        "featured-product-card--subscription": isSubscription,
      })}
    >
      <div className={cx("featured-product-card__image-container")}>
        <Link href={`/productos/${slug}`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cx("featured-product-card__image")}
          />
        </Link>

        {badge && (
          <div className={cx("featured-product-card__badge")}>
            <Typography
              variant="p3"
              fontWeight={700}
              className={cx("featured-product-card__badge-text")}
            >
              {badge}
            </Typography>
          </div>
        )}
      </div>

      <div className={cx("featured-product-card__content")}>
        <div className={cx("featured-product-card__header")}>
          <Typography
            variant="p3"
            className={cx("featured-product-card__title")}
          >
            {title}
          </Typography>

          {!compact && subtitle && (
            <Typography
              variant="p3"
              className={cx("featured-product-card__subtitle")}
            >
              {subtitle}
            </Typography>
          )}
        </div>

        {!compact && (
          <Link
            href={`/productos/${slug}`}
            className={cx("featured-product-card__description")}
          >
            {shortDescription}
          </Link>
        )}

        <div className={cx("featured-product-card__price-container")}>
          {discountedPrice ? (
            <>
              <Typography
                variant="p3"
                className={cx("featured-product-card__original-price")}
              >
                {price}
              </Typography>
              <Typography
                variant="p2"
                fontWeight={700}
                className={cx("featured-product-card__discounted-price")}
              >
                {discountedPrice}
              </Typography>
            </>
          ) : (
            <Typography
              variant="p2"
              fontWeight={700}
              className={cx("featured-product-card__price")}
            >
              {price}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
