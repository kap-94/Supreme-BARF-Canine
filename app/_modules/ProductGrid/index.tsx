"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Button, SectionHeader, Typography } from "@/app/_components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { debounce } from "lodash";
import styles from "./ProductGrid.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import ProductSpecs from "./components/ProductSpecs";

const cx = classNames.bind(styles);

interface ProductGridProps {
  customAnchorId?: string;
}

const productImages = [
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
] as const;

const shippingInfo = [
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
    // details: "En compras superiores a $299",
    details:
      "Dependiendo del lugar de entrega podríamos solicítar un pedido mínimo",
    time: "Solo área metropolitana",
  },
] as const;

const ProductGrid: React.FC<ProductGridProps> = ({
  customAnchorId = "product-section",
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "shipping"
  >("description");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const element = tabContentRef.current;
    if (!element) return;

    const atBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 2;

    setIsAtBottom((prevState) => {
      if (prevState !== atBottom) {
        return atBottom;
      }
      return prevState;
    });
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
  }, [activeTab, debouncedHandleScroll]);

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "description":
        return (
          <div className={cx("product-grid__description")}>
            <Typography
              variant="p2"
              fontWeight={500}
              className={cx("product-grid__text")}
            >
              Supreme BARF Canine destaca por su formulación premium elaborada
              con ingredientes de calidad de consumo humano, incluyendo huesos
              carnosos de pollo perfectamente molidos, hígados, molleja y
              corazón de pollo. Esta exclusiva mezcla se complementa con harina
              de maíz, zanahoria, manzana y aceite de salmón, garantizando una
              nutrición completa para tu mascota.
            </Typography>

            <Typography
              variant="p2"
              fontWeight={500}
              className={cx("product-grid__text")}
            >
              Desarrollado por expertos veterinarios e ingenieros especializados
              en nutrición canina, este alimento natural proporciona proteínas
              de alta calidad con todos los aminoácidos esenciales y ácidos
              grasos Omega-3 y 6. Su fórmula científicamente balanceada
              fortalece el sistema inmunológico, mejora la salud de la piel y el
              pelaje, favorece la digestión y contribuye al mantenimiento de
              articulaciones fuertes, asegurando el bienestar integral de tu
              perro.
            </Typography>
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
    }
  }, [activeTab]);

  const swiperConfig = useMemo(
    () => ({
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      effect: "fade" as const,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      pagination: {
        clickable: true,
        el: ".swiper-pagination",
        type: "bullets" as const,
      },
    }),
    []
  );

  return (
    <section className={cx("product-grid")} id={customAnchorId}>
      <SectionHeader
        title="Producto"
        subtitle="La mejor comida natural para el bienestar de tu mascota"
        align="center"
        className={cx("product-grid__header")}
      />

      <div className={cx("product-grid__content")}>
        <div className={cx("product-grid__gallery")}>
          <Swiper {...swiperConfig} className={cx("product-grid__swiper")}>
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className={cx("product-grid__image-wrapper")}>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: index === 2 ? "cover" : "contain" }}
                    className={cx("product-grid__image")}
                  />
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="swiper-button-prev" />
            <div className="swiper-button-next" /> */}
            <div className="swiper-pagination" />
          </Swiper>
        </div>

        <div className={cx("product-grid__info")}>
          <div className={cx("product-grid__info-header")}>
            <Typography variant="h4" className={cx("product-grid__title")}>
              Alimento Natural Premium
            </Typography>
            <Typography
              variant="p3"
              color="black"
              fontWeight={400}
              className={cx("product-grid__subtitle")}
            >
              Fórmula BARF Veterinaria - 1.25 kg
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
              ref={tabContentRef}
              className={cx("product-grid__tab-content")}
            >
              {tabContent}
            </div>
            <div
              className={cx("product-grid__fade-overlay")}
              data-visible={!isAtBottom}
              aria-hidden="true"
            />
          </div>

          <div className={cx("product-grid__cta")}>
            <a
              href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "fit-content" }}
            >
              <Button
                // href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas"
                variant="primary"
                // target="_blank"
                className={cx("product-grid__button")}
                icon={{ source: "lucide", name: "arrowRight" }}
              >
                Comprar Ahora
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ProductGrid);
