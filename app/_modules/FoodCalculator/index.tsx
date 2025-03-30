"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { DogForm, SectionHeader } from "@/app/_components";
import Typography from "@/app/_components/Typography";
import dogImage from "@/public/food-calculator-dog.jpg";
import styles from "./FoodCalculator.module.scss";

const cx = classNames.bind(styles);

const FoodCalculator: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section id="food-calculator-section" className={cx("food-calculator")}>
      <div className={cx("food-calculator__container")}>
        <div className={cx("food-calculator__form-wrapper")}>
          <div className={cx("food-calculator__form-heading")}>
            <SectionHeader
              title="Calcula la ración ideal"
              subtitle="Ingresa los datos para obtener la medida exacta"
              align="center"
            />

            <div
              className={cx("food-calculator__info-icon")}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span>i</span>
              {showTooltip && (
                <div className={cx("food-calculator__tooltip")}>
                  <Typography variant="p3">
                    Nuestra calculadora está basada en estándares veterinarios y
                    nutricionales para garantizar una alimentación óptima para
                    tu mascota.
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className={cx("food-calculator__form")}>
            <DogForm stepperVariant="minimal" />
          </div>
        </div>

        <div className={cx("food-calculator__image-wrapper")}>
          <Image
            alt="Dog waiting to eat"
            className={cx("food-calculator__image")}
            fill
            src={dogImage}
            sizes="(max-width: 992px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FoodCalculator;
