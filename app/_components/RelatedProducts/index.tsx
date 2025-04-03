"use client";

import React, { useEffect, useState, useMemo } from "react";
import { SectionHeader } from "@/app/_components";
import ProductCard from "@/app/_components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getProductsData, ProductData } from "@/app/_lib/productsData";
import classNames from "classnames/bind";
import styles from "./RelatedProducts.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cx = classNames.bind(styles);

interface RelatedProductsProps {
  currentProductId: string;
}

// Interfaz para los productos formateados como los necesita ProductCard
interface FormattedProduct {
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

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
}) => {
  const [products, setProducts] = useState<FormattedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProductsData();

        // Convertir los productos al formato que necesita ProductCard
        const formattedProducts: FormattedProduct[] = productsData.map(
          (product) => ({
            id: product.id,
            title: product.title,
            subtitle: product.subtitle,
            shortDescription: product.description[0].substring(0, 100) + "...",
            price: product.price,
            discountedPrice: product.discountedPrice,
            image: product.images[0].url,
            imageAlt: product.images[0].alt,
            slug: product.productHandle,
            isSubscription: product.isSubscription,
            badge: product.packageDiscount || product.subscriptionBadge,
          })
        );

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error al cargar productos relacionados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar para excluir el producto actual
  const relatedProducts = useMemo(() => {
    return products.filter((product) => product.id !== currentProductId);
  }, [products, currentProductId]);

  const swiperConfig = {
    modules: [Navigation, Pagination],
    slidesPerView: "auto" as const,
    spaceBetween: 24,
    navigation: true,
    pagination: { clickable: true },
    watchOverflow: true,
  };

  if (loading) {
    return (
      <div className={cx("related-products")}>
        <SectionHeader
          title="Productos relacionados"
          subtitle="Cargando..."
          align="left"
          className={cx("related-products__header")}
        />
        <div className={cx("related-products__container")}>
          {/* Aquí podrías añadir un skeleton si lo deseas */}
        </div>
      </div>
    );
  }

  // Si no hay productos relacionados, no mostrar la sección
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={cx("related-products")}>
      <SectionHeader
        title="Productos relacionados"
        subtitle="Descubre más opciones para el bienestar de tu mascota"
        align="left"
        className={cx("related-products__header")}
      />

      <div className={cx("related-products__container")}>
        <Swiper {...swiperConfig} className={cx("related-products__swiper")}>
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} withHover={false} compact={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
