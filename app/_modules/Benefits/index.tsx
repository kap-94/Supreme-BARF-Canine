"use client";

import React, { useRef } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { SectionHeader, Typography } from "@/app/_components";
import { BenefitProps } from "./types";
import { BENEFITS_DATA, MEDIA_ITEMS } from "./data";
import { useAnimations } from "./useAnimations";
import styles from "./Benefits.module.scss";

const cx = classNames.bind(styles);

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const verticalDividerRef = useRef<HTMLDivElement>(null);
  const mediaGridRef = useRef<HTMLDivElement>(null);

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };

  // Layout organizado para diferentes vistas:
  // - Desktop (3 columnas): Dos filas con 3 elementos cada una
  // - Tablet (2 columnas): Distribución en zigzag - 1,3,5 en columna izquierda, 2,4,6 en columna derecha
  // - Mobile (1 columna): Seis elementos en secuencia

  // En desktop: Primera fila (ítems 0,1,2) y segunda fila (ítems 3,4,5)
  const firstRowBenefits = BENEFITS_DATA.slice(0, 3);
  const secondRowBenefits = BENEFITS_DATA.slice(3);

  // Creamos dos arrays para la vista tablet (distribución en zigzag)
  const leftColumnBenefits = [
    BENEFITS_DATA[0],
    BENEFITS_DATA[2],
    BENEFITS_DATA[4],
  ];
  const rightColumnBenefits = [
    BENEFITS_DATA[1],
    BENEFITS_DATA[3],
    BENEFITS_DATA[5],
  ];

  // Usamos el hook de animaciones, asegurándonos de pasar todos los refs necesarios
  useAnimations({
    sectionRef,
    headerRef,
    itemsRef,
    dividerRef,
    verticalDividerRef,
    mediaGridRef,
    cx,
  });

  return (
    <section ref={sectionRef} id="benefits-section" className={cx("benefits")}>
      <div className={cx("benefits__container")}>
        <div ref={headerRef}>
          <SectionHeader
            title="Bienestar para tu peludo"
            subtitle="Descubre los beneficios de nuestro alimento"
            align="left"
            className={cx("benefits__header")}
          />
        </div>

        {/* Grid Wrapper para distribución desktop */}
        <div
          className={cx(
            "benefits__grid-wrapper",
            "benefits__grid-wrapper--desktop"
          )}
        >
          {/* Primera fila de beneficios (3 elementos) */}
          <div className={cx("benefits__grid", "benefits__grid--first-row")}>
            {firstRowBenefits.map((benefit: BenefitProps, index: number) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  ref={(el) => setItemRef(el, index)}
                  className={cx("benefits__item")}
                >
                  <span className={cx("benefits__item-number")}>
                    {String(benefit.id).padStart(2, "0")}
                  </span>
                  <div className={cx("benefits__item-content")}>
                    <div className={cx("benefits__item-icon-wrapper")}>
                      <Icon
                        size={24}
                        fill="currentColor"
                        strokeWidth={0}
                        className={cx("benefits__item-icon")}
                      />
                    </div>
                    <div className={cx("benefits__item-text")}>
                      <Typography
                        variant="h5"
                        className={cx("benefits__item-title")}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        className={cx("benefits__item-description")}
                      >
                        {benefit.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divisor horizontal para Desktop */}
          <div ref={dividerRef} className={cx("benefits__divider-row")}>
            <div className={cx("benefits__divider")}></div>
          </div>

          {/* Segunda fila de beneficios (3 elementos) */}
          <div className={cx("benefits__grid", "benefits__grid--second-row")}>
            {secondRowBenefits.map((benefit: BenefitProps, index: number) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  ref={(el) => setItemRef(el, index + 3)}
                  className={cx("benefits__item")}
                >
                  <span className={cx("benefits__item-number")}>
                    {String(benefit.id).padStart(2, "0")}
                  </span>
                  <div className={cx("benefits__item-content")}>
                    <div className={cx("benefits__item-icon-wrapper")}>
                      <Icon
                        size={24}
                        fill="currentColor"
                        strokeWidth={0}
                        className={cx("benefits__item-icon")}
                      />
                    </div>
                    <div className={cx("benefits__item-text")}>
                      <Typography
                        variant="h5"
                        className={cx("benefits__item-title")}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        className={cx("benefits__item-description")}
                      >
                        {benefit.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid Wrapper para distribución tablet (zigzag) */}
        <div
          className={cx(
            "benefits__grid-wrapper",
            "benefits__grid-wrapper--tablet"
          )}
        >
          {/* Columna izquierda con items 1, 3, 5 */}
          <div className={cx("benefits__grid", "benefits__grid--left-column")}>
            {leftColumnBenefits.map((benefit: BenefitProps, index: number) => {
              const Icon = benefit.icon;
              const originalIndex = [0, 2, 4][index]; // Mapea a los índices originales
              return (
                <div
                  key={benefit.id}
                  ref={(el) => setItemRef(el, originalIndex)}
                  className={cx("benefits__item")}
                >
                  <span className={cx("benefits__item-number")}>
                    {String(benefit.id).padStart(2, "0")}
                  </span>
                  <div className={cx("benefits__item-content")}>
                    <div className={cx("benefits__item-icon-wrapper")}>
                      <Icon
                        size={24}
                        fill="currentColor"
                        strokeWidth={0}
                        className={cx("benefits__item-icon")}
                      />
                    </div>
                    <div className={cx("benefits__item-text")}>
                      <Typography
                        variant="h5"
                        className={cx("benefits__item-title")}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        className={cx("benefits__item-description")}
                      >
                        {benefit.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divisor vertical para Tablet */}
          <div
            ref={verticalDividerRef}
            className={cx("benefits__vertical-divider")}
          ></div>

          {/* Columna derecha con items 2, 4, 6 */}
          <div className={cx("benefits__grid", "benefits__grid--right-column")}>
            {rightColumnBenefits.map((benefit: BenefitProps, index: number) => {
              const Icon = benefit.icon;
              const originalIndex = [1, 3, 5][index]; // Mapea a los índices originales
              return (
                <div
                  key={benefit.id}
                  ref={(el) => setItemRef(el, originalIndex)}
                  className={cx("benefits__item")}
                >
                  <span className={cx("benefits__item-number")}>
                    {String(benefit.id).padStart(2, "0")}
                  </span>
                  <div className={cx("benefits__item-content")}>
                    <div className={cx("benefits__item-icon-wrapper")}>
                      <Icon
                        size={24}
                        fill="currentColor"
                        strokeWidth={0}
                        className={cx("benefits__item-icon")}
                      />
                    </div>
                    <div className={cx("benefits__item-text")}>
                      <Typography
                        variant="h5"
                        className={cx("benefits__item-title")}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        className={cx("benefits__item-description")}
                      >
                        {benefit.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid Wrapper para distribución mobile */}
        <div
          className={cx(
            "benefits__grid-wrapper",
            "benefits__grid-wrapper--mobile"
          )}
        >
          {/* Una columna con todos los elementos secuenciales */}
          <div className={cx("benefits__grid", "benefits__grid--mobile")}>
            {BENEFITS_DATA.map((benefit: BenefitProps, index: number) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  ref={(el) => setItemRef(el, index)}
                  className={cx("benefits__item")}
                >
                  <span className={cx("benefits__item-number")}>
                    {String(benefit.id).padStart(2, "0")}
                  </span>
                  <div className={cx("benefits__item-content")}>
                    <div className={cx("benefits__item-icon-wrapper")}>
                      <Icon
                        size={24}
                        fill="currentColor"
                        strokeWidth={0}
                        className={cx("benefits__item-icon")}
                      />
                    </div>
                    <div className={cx("benefits__item-text")}>
                      <Typography
                        variant="h5"
                        className={cx("benefits__item-title")}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="p2"
                        className={cx("benefits__item-description")}
                      >
                        {benefit.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={mediaGridRef} className={cx("benefits__media-grid")}>
          <div className={cx("benefits__media-grid-container")}>
            {MEDIA_ITEMS.map((item, index, array) => {
              // En desktop: mostrar todas las imágenes
              // En tablet: mostrar solo las últimas 2 imágenes
              // En mobile: mostrar solo la imagen del medio (índice 1)
              const isLastImage = index === array.length - 1;
              const isSecondLastImage = index === array.length - 2;
              const isFirstImage = index === 0;

              // La lógica para aplicar clases:
              // 1. En desktop: todas las imágenes deben mostrarse (no necesitan clase especial)
              // 2. En tablet: solo mostrar las dos últimas (ocultar el resto)
              // 3. En mobile: solo mostrar la del medio (ocultar el resto)

              // Para tablet: ocultar todo excepto las dos últimas
              const hideInTablet = !isLastImage && !isSecondLastImage;

              // Para mobile: ocultar todo excepto la del medio
              const hideInMobile = !isFirstImage;

              return (
                <div
                  key={index}
                  className={cx(
                    "benefits__media-grid-item",
                    { "benefits__media-grid-item--hide-tablet": hideInTablet },
                    { "benefits__media-grid-item--hide-mobile": hideInMobile }
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 576px"
                    className={cx("benefits__media-grid-image")}
                    priority={isFirstImage}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
