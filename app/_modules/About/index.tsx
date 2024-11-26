import Image from "next/image";
import { AnimatedText, Button, Typography } from "@/app/_components";
import aboutImage from "@/public/about-image.jpg";
import classNames from "classnames/bind";
import styles from "./About.module.scss";

const cx = classNames.bind(styles);

const About = () => {
  return (
    <section id="about-section" className={cx("about")}>
      <div className={cx("about__content")}>
        <div className={cx("about__text")}>
          <div className={cx("about__text--top")}>
            <AnimatedText
              text="Supreme BARF Canine es un alimento diseñado por amantes de perros para amantes de perros."
              variant="h3"
              color="white"
              animationType="words"
            />
          </div>

          <div className={cx("about__text--bottom")}>
            <Button
              variant="link-light"
              icon="right-arrow"
              target="_blank"
              href="https://supremebarfcanine.shop/"
            >
              Visita la tienda
            </Button>

            <AnimatedText
              text="Alimento natural de calidad humana con nutrientes esenciales que ofrece beneficios únicos."
              variant="p1"
              color="white"
              animationType="block"
            />
          </div>
        </div>

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
