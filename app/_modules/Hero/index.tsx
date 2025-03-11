"use client";

import classNames from "classnames/bind";
import { Button, Typography } from "@/app/_components";
import { ScrollButton } from "@/app/_components/ScrollButton";
import heroDog from "@/public/dog-2.png";
import Image from "next/image";
import styles from "./Hero.module.scss";

const cx = classNames.bind(styles);

const Hero = () => {
  const handleProductScroll = (): void => {
    document
      .getElementById("product-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const handleCalculatorScroll = (): void => {
    document
      .getElementById("food-calculator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={cx("hero")}>
      <div className={cx("hero__content")}>
        <div className={cx("hero__text")}>
          <div className={cx("hero__eyebrow-container")}>
            <Typography variant="h5" className={cx("hero__eyebrow")}>
              SUPREME BARF CANINE
            </Typography>
          </div>
          <Typography variant="h1" className={cx("hero__title")}>
            Alimento natural para el bienestar de tu perro
          </Typography>
          <Typography
            variant="p1"
            fontWeight={400}
            className={cx("hero__paragraph")}
          >
            Dile adiós a las croquetas y comienza a darle a tu perro un alimento
            100% natural, ideal para todas las edades y razas, con entrega a
            domicilio.
            {/* Dile adiós a las croquetas y dale a tu perro un alimento 100%
            natural, para todas las edades y razas. */}
          </Typography>

          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              variant="accent"
              elevation={1}
              size="large"
              onClick={handleProductScroll}
              className={cx("hero__button")}
            >
              Comprar Ahora
            </Button>
            <Button
              variant="secondary"
              elevation={1}
              size="large"
              onClick={handleCalculatorScroll}
              className={cx("hero__button")}
            >
              Ver Más
            </Button>
          </div>
        </div>

        <div className={cx("hero__image")}>
          <Image
            src={heroDog}
            alt="Perro saludable"
            className={cx("hero__dog")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
