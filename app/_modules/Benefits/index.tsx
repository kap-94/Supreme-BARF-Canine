import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { CardListContainer, Typography } from "@/app/_components";
import benefitsImage from "@/public/benefits-image.png";
import styles from "./Benefits.module.scss";

const cx = classNames.bind(styles);

const benefitsData = [
  {
    title: "Nutrición equilibrada para tu perro",
    description:
      "Supreme BARF Canine es una dieta basada en alimentos crudos, cuidadosamente seleccionados para brindarle a tu perro una nutrición equilibrada y completa.",
  },
  {
    title: "Ingredientes 100% naturales",
    description:
      "Compuesto de una mezcla de carnes magras, vegetales frescos y superalimentos como el aceite de salmón y semillas de chía.",
  },
  {
    title: "Salud digestiva, inmunológica y dermatológica",
    description:
      "Nuestro producto está diseñado para mejorar su digestión, fortalecer su sistema inmunológico y mantener su piel y pelaje saludables.",
  },
];

const Benefits: React.FC = () => {
  return (
    <section id="benefits-section" className={cx("benefits")}>
      <div className={cx("benefits__content")}>
        {/* Lado izquierdo con la imagen */}
        <div className={cx("benefits__image")}>
          <Image
            src={benefitsImage}
            alt="Descripción de la imagen"
            fill
            placeholder="blur"
            className={cx("benefits__dog")}
          />
        </div>

        <div className={cx("benefits__list")}>
          <Typography variant="h3">Beneficios</Typography>
          {/* Lado derecho con los textos */}
          <CardListContainer orientation="vertical" itemIndicator="circle">
            {benefitsData.map((benefit, index) => (
              <div key={index} className={cx("benefits__item")}>
                <Typography variant="h4" className={cx("benefits__item--top")}>
                  <span className={cx("benefits__item-number")}>{`${
                    index + 1
                  }. `}</span>
                  {benefit.title}
                </Typography>
                <Typography
                  variant="p2"
                  className={cx("benefits__item--bottom")}
                >
                  {benefit.description}
                </Typography>
              </div>
            ))}
          </CardListContainer>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
