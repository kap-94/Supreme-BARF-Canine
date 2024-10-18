import React from "react";
import classNames from "classnames/bind";
import heroDog from "@/public/dog.png";
import heroMeat from "@/public/meat.png";
import styles from "./Hero.module.scss";
import Image from "next/image";
import { Typography, Icon } from "../../_components";
import Button from "../../_components/Button";

const cx = classNames.bind(styles);

const Hero: React.FC = () => {
  return (
    <section id="hero" className={cx("hero")}>
      <div className={cx("hero__content")}>
        <div className={cx("hero__text")}>
          <Typography variant="h5" className={cx("hero__eyebrow")}>
            SUPREME BARF CANINE
            {/* SUPREME BARF CANINE */}
          </Typography>
          <Typography
            variant="h1"
            // textTransform="uppercase"
            className={cx("hero__title")}
          >
            ALIMENTO PARA PERROS FELICES
            {/* La Opción Saludable en Comida para Perros */}
          </Typography>
          <Typography variant="p1" className={cx("hero__paragraph")}>
            Dile adiós a las croquetas y comienza a darle a tu perro un alimento
            de verdad.
          </Typography>

          {/* Contenedor de beneficios con íconos */}
          <div className={cx("hero__benefits")}>
            {/* Primera línea con ícono */}
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

            {/* Segunda línea con ícono */}
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
          </div>

          {/* Botón */}
          <Button
            variant="accent"
            elevation={2}
            size="large"
            className={cx("hero__button")}
            icon="right-arrow"
          >
            Haz tu pedido
          </Button>
        </div>

        {/* Contenedor de las imágenes */}
        <div className={cx("hero__images")}>
          {/* Imagen secundaria (heroMeat) */}
          <div className={cx("hero__image", "hero__image--secondary")}>
            <Image
              src={heroMeat}
              fill
              className={cx("hero__meat")}
              alt="Carne fresca para perros"
            />
          </div>
          {/* Imagen primaria (heroDog) */}
          <div className={cx("hero__image", "hero__image--primary")}>
            <Image
              src={heroDog}
              fill
              className={cx("hero__dog")}
              alt="Perro alimentado con BARF"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
