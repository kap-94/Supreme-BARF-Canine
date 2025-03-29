"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Button, SectionHeader, Typography } from "@/app/_components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import ProductSpecs from "./components/ProductSpecs";
import ProductVariantLoader from "@/app/_components/ProductVariantLoader/ProductVariantLoader";
import styles from "./ProductGrid.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const cx = classNames.bind(styles);

interface ProductGridProps {
  customAnchorId?: string;
}

interface ProductData {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  images: Array<{
    url: string;
    alt: string;
  }>;
  productHandle: string;
  buttonText: string;
  buttonLink: string;
  isSubscription?: boolean;
  subscriptionDetails?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  customAnchorId = "product-section",
}) => {
  // Products data
  const products: ProductData[] = useMemo(
    () => [
      {
        id: "single-product",
        title: "Bolsa de Alimento Natural",
        subtitle: "Fórmula BARF Veterinaria - 1.25 kg",
        description: [
          "Supreme BARF Canine destaca por su formulación premium elaborada con ingredientes de calidad de consumo humano, incluyendo huesos carnosos de pollo perfectamente molidos, hígados, molleja y corazón de pollo. Esta exclusiva mezcla se complementa con harina de maíz, zanahoria, manzana y aceite de salmón, garantizando una nutrición completa para tu mascota.",
          "Desarrollado por expertos veterinarios e ingenieros especializados en nutrición canina, este alimento natural proporciona proteínas de alta calidad con todos los aminoácidos esenciales y ácidos grasos Omega-3 y 6. Su fórmula científicamente balanceada fortalece el sistema inmunológico, mejora la salud de la piel y el pelaje, favorece la digestión y contribuye al mantenimiento de articulaciones fuertes, asegurando el bienestar integral de tu perro.",
        ],
        images: [
          {
            url: "/products.jpeg",
            alt: "Varios paquetes de producto - Supreme BARF",
          },
          {
            url: "/product.jpeg",
            alt: "Vista frontal del producto - Supreme BARF",
          },
          {
            url: "/novak-and-food.jpeg",
            alt: "Perro viendo al producto - Supreme BARF",
          },
        ],
        productHandle: "formula-de-pollo-perro-adulto-todas-las-razas",
        buttonText: "Ver en Tienda",
        buttonLink:
          "https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas",
      },
      {
        id: "subscription-product",
        title: "Suscripción Mensual",
        subtitle: "Envío mensual automático - 1.25 kg",
        description: [
          "Nunca te quedes sin alimento para tu mascota. Nuestra suscripción mensual de Supreme BARF Canine te garantiza entregas puntuales en la puerta de tu casa, asegurando que tu perro siempre reciba la nutrición premium que merece.",
          "Aprovecha un 10% de descuento en cada entrega mensual, sin compromiso de permanencia. Puedes pausar, modificar o cancelar tu suscripción en cualquier momento. La comodidad de recibir automáticamente el alimento premium para tu mascota, sin preocupaciones ni visitas a la tienda.",
        ],
        images: [
          {
            url: "/product.jpeg",
            alt: "Vista frontal del producto - Supreme BARF",
          },
          {
            url: "/products.jpeg",
            alt: "Varios paquetes de producto - Supreme BARF",
          },
          {
            url: "/novak-and-food.jpeg",
            alt: "Perro viendo al producto - Supreme BARF",
          },
        ],
        productHandle: "formula-de-pollo-perro-adulto-suscripcion",
        buttonText: "Suscribirme",
        buttonLink:
          "https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-suscripcion",
        isSubscription: true,
        subscriptionDetails: "Entrega mensual automática con 10% de descuento",
      },
    ],
    []
  );

  // Shipping info
  const shippingInfo = useMemo(
    () => [
      {
        title: "Envío Local",
        details: "Entrega a domicilio en Puebla capital",
        time: "1-2 días hábiles",
      },
      {
        title: "Zonas de Cobertura",
        details: "Puebla y zona metropolitana",
        time: "Consulta disponibilidad",
      },
      {
        title: "Envío Gratuito",
        details:
          "Dependiendo del lugar de entrega podríamos solicítar un pedido mínimo",
        time: "Solo área metropolitana",
      },
    ],
    []
  );

  // Swiper configuration
  const swiperConfig = useMemo(
    () => ({
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      effect: "fade" as const,
      slidesPerView: 1,
      navigation: true,
      loop: true,
      pagination: {
        clickable: true,
        type: "bullets" as const,
      },
    }),
    []
  );

  return (
    <section className={cx("product-grid")} id={customAnchorId}>
      <SectionHeader
        title="Productos Destacados"
        subtitle="La mejor comida natural para el bienestar de tu mascota"
        align="center"
        className={cx("product-grid__header")}
      />

      <div className={cx("product-grid__cards-container")}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            shippingInfo={shippingInfo}
            swiperConfig={swiperConfig}
          />
        ))}
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: ProductData;
  shippingInfo: Array<{
    title: string;
    details: string;
    time: string;
  }>;
  swiperConfig: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  shippingInfo,
  swiperConfig,
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "shipping"
  >("description");
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (!element) return;

    const atBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 2;

    setIsAtBottom(atBottom);
  }, []);

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "description":
        return (
          <div className={cx("product-grid__description")}>
            {product.description.map((paragraph, idx) => (
              <Typography
                key={idx}
                variant="p2"
                fontWeight={500}
                className={cx("product-grid__text")}
              >
                {paragraph}
              </Typography>
            ))}
            {product.isSubscription && (
              <Typography
                variant="p3"
                fontWeight={600}
                className={cx("product-grid__subscription-note")}
              >
                {product.subscriptionDetails}
              </Typography>
            )}
          </div>
        );
      case "specs":
        return <ProductSpecs />;
      case "shipping":
        return (
          <div className={cx("product-grid__shipping-info")}>
            {shippingInfo.map((info, index) => (
              <div key={index} className={cx("product-grid__shipping-item")}>
                <div className={cx("product-grid__shipping-header")}>
                  <Typography
                    variant="p2"
                    fontWeight={600}
                    className={cx("product-grid__shipping-title")}
                  >
                    {info.title}
                  </Typography>
                  <Typography
                    variant="p2"
                    fontWeight={600}
                    className={cx("product-grid__shipping-time")}
                  >
                    {info.time}
                  </Typography>
                </div>
                <Typography
                  variant="p2"
                  fontWeight={500}
                  className={cx("product-grid__shipping-details")}
                >
                  {info.details}
                </Typography>
              </div>
            ))}
            <Typography
              variant="p3"
              color="black"
              fontWeight={600}
              className={cx("product-grid__shipping-note")}
            >
              * Por el momento solo realizamos entregas en Puebla y su zona
              metropolitana. Los tiempos de entrega pueden variar según la
              ubicación y disponibilidad.
            </Typography>
          </div>
        );
      default:
        return null;
    }
  }, [activeTab, product, shippingInfo]);

  return (
    <div
      className={cx("product-grid__card", {
        "product-grid__card--subscription": product.isSubscription,
      })}
    >
      <div className={cx("product-grid__gallery")}>
        <Swiper {...swiperConfig} className={cx("product-grid__swiper")}>
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className={cx("product-grid__image-wrapper")}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className={cx("product-grid__image")}
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" />
        </Swiper>

        {product.isSubscription && (
          <div className={cx("product-grid__subscription-badge")}>
            <Typography variant="p3" fontWeight={600}>
              10% DESCUENTO
            </Typography>
          </div>
        )}
      </div>

      <div className={cx("product-grid__info")}>
        <div className={cx("product-grid__info-header")}>
          <Typography variant="h4" className={cx("product-grid__title")}>
            {product.title}
          </Typography>
          <Typography
            variant="p3"
            color="black"
            fontWeight={400}
            className={cx("product-grid__subtitle")}
          >
            {product.subtitle}
          </Typography>
        </div>

        <div className={cx("product-grid__tabs")}>
          {[
            { id: "description", label: "Descripción" },
            { id: "specs", label: "Especificaciones" },
            { id: "shipping", label: "Envío y Entrega" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={cx("product-grid__tab", {
                "product-grid__tab--active": activeTab === tab.id,
              })}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              <Typography
                variant="p3"
                fontWeight={600}
                className={cx("product-grid__tab-text")}
              >
                {tab.label}
              </Typography>
            </button>
          ))}
        </div>

        <div className={cx("product-grid__tab-content-wrapper")}>
          <div
            className={cx("product-grid__tab-content")}
            onScroll={handleScroll}
          >
            {renderTabContent}
          </div>
          <div
            className={cx("product-grid__fade-overlay")}
            data-visible={!isAtBottom}
            aria-hidden="true"
          />
        </div>

        <div className={cx("product-grid__cta")}>
          <ProductVariantLoader
            productHandle={product.productHandle}
            className={cx("product-grid__add-to-cart")}
            fallbackButton={
              <a
                href={product.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "fit-content" }}
              >
                <Button
                  variant="primary"
                  className={cx("product-grid__button")}
                  icon={{ source: "lucide", name: "arrowRight" }}
                >
                  {product.buttonText}
                </Button>
              </a>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
