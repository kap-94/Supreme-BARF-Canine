"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Benefits.module.scss";

const cx = classNames.bind(styles);
gsap.registerPlugin(ScrollTrigger);

interface BenefitProps {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const BENEFITS_DATA: BenefitProps[] = [
  {
    id: 1,
    title: "Nutrición equilibrada avalada por expertos",
    description:
      "Fórmula desarrollada por veterinarios e ingenieros especializados, que proporciona una nutrición completa y balanceada para garantizar la salud óptima de tu mascota.",
    icon: "🦴",
  },
  {
    id: 2,
    title: "Ingredientes premium 100% naturales",
    description:
      "Elaborado con ingredientes frescos de la más alta calidad, enriquecido con aceite de salmón salvaje para aportar ácidos grasos omega-3 esenciales para tu mascota.",
    icon: "🌿",
  },
  {
    id: 3,
    title: "Salud integral garantizada",
    description:
      "Potencia el metabolismo, fortalece el sistema inmunológico y promueve un pelaje brillante y saludable gracias a su formulación natural de nutrientes esenciales.",
    icon: "❤️",
  },
  {
    id: 4,
    title: "Hidratación óptima",
    description:
      "Su contenido de humedad natural ayuda a prevenir problemas renales y mantiene una hidratación adecuada, fundamental para el bienestar general de tu mascota.",
    icon: "💧",
  },
  {
    id: 5,
    title: "Proceso de cocción seguro",
    description:
      "Nuestro método especializado maximiza la absorción de nutrientes y elimina patógenos, garantizando un alimento seguro y de fácil digestión para tu mascota.",
    icon: "🔥",
  },
  {
    id: 6,
    title: "Digestión optimizada",
    description:
      "La combinación precisa de ingredientes facilita una mejor absorción de nutrientes, resultando en menor cantidad de heces y mejor aprovechamiento del alimento.",
    icon: "✨",
  },
];

const MEDIA_ITEMS = [
  {
    src: "/dog-blue-bg.webp",
    alt: "Perro sonriendo",
  },
  {
    src: "/puppies.jpg",
    alt: "Cachorros durmiendo",
  },
  {
    src: "/dogs-playing.jpg",
    alt: "Perros saludables y activos",
  },
];

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768; // O el breakpoint que uses

      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        // Si es mobile, solo hacemos fade in simple
        if (isMobile) {
          gsap.from(item, {
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
            },
          });
          return;
        }

        // Animaciones desktop completas
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });

        const elements = {
          number: item.querySelector(`.${cx("benefits__item-number")}`),
          icon: item.querySelector(`.${cx("benefits__item-icon-wrapper")}`),
          title: item.querySelector(`.${cx("benefits__item-title")}`),
          description: item.querySelector(
            `.${cx("benefits__item-description")}`
          ),
        };

        const direction = index % 2 === 0 ? -30 : 30;

        gsap.set(elements.number, { opacity: 0 });
        gsap.set(elements.icon, { opacity: 0, scale: 0 });
        gsap.set([elements.title, elements.description], {
          opacity: 0,
          x: direction,
        });

        timeline
          .to(elements.number, {
            opacity: 0.07,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          })
          .to(
            elements.icon,
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          )
          .to(
            [elements.title, elements.description],
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.3"
          );

        timeline.delay(index * 0.1);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };

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
                />
              </div>
            ))}
          </div>
        </div>

        <div className={cx("benefits__content")}>
          <h2 className={cx("benefits__title")}>Beneficios</h2>

          <div className={cx("benefits__grid")}>
            {BENEFITS_DATA.map((benefit, index) => (
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
                    <span className={cx("benefits__item-icon")}>
                      {benefit.icon}
                    </span>
                  </div>
                  <div className={cx("benefits__item-text")}>
                    <h3 className={cx("benefits__item-title")}>
                      {benefit.title}
                    </h3>
                    <p className={cx("benefits__item-description")}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
