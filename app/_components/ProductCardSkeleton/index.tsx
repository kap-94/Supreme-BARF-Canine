"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductCardSkeleton.module.scss";

const cx = classNames.bind(styles);

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={cx("product-card-skeleton")}>
      <div className={cx("product-card-skeleton__image")}></div>
      <div className={cx("product-card-skeleton__content")}>
        <div className={cx("product-card-skeleton__title")}></div>
        <div className={cx("product-card-skeleton__subtitle")}></div>
        <div className={cx("product-card-skeleton__price-container")}>
          <div className={cx("product-card-skeleton__price")}></div>
          <div className={cx("product-card-skeleton__discounted-price")}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
