import React from "react";
import classNames from "classnames/bind";
import { ProductCard, SectionHeader } from "@/app/_components";

import styles from "./ProductGrid.module.scss";

const cx = classNames.bind(styles);

interface ProductGridProps {
  customAnchorId?: string;
}

const productCardsPayload = [
  {
    eyebrow: "Nuevo lanzamiento",
    title: "Paquete de 1 kg",
    excerpt:
      "Tiene características impresionantes que pueden mejorar tu vida de muchas maneras.",
    button: {
      url: "/product.png",
      title: "Ver más",
      target: "_self",
    },
    image: {
      url: "/product.png",
      alt: "Imagen del Producto 1",
    },
  },
  {
    eyebrow: "Oferta especial",
    title: "Subscripción Mensual",
    excerpt:
      "Descubre las grandes ventajas del Producto 2. Calidad y precio inigualables.",
    button: {
      url: "/productos/producto-2",
      title: "Comprar ahora",
      target: "_self",
    },
    image: {
      url: "/product-group.png",
      alt: "Imagen del Producto 2",
    },
  },
];

const ProductGrid: React.FC<ProductGridProps> = ({
  customAnchorId = "product-grid",
}) => {
  return (
    <section className={cx("product-grid")} id={customAnchorId}>
      <SectionHeader
        title="Nuestros Productos"
        subtitle="La Mejor Comida Natural para el Bienestar de tu Mascota"
        align="center"
        className={cx("product-grid__header")}
      />

      <div className={cx("product-grid__background")}></div>

      <div className={cx("product-grid__cards")}>
        {productCardsPayload
          .filter((_, idx) => idx < 2)
          .map((item, idx) => (
            <ProductCard
              key={item.title}
              image={item.image}
              button={item.button}
              excerpt={item.excerpt}
              title={item.title}
              eyebrow={item.eyebrow}
              className={idx === 0 ? cx("product-grid__first-product") : ""}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductGrid;
