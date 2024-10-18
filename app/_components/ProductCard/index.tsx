import React, { FC } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Button, Typography } from "@/app/_components";
import styles from "./ProductCard.module.scss";

const cx = classNames.bind(styles);

interface ProductCardProps {
  eyebrow: string;
  title: string;
  excerpt: string;
  button: { url: string; target: string; title: string };
  image: { url: string; alt: string };
  fontColor?: string;
}

const ProductCard: FC<ProductCardProps> = ({
  eyebrow,
  title,
  excerpt,
  button,
  image,
  fontColor = "#2c2929",
}) => {
  return (
    <div className={cx("product-card")}>
      {/* Header con imagen y overlay */}
      <div className={cx("product-card__header")}>
        <div className={cx("product-card__image")}>
          <Image
            src={image.url}
            alt={image.alt}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={cx("product-card__overlay")} />

        <div className={cx("product-card__textbox")}>
          {/* <Typography variant="h5" className={cx("product-card__eyebrow")}>
            {eyebrow}
          </Typography> */}
          <Typography
            variant="h4"
            fontWeight={700}
            className={cx("product-card__title")}
          >
            {title}
          </Typography>
        </div>
      </div>

      {/* Body con excerpt */}
      <div className={cx("product-card__body")}>
        <Typography
          variant="p1"
          className={cx("product-card__excerpt")}
          style={{ color: fontColor }}
        >
          {excerpt}
        </Typography>
      </div>

      {/* Footer con botón */}
      <div className={cx("product-card__footer")}>
        {/* <Button
          variant="link-dark"
          icon="right-arrow"
          size="large"
          className={cx("product-card__button")}
        >
          Order
        </Button> */}

        <Button variant="link-dark" icon="right-arrow" href="/">
          Comprar y ahorra
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
