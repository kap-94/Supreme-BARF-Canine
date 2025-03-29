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

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };

  useAnimations({ sectionRef, headerRef, itemsRef, cx });

  return (
    <section ref={sectionRef} id="benefits-section" className={cx("benefits")}>
      <div className={cx("benefits__container")}>
        <div className={cx("benefits__media-grid")}>
          <div className={cx("benefits__media-grid-container")}>
            {MEDIA_ITEMS.map((item, index) => (
              <div key={index} className={cx("benefits__media-grid-item")}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 576px"
                  className={cx("benefits__media-grid-image")}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cx("benefits__content")}>
          <div ref={headerRef}>
            <SectionHeader
              title="Beneficios"
              subtitle="Descubre los beneficios de la nutrición superior"
              align="center"
              className={cx("benefits__header")}
            />
          </div>

          <div className={cx("benefits__grid")}>
            {BENEFITS_DATA.map((benefit: BenefitProps, index: number) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  ref={(el) => setItemRef(el, index)}
                  className={cx("benefits__item", {
                    "benefits__item--right": index % 2 !== 0,
                  })}
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
                        variant="p2"
                        fontWeight={600}
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
      </div>
    </section>
  );
};

export default Benefits;
