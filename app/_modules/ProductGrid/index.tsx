// "use client";
// import React, { useRef } from "react";
import classNames from "classnames/bind";
import {
  Button,
  ProductCard,
  SectionHeader,
  Typography,
} from "@/app/_components";
import styles from "./ProductGrid.module.scss";
// import useAnimations from "@/app/_hooks/useAnimations";

const cx = classNames.bind(styles);

interface ProductGridProps {
  customAnchorId?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  customAnchorId = "product-section",
}) => {
  // const headingRef = useRef<HTMLDivElement>(null);

  // useAnimations([
  //   {
  //     ref: headingRef,
  //     type: "fadeInUp",
  //     options: {
  //       duration: 1.2,
  //       ease: "power2.out",
  //     },
  //   },
  // ]);

  return (
    <section className={cx("product-grid")} id={customAnchorId}>
      <SectionHeader
        // ref={headingRef}
        title="Nuestros Productos"
        subtitle="La mejor comida natural para el bienestar de tu mascota"
        align="center"
        className={cx("product-grid__header")}
      />

      <div className={cx("product-grid__background")}></div>

      <div className={cx("product-grid__content")}>
        <div className={cx("product-grid__card")}>
          <ProductCard
            image={{ url: "/product.png", alt: "Imagen del Producto" }}
            // button={{ url: "/product.png", title: "Ver más", target: "_self" }}
            // title="Paquete de 1 kg"
            // excerpt="Tiene características impresionantes que pueden mejorar tu vida de muchas maneras."
            // eyebrow="Nuevo lanzamiento"
          />
        </div>

        {/* Lado derecho con la descripción del producto */}
        <div className={cx("product-grid__description")}>
          <Typography variant="h4" className={cx("product-grid__title")}>
            Paquete de 1.25 kg - Alimento natural para perros
          </Typography>

          {/* Primer bloque de descripción */}
          <div className={cx("product-grid__excerpt-block")}>
            <Typography
              variant="p1"
              fontWeight={700}
              className={cx("product-grid__title-section")}
            >
              Ingredientes de calidad premium
            </Typography>
            <Typography
              variant="p2"
              fontWeight={500}
              className={cx("product-grid__excerpt")}
            >
              Carne de pollo, vísceras y vegetales 100% naturales. Sin
              conservantes ni aditivos.
            </Typography>
          </div>

          {/* Segundo bloque de descripción */}
          <div className={cx("product-grid__excerpt-block")}>
            <Typography
              variant="p1"
              fontWeight={700}
              className={cx("product-grid__title-section")}
            >
              Nutrientes esenciales
            </Typography>
            <Typography
              variant="p2"
              fontWeight={500}
              className={cx("product-grid__excerpt")}
            >
              Rico en proteínas y ácidos grasos Omega-3 y 6. Favorece la
              digestión, fortalece el sistema inmunológico y ayuda a mantener
              una piel sana y articulaciones fuertes.
            </Typography>
          </div>

          {/* Tercer bloque de descripción */}
          <div className={cx("product-grid__excerpt-block")}>
            <Typography
              variant="p1"
              fontWeight={700}
              className={cx("product-grid__title-section")}
            >
              Aprobado por veterinarios
            </Typography>
            <Typography
              variant="p2"
              fontWeight={500}
              className={cx("product-grid__excerpt")}
            >
              Desarrollado en colaboración con expertos en nutrición animal para
              garantizar una dieta balanceada y saludable, recomendada por
              veterinarios.
            </Typography>
          </div>

          <Button
            href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas"
            variant="link-dark"
            target="_blank"
            icon="right-arrow"
            className={cx("product-grid__button")}
          >
            Compra y ahorra
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
