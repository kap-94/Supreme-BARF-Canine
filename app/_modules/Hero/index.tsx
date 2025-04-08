"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import { Button, Typography } from "@/app/_components";
import CreativeImageGrid from "@/app/_components/CreativeImageGrid";
import { ShieldCheck } from "lucide-react";
// import novakEating from "@/public/hero-gallery-novak.gif";
import novakEating from "@/public/novak.gif";
import dogEatingImage from "@/public/hero-gallery-dog-eating.jpg";
import dogInGrassImage from "@/public/hero-gallery-dog-grass.png";
import bulldogImage from "@/public/hero-gallery-bulldog.jpg";
import dogWithWomanImage from "@/public/hero-gallery-women-with-dog.jpg";
import styles from "./Hero.module.scss";

const cx = classNames.bind(styles);

const Hero = () => {
  const router = useRouter();

  const handleProductNavigation = (): void => {
    router.push("/productos");
  };

  const handleAboutNavigation = (): void => {
    router.push("/acerca-del-alimento");
  };

  return (
    <section id="hero" className={cx("hero")}>
      <div className={cx("hero__content")}>
        <div className={cx("hero__text")}>
          <Typography
            variant="p3"
            fontWeight={900}
            textTransform="uppercase"
            className={cx("hero__eyebrow")}
          >
            Supreme Barf Canine
          </Typography>
          <Typography
            variant="h1"
            fontWeight={900}
            className={cx("hero__title")}
          >
            Alimento natural para el bienestar de tu perro
          </Typography>
          <Typography
            variant="p1"
            fontWeight={500}
            className={cx("hero__paragraph")}
          >
            Dile adiós a las croquetas y comienza a darle a tu perro un alimento
            100% natural y delicioso, apto para todas las edades y razas.
          </Typography>

          <div className={cx("hero__buttons")}>
            <Button
              variant="accent"
              elevation={1}
              size="large"
              onClick={handleProductNavigation}
              className={cx("hero__button")}
            >
              Comprar Ahora
            </Button>
            <Button
              variant="secondary"
              elevation={1}
              size="large"
              onClick={handleAboutNavigation}
              className={cx("hero__button")}
            >
              Descubre Más
            </Button>
          </div>

          <div className={cx("hero__features")}>
            <div className={cx("hero__feature")}>
              <ShieldCheck />
              <Typography variant="p3" fontWeight={500}>
                Creado por expertos en nutrición canina
              </Typography>
            </div>
          </div>
        </div>

        <CreativeImageGrid
          variant="scattered"
          className={cx("hero__gallery")}
          animate={false}
          maxImages={5}
        >
          <Image
            alt="Dog eating a portion of supreme barf canine natural dog food"
            className={cx("hero__image", "hero__image--first")}
            fill
            src={novakEating}
            unoptimized
            sizes="(max-width: 768px) 100%, 33.333%"
          />
          <Image
            alt="Cute dog profile"
            className={cx("hero__image")}
            src={dogEatingImage}
            fill
            // style={{ opacity: 0.9 }}
            // placeholder="blur"
            sizes="(max-width: 768px) 100%, 33.333%"
          />

          <Image
            alt="Cute dog"
            className={cx("hero__image")}
            style={{ opacity: 0.9 }}
            fill
            // placeholder="blur"
            src={dogInGrassImage}
            sizes="(max-width: 768px) 100%, 33.333%"
          />
          <Image
            alt="Cute dog profile"
            className={cx("hero__image")}
            src={bulldogImage}
            fill
            // placeholder="blur"
            sizes="(max-width: 768px) 100%, 33.333%"
          />
          <Image
            src={dogWithWomanImage}
            alt="Cute dog close-up"
            className={cx("hero__image")}
            fill
            // placeholder="blur"
            sizes="(max-width: 768px) 100%, 33.333%"
          />
        </CreativeImageGrid>
      </div>
    </section>
  );
};

export default Hero;
