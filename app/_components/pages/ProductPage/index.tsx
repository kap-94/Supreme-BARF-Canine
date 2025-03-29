"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "@/app/_components";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectFade,
  Thumbs,
  Zoom,
} from "swiper/modules";
import { debounce } from "lodash";
import classNames from "classnames/bind";
import NutritionalChart from "@/app/_components/NutritionalChart";
import SpecificationsGrid from "@/app/_components/SpecificationsGrid";
import ProductVariantLoader from "@/app/_components/ProductVariantLoader/ProductVariantLoader";
import ProductReviewsSection from "@/app/_components/ProductReviews";
import RelatedProducts from "@/app/_components/RelatedProducts";
import styles from "./ProductPage.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/zoom";

const cx = classNames.bind(styles);

interface ProductPageProps {
  productData: {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    discountedPrice?: string;
    description: string[];
    benefits: string[];
    images: Array<{
      url: string;
      alt: string;
    }>;
    productHandle: string;
    storeUrl: string;
    isSubscription: boolean;
    subscriptionBadge?: string;
    subscriptionDetails?: string;
    packageDiscount?: string;
    packageDetails?: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ productData }) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "nutrition"
  >("description");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Detectar si es un paquete de múltiples bolsas
  const isMultiPack = useMemo(() => {
    return productData.packageDiscount !== undefined;
  }, [productData.packageDiscount]);

  const handleScroll = useCallback(() => {
    const element = tabContentRef.current;
    if (!element) return;

    const atBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 2;

    setIsAtBottom(atBottom);
  }, []);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 100),
    [handleScroll]
  );

  useEffect(() => {
    const element = tabContentRef.current;
    if (!element) return;

    element.addEventListener("scroll", debouncedHandleScroll, {
      passive: true,
    });
    handleScroll();

    return () => {
      debouncedHandleScroll.cancel();
      element?.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [activeTab, debouncedHandleScroll, handleScroll]);

  // Shipping info data
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

  // Render tab content based on active tab
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "description":
        return (
          <div className={cx("product-page__description")}>
            <div className={cx("product-page__description-text")}>
              {productData.description.map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="p2"
                  fontWeight={500}
                  className={cx("product-page__paragraph")}
                >
                  {paragraph}
                </Typography>
              ))}

              {productData.isSubscription &&
                productData.subscriptionDetails && (
                  <div className={cx("product-page__subscription-info")}>
                    <Typography
                      variant="p3"
                      fontWeight={600}
                      className={cx("product-page__subscription-note")}
                    >
                      {productData.subscriptionDetails}
                    </Typography>
                  </div>
                )}

              {productData.packageDetails && (
                <div className={cx("product-page__package-info")}>
                  <Typography
                    variant="p3"
                    fontWeight={600}
                    className={cx("product-page__package-note")}
                  >
                    {productData.packageDetails}
                  </Typography>
                </div>
              )}
            </div>

            <div className={cx("product-page__benefits")}>
              <Typography
                variant="p3"
                className={cx("product-page__benefits-title")}
              >
                Beneficios
              </Typography>
              <ul className={cx("product-page__benefits-list")}>
                {productData.benefits.map((benefit, index) => (
                  <li key={index} className={cx("product-page__benefit-item")}>
                    <span className={cx("product-page__benefit-icon")}>✓</span>
                    <Typography
                      variant="p2"
                      className={cx("product-page__benefit-text")}
                    >
                      {benefit}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "specifications":
        return <SpecificationsGrid />;
      case "nutrition":
        return <NutritionalChart />;
      default:
        return null;
    }
  }, [activeTab, productData]);

  // Main swiper configuration
  const mainSwiperConfig = useMemo(
    () => ({
      modules: [Navigation, Pagination, EffectFade, Thumbs, Zoom],
      effect: "fade" as const,
      slidesPerView: 1,
      navigation: true,
      loop: true,
      zoom: true,
      thumbs: {
        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      },
      pagination: {
        clickable: true,
        type: "bullets" as const,
      },
    }),
    [thumbsSwiper]
  );

  // Thumbs swiper configuration
  const thumbsSwiperConfig = useMemo(
    () => ({
      modules: [Navigation],
      slidesPerView: 3,
      spaceBetween: 10,
      watchSlidesProgress: true,
      navigation: false,
    }),
    []
  );

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    {
      label: productData.title,
      href: `/productos/${productData.productHandle}`,
      current: true,
    },
  ];

  const getButtonText = () => {
    if (isMultiPack) {
      return "Comprar Paquete";
    }
    if (!productData.isSubscription) {
      return "Agregar al Carrito";
    }
    return productData.title === "Plan Anual"
      ? "Suscribirme al Plan Anual"
      : "Suscribirme Mensualmente";
  };

  return (
    <main className={cx("product-page")}>
      <div className={cx("product-page__container")}>
        <div className={cx("product-page__breadcrumbs")}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className={cx("product-page__content")}>
          <div className={cx("product-page__gallery-section")}>
            <div className={cx("product-page__gallery")}>
              {/* Badge para paquetes con descuento */}
              {productData.packageDiscount && (
                <div className={cx("product-page__badge")}>
                  <Typography
                    variant="p3"
                    fontWeight={600}
                    className={cx("product-page__badge-text")}
                  >
                    {productData.packageDiscount}
                  </Typography>
                </div>
              )}

              {/* Badge para suscripciones (legacy) */}
              {productData.isSubscription &&
                productData.subscriptionBadge &&
                !productData.packageDiscount && (
                  <div className={cx("product-page__badge")}>
                    <Typography
                      variant="p3"
                      fontWeight={600}
                      className={cx("product-page__badge-text")}
                    >
                      {productData.subscriptionBadge}
                    </Typography>
                  </div>
                )}

              <Swiper
                {...mainSwiperConfig}
                className={cx("product-page__main-swiper")}
              >
                {productData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className={cx("product-page__zoom-container")}>
                      <div className={cx("swiper-zoom-container")}>
                        <div className={cx("product-page__image-wrapper")}>
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={cx("product-page__image")}
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={cx("product-page__thumbs-container")}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  {...thumbsSwiperConfig}
                  className={cx("product-page__thumbs-swiper")}
                >
                  {productData.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className={cx("product-page__thumb-wrapper")}>
                        <Image
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 60px, 80px"
                          className={cx("product-page__thumb")}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className={cx("product-page__details-section")}>
            <div className={cx("product-page__header")}>
              <Typography variant="h2" className={cx("product-page__title")}>
                {productData.title}
              </Typography>
              <Typography
                variant="p2"
                color="black"
                fontWeight={400}
                className={cx("product-page__subtitle")}
              >
                {productData.subtitle}
              </Typography>
            </div>

            <div className={cx("product-page__price-container")}>
              {productData.discountedPrice ? (
                <>
                  <Typography
                    variant="p2"
                    className={cx("product-page__original-price")}
                  >
                    {productData.price}
                  </Typography>
                  <Typography
                    variant="h3"
                    className={cx("product-page__discounted-price")}
                  >
                    {productData.discountedPrice}
                  </Typography>
                </>
              ) : (
                <Typography variant="h3" className={cx("product-page__price")}>
                  {productData.price}
                </Typography>
              )}
            </div>

            <div className={cx("product-page__tabs")}>
              {[
                { id: "description", label: "Descripción" },
                { id: "specifications", label: "Especificaciones" },
                { id: "nutrition", label: "Nutrición" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={cx("product-page__tab", {
                    "product-page__tab--active": activeTab === tab.id,
                  })}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  <Typography
                    variant="p3"
                    fontWeight={600}
                    className={cx("product-page__tab-text")}
                  >
                    {tab.label}
                  </Typography>
                </button>
              ))}
            </div>

            <div className={cx("product-page__tab-content-wrapper")}>
              <div
                ref={tabContentRef}
                className={cx("product-page__tab-content")}
              >
                {tabContent}
              </div>
              <div
                className={cx("product-page__fade-overlay")}
                data-visible={!isAtBottom}
                aria-hidden="true"
              />
            </div>

            <div className={cx("product-page__shipping-summary")}>
              <div className={cx("product-page__shipping-item")}>
                <span className={cx("product-page__shipping-icon")}>🚚</span>
                <Typography
                  variant="p3"
                  className={cx("product-page__shipping-text")}
                >
                  Envío gratis en Puebla capital
                </Typography>
              </div>
              <div className={cx("product-page__shipping-item")}>
                <span className={cx("product-page__shipping-icon")}>⏱️</span>
                <Typography
                  variant="p3"
                  className={cx("product-page__shipping-text")}
                >
                  Entrega en 1-2 días hábiles
                </Typography>
              </div>
            </div>

            <div className={cx("product-page__cta")}>
              <ProductVariantLoader
                productHandle={productData.productHandle}
                className={cx("product-page__add-to-cart")}
                isMultiPack={isMultiPack}
                fallbackButton={
                  <a
                    href={productData.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "100%" }}
                  >
                    <Button
                      variant="primary"
                      className={cx("product-page__button")}
                      icon={{ source: "lucide", name: "shoppingCart" }}
                    >
                      {getButtonText()}
                    </Button>
                  </a>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nueva sección de reseñas fuera de las tabs */}
      <ProductReviewsSection productId={productData.id} />

      {/* Sección de productos relacionados */}
      <section className={cx("product-page__related-section")}>
        <RelatedProducts currentProductId={productData.id} />
      </section>
    </main>
  );
};

export default ProductPage;
