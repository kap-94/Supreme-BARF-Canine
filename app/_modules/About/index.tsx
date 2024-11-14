import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Typography, Button } from "@/app/_components";
import aboutImage from "@/public/about-image.png";
import styles from "./About.module.scss";

const cx = classNames.bind(styles);

const About: React.FC = () => {
  return (
    <section id="about-section" className={cx("about")}>
      <div className={cx("about__content")}>
        {/* Lado izquierdo con los textos */}
        <div className={cx("about__text")}>
          <Typography
            variant="h3"
            color="white"
            className={cx("about__text--top")}
          >
            Supreme BARF Canine es un alimento diseñado por amantes de perros
            para amantes de perros.
          </Typography>

          <div className={cx("about__text--bottom")}>
            <Button
              variant="link-light"
              icon="right-arrow"
              target="_blank"
              href="https://supremebarfcanine.shop/"
            >
              Visita la tienda
            </Button>

            <Typography variant="p1" color="white">
              Con ingredientes naturales, ofrece a tu perro beneficios que las
              croquetas no pueden brindar.
            </Typography>
          </div>
        </div>

        {/* Lado derecho con la imagen */}
        <div className={cx("about__image")}>
          <Image
            src={aboutImage}
            alt="Cute dog"
            className={cx("about__dog")}
            fill
            placeholder="blur"
            sizes="(max-width: 1348px) 100vw, (max-width: 1440px) 50vw, 720px"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
