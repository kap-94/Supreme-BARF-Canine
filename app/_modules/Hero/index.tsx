import { Typography, Button } from "../../_components";
import { Dog, Truck, UtensilsCrossed } from "lucide-react";
import { HeroParallaxImages } from "./HeroParallaxImages";
import heroDog from "@/public/dog.png";
import heroMeat from "@/public/meat.png";
import heroDogFood from "@/public/dog-food.png";
import styles from "./Hero.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Hero = () => {
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
          <Typography variant="p1" className={cx("hero__paragraph")}>
            Dile adiós a las croquetas y comienza a darle a tu perro un alimento
            de verdad.
          </Typography>

          <div className={cx("hero__benefits")}>
            <div className={cx("hero__benefit-item")}>
              <Dog
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
                className={cx("hero__benefit-icon")}
              />
              <Typography variant="p1" className={cx("hero__benefit-text")}>
                Para todas las edades y razas.
              </Typography>
            </div>
            <div className={cx("hero__benefit-item")}>
              <UtensilsCrossed
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
                className={cx("hero__benefit-icon")}
              />
              <Typography variant="p1" className={cx("hero__benefit-text")}>
                Alimento 100% natural.
              </Typography>
            </div>
            <div
              className={cx(
                "hero__benefit-item",
                "hero__benefit-item--delivery"
              )}
            >
              <Truck
                className={cx("hero__benefit-icon")}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
              />
              <Typography variant="p1" className={cx("hero__benefit-text")}>
                Entrega a domicilio sin costo
              </Typography>
            </div>
          </div>

          <a
            href="https://supremebarfcanine.shop/products/formula-de-pollo-perro-adulto-todas-las-razas"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: "fit-content" }}
          >
            <Button
              variant="accent"
              elevation={2}
              size="large"
              className={cx("hero__button")}
              icon={{ source: "lucide", name: "arrowRight" }}
            >
              Haz tu pedido
            </Button>
          </a>
        </div>

        <HeroParallaxImages
          dogImage={heroDog}
          meatImage={heroMeat}
          foodImage={heroDogFood}
        />
      </div>
    </section>
  );
};

export default Hero;
