// FoodCalculator.tsx
import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { SectionHeader, DogForm } from "@/app/_components";
import styles from "./FoodCalculator.module.scss";

const cx = classNames.bind(styles);

const FoodCalculator: React.FC = () => {
  return (
    <section id="food-calculator-section" className={cx("food-calculator")}>
      <div className={cx("food-calculator__hero")}>
        <div className={cx("food-calculator__bg-wrapper")}>
          <Image
            src="/dog-illustration.svg"
            alt="Dog illustration"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className={cx("food-calculator__bg-image")}
          />
        </div>
        <div className={cx("food-calculator__hero-content")}>
          <SectionHeader
            color="white"
            title="Calcula la Ración Ideal"
            subtitle=" Obtén la medida exacta de alimento según la edad, peso y actividad
            de tu perro"
          />
        </div>
      </div>

      <div className={cx("food-calculator__content")}>
        <div className={cx("food-calculator__form-container")}>
          <DogForm />
        </div>
      </div>
    </section>
  );
};

export default FoodCalculator;
