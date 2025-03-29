"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // <-- Importa Link
import { motion } from "framer-motion";
import { Typography } from "@/app/_components";
import classNames from "classnames/bind";
import styles from "./FeaturedProductCard.module.scss";

const cx = classNames.bind(styles);

export interface ProductCardProps {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  price: string;
  discountedPrice?: string;
  image: string;
  imageAlt: string;
  slug: string;
  isSubscription?: boolean;
  badge?: string; // Por ejemplo, "30" para mostrar "30%"
}

export const FeaturedProductCard: React.FC<ProductCardProps> = ({
  id,
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
}) => {
  return (
    <Link
      href={`/productos/${slug}`}
      className={cx("featured-product-card-link")} // Clase para estilos del <Link>
    >
      <motion.div
        className={cx("featured-product-card", {
          "featured-product-card--subscription": isSubscription,
        })}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className={cx("featured-product-card__image-container")}>
          <div className={cx("featured-product-card__image-wrapper")}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className={cx("featured-product-card__image")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          {/* Si existe 'badge', lo mostramos */}
          {badge && (
            <div className={cx("featured-product-card__badge")}>
              <Typography
                variant="p3"
                fontWeight={600}
                className={cx("featured-product-card__badge-text")}
              >
                {badge}%
              </Typography>
            </div>
          )}
        </div>

        {/* Contenido (title, subtitle, etc.) */}
        <div className={cx("featured-product-card__content")}>
          <div className={cx("featured-product-card__header")}>
            <Typography
              variant="p1"
              fontWeight={600}
              className={cx("featured-product-card__title")}
            >
              {title}
            </Typography>
            <Typography
              variant="p3"
              color="black"
              className={cx("featured-product-card__subtitle")}
            >
              {subtitle}
            </Typography>
          </div>

          <Typography
            variant="p2"
            className={cx("featured-product-card__description")}
          >
            {shortDescription}
          </Typography>

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
                  variant="p3"
                  className={cx("featured-product-card__discounted-price")}
                >
                  {discountedPrice}
                </Typography>
              </>
            ) : (
              <Typography
                variant="p3"
                className={cx("featured-product-card__price")}
              >
                {price}
              </Typography>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default FeaturedProductCard;
