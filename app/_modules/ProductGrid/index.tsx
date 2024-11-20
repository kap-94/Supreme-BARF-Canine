"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Button, SectionHeader, Typography } from "@/app/_components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import styles from "./ProductGrid.module.scss";

// Importar estilos de Swiper
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

interface ProductSpec {
  label: string;
  value: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  customAnchorId = "product-section",
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "shipping"
  >("description");

  const productImages = [
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
  ];

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
      details: "En compras superiores a $299",
      time: "Solo área metropolitana",
    },
  ];

  useEffect(() => {
    const tabContent = document.querySelector(
      `.${cx("product-grid__tab-content")}`
    );

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      const isAtBottom =
        Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) <
        1;

      target.setAttribute("data-scroll", isAtBottom ? "bottom" : "not-bottom");
    };

    if (tabContent) {
      tabContent.addEventListener("scroll", handleScroll);
      // Trigger inicial
      handleScroll({ target: tabContent } as unknown as Event);
    }

    return () => {
      if (tabContent) {
        tabContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeTab]);

  return (
    <section className={cx("product-grid")} id={customAnchorId}>
      <SectionHeader
        title="Nuestro Producto"
        subtitle="La mejor comida natural para el bienestar de tu mascota"
        align="center"
        className={cx("product-grid__header")}
      />

      <div className={cx("product-grid__content")}>
        <div className={cx("product-grid__gallery")}>
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            speed={800}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className={cx("product-grid__swiper")}
          >
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
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>

        <div className={cx("product-grid__info")}>
          <div className={cx("product-grid__info-header")}>
            <Typography variant="h4" className={cx("product-grid__title")}>
              Supreme BARF - Fórmula Premium
            </Typography>
            <Typography variant="h5" className={cx("product-grid__subtitle")}>
              Alimento Natural para Perros - 1.25 kg
            </Typography>
          </div>

          <div className={cx("product-grid__tabs")}>
            <button
              className={cx("product-grid__tab", {
                "product-grid__tab--active": activeTab === "description",
              })}
              onClick={() => setActiveTab("description")}
            >
              <Typography variant="p3" color="black" fontWeight={500}>
                Descripción
              </Typography>
            </button>
            <button
              className={cx("product-grid__tab", {
                "product-grid__tab--active": activeTab === "specs",
              })}
              onClick={() => setActiveTab("specs")}
            >
              <Typography variant="p3" color="black" fontWeight={500}>
                Especificaciones
              </Typography>
            </button>
            <button
              className={cx("product-grid__tab", {
                "product-grid__tab--active": activeTab === "shipping",
              })}
              onClick={() => setActiveTab("shipping")}
            >
              <Typography variant="p3" color="black" fontWeight={500}>
                Envío y Entrega
              </Typography>
            </button>
          </div>

          <div className={cx("product-grid__tab-content")}>
            {activeTab === "description" && (
              <div className={cx("product-grid__description")}>
                <Typography variant="p2" className={cx("product-grid__text")}>
                  Supreme BARF destaca por su formulación premium elaborada con
                  ingredientes de calidad de consumo humano, incluyendo huesos
                  carnosos de pollo perfectamente molidos, combinados con
                  órganos selectos como hígado, molleja y corazón de pollo. Esta
                  exclusiva mezcla se complementa con harina de maíz, zanahoria,
                  manzana y aceite de salmón, garantizando una nutrición
                  completa para tu mascota.
                </Typography>

                <Typography variant="p2" className={cx("product-grid__text")}>
                  Desarrollado por expertos veterinarios e ingenieros
                  especializados en nutrición canina, este alimento natural
                  proporciona proteínas de alta calidad con todos los
                  aminoácidos esenciales y ácidos grasos Omega-3 y 6. Su fórmula
                  científicamente balanceada fortalece el sistema inmunológico,
                  mejora la salud de la piel y el pelaje, favorece la digestión
                  y contribuye al mantenimiento de articulaciones fuertes,
                  asegurando el bienestar integral de tu perro.
                </Typography>
              </div>
            )}

            {activeTab === "specs" && (
              <div className={cx("product-grid__specs")}>
                <ProductSpecs />
              </div>
            )}

            {activeTab === "shipping" && (
              <div className={cx("product-grid__shipping-info")}>
                {shippingInfo.map((info, index) => (
                  <div
                    key={index}
                    className={cx("product-grid__shipping-item")}
                  >
                    <div className={cx("product-grid__shipping-header")}>
                      <Typography variant="p2" fontWeight={600}>
                        {info.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        fontWeight={500}
                        className={cx("product-grid__shipping-time")}
                      >
                        {info.time}
                      </Typography>
                    </div>
                    <Typography
                      variant="p2"
                      className={cx("product-grid__shipping-details")}
                    >
                      {info.details}
                    </Typography>
                  </div>
                ))}
                <Typography
                  variant="p3"
                  color="black"
                  className={cx("product-grid__shipping-note")}
                >
                  * Por el momento solo realizamos entregas en Puebla y su zona
                  metropolitana. Los tiempos de entrega pueden variar según la
                  ubicación y disponibilidad.
                </Typography>
              </div>
            )}

            {/* {activeTab === "shipping" && (
              <div className={cx("product-grid__shipping-info")}>
                {shippingInfo.map((info, index) => (
                  <div
                    key={index}
                    className={cx("product-grid__shipping-item")}
                  >
                    <div className={cx("product-grid__shipping-header")}>
                      <Typography variant="p2" fontWeight={700}>
                        {info.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        fontWeight={500}
                        className={cx("product-grid__shipping-time")}
                      >
                        {info.time}
                      </Typography>
                    </div>
                    <Typography
                      variant="p2"
                      className={cx("product-grid__shipping-details")}
                    >
                      {info.details}
                    </Typography>
                  </div>
                ))}
                <Typography
                  variant="p3"
                  color="black"
                  className={cx("product-grid__shipping-note")}
                >
                  * Los tiempos de entrega pueden variar según la ubicación y
                  disponibilidad.
                </Typography>
              </div>
            )} */}
          </div>

          <div className={cx("product-grid__cta")}>
            <Button
              href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas"
              variant="link-dark"
              target="_blank"
              icon="right-arrow"
              className={cx("product-grid__button")}
            >
              Comprar Ahora
            </Button>
            {/* <Typography variant="p2" className={cx("product-grid__shipping")}>
              Envío gratuito en pedidos superiores a $999
            </Typography> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
