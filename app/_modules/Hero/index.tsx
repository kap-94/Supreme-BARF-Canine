// "use client";
// import React, { useEffect, useRef } from "react";
import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Typography, Button, Icon } from "../../_components";
import heroDog from "@/public/dog.png";
import heroMeat from "@/public/meat.png";
import heroDogFood from "@/public/dog-food.png";
import styles from "./Hero.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cx = classNames.bind(styles);

const Hero: React.FC = () => {
  // const dogImageRef = useRef<HTMLDivElement>(null);
  // const dogFoodImageRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // Asegurar que no haya movimiento inicial hasta que el usuario haga scroll
  //   gsap.set([dogImageRef.current, dogFoodImageRef.current], { yPercent: 0 });

  //   // Parallax para hero__dog (movimiento hacia abajo)
  //   gsap.to(dogImageRef.current, {
  //     yPercent: 20, // Mueve hacia abajo
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: "#hero",
  //       start: "top bottom", // Comienza cuando el usuario comienza a ver la sección
  //       end: "bottom top",
  //       scrub: true,
  //       immediateRender: false, // Evita que afecte la posición inicial
  //       pinSpacing: false, // Asegura que no se reposicione en la carga
  //       once: true, // Evita que la animación se repita en la carga
  //     },
  //   });

  //   // Parallax para hero__dog-food (movimiento hacia arriba)
  //   gsap.to(dogFoodImageRef.current, {
  //     yPercent: -20, // Mueve hacia arriba
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: "#hero",
  //       start: "top bottom", // Comienza cuando el usuario comienza a ver la sección
  //       end: "bottom top",
  //       scrub: true,
  //       immediateRender: false, // Evita que afecte la posición inicial
  //       pinSpacing: false, // Asegura que no se reposicione en la carga
  //       once: true, // Evita que la animación se repita en la carga
  //     },
  //   });
  // }, []);

  return (
    <section id="hero" className={cx("hero")}>
      <div className={cx("hero__content")}>
        <div className={cx("hero__text")}>
          <Typography variant="h5" className={cx("hero__eyebrow")}>
            SUPREME BARF CANINE
          </Typography>
          <Typography variant="h1" className={cx("hero__title")}>
            ALIMENTO PARA PERROS FELICES
          </Typography>
          <Typography variant="p1" className={cx("hero__paragraph")}>
            Dile adiós a las croquetas y comienza a darle a tu perro un alimento
            de verdad.
          </Typography>

          <div className={cx("hero__benefits")}>
            <div className={cx("hero__benefit-item")}>
              <Icon
                icon="check-large"
                width={24}
                height={24}
                className={cx("hero__benefit-icon")}
                color="primary"
              />
              <Typography
                variant="p1"
                fontWeight={600}
                className={cx("hero__benefit-text")}
              >
                Para todas las edades y razas.
              </Typography>
            </div>
            <div className={cx("hero__benefit-item")}>
              <Icon
                icon="check-large"
                width={24}
                height={24}
                className={cx("hero__benefit-icon")}
                color="primary"
              />
              <Typography
                variant="p1"
                fontWeight={600}
                className={cx("hero__benefit-text")}
              >
                Alimento 100% natural.
              </Typography>
            </div>
            <div className={cx("hero__benefit-item")}>
              <Icon
                icon="check-large"
                width={24}
                height={24}
                className={cx("hero__benefit-icon")}
                color="primary"
              />
              <Typography
                variant="p1"
                fontWeight={600}
                className={cx("hero__benefit-text")}
              >
                Entrega a domicilio sin costo.
              </Typography>
            </div>
          </div>

          <a
            href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="accent"
              elevation={2}
              size="large"
              className={cx("hero__button")}
              icon="right-arrow"
            >
              Haz tu pedido
            </Button>
          </a>
        </div>

        <div className={cx("hero__images")}>
          <div className={cx("hero__image", "hero__image--secondary")}>
            <Image
              src={heroMeat}
              fill
              className={cx("hero__meat")}
              alt="Carne fresca para perros"
            />
          </div>
          <div
            className={cx("hero__image", "hero__image--primary")}
            // ref={dogImageRef}
          >
            <Image
              src={heroDog}
              fill
              className={cx("hero__dog")}
              alt="Perro alimentado con BARF"
            />
          </div>
          <div
            className={cx("hero__image", "hero__image--tertiary")}
            // ref={dogFoodImageRef}
          >
            <Image
              src={heroDogFood}
              fill
              className={cx("hero__food")}
              alt="Plato de alimento para perro"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
