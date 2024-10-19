// FoodCalculator.tsx
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { SectionHeader, DogForm } from "@/app/_components";
import dogIllustrationPrimary from "@/public/dog-illustration-primary.svg";
import dogIllustrationSecondary from "@/public/dog-illustration-secondary.svg";
import styles from "./FoodCalculator.module.scss";
import useAnimations from "@/app/_hooks/useAnimations";

const cx = classNames.bind(styles);

const FoodCalculator: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useAnimations([
    {
      ref: headingRef, // El ref del encabezado
      type: "fadeInUp", // Tipo de animación (puedes usar cualquier tipo definido)
      options: {
        duration: 1.2, // Opciones específicas para la animación
        ease: "power2.out",
      },
    },
  ]);

  return (
    <section id="food-calculator" className={cx("food-calculator")}>
      <SectionHeader
        ref={headingRef}
        title="Nutrición Ideal para tu Perro"
        subtitle="Encuentra la cantidad de alimento adecuada"
      />

      <div className={cx("food-calculator__content")}>
        {/* Ilustraciones */}
        <div className={cx("food-calculator__illustrations")}>
          {/* Contenedor para la primera ilustración */}
          <div
            className={cx(
              "food-calculator__image-container",
              "food-calculator__image-container--primary"
            )}
          >
            <Image
              src={dogIllustrationPrimary}
              alt="Perro 1"
              className={cx("food-calculator__dog1")}
              fill
              objectFit="contain"
            />
          </div>

          {/* Contenedor para la segunda ilustración */}
          <div
            className={cx(
              "food-calculator__image-container",
              "food-calculator__image-container--secondary"
            )}
          >
            <Image
              src={dogIllustrationSecondary}
              alt="Perro 2"
              className={cx("food-calculator__dog2")}
              fill
              objectFit="contain"
            />
          </div>
        </div>

        {/* Formulario y resultados */}
        <div className={cx("food-calculator__form")}>
          <DogForm />
        </div>
      </div>
    </section>
  );
};

export default FoodCalculator;
