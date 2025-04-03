"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedText, Button } from "@/app/_components";
import ImageGrid, { ImageGridVariant } from "@/app/_components/ImageGrid2";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import aboutImage from "@/public/about-image.jpg";
import styles from "./About.module.scss";

const cx = classNames.bind(styles);

// Lista de variantes disponibles para el grid
const gridVariants: ImageGridVariant[] = [
  "masonry",
  "diagonal",
  "stepped",
  "cinematic",
  "filmstrip",
  "overlapping",
  "rotated",
  "asymmetric",
  "staggered",
  "geometric",
];

const About = () => {
  const [gridVariant, setGridVariant] = useState<ImageGridVariant>("masonry");

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Función para cambiar a la siguiente variante (solo para demostración)
  const changeGridVariant = () => {
    const currentIndex = gridVariants.indexOf(gridVariant);
    const nextIndex = (currentIndex + 1) % gridVariants.length;
    setGridVariant(gridVariants[nextIndex]);
  };

  useEffect(() => {
    // Register ScrollToPlugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    if (
      !containerRef.current ||
      !headingRef.current ||
      !buttonWrapperRef.current ||
      !buttonRef.current
    )
      return;

    const mm = gsap.matchMedia();
    const buttonContainer = buttonRef.current;
    const cleanupFunctions: (() => void)[] = [];

    mm.add("(min-width: 768px)", () => {
      // Create a main timeline for the scroll-triggered animations
      const scrollTrigger = {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse",
      };

      // Set initial states
      gsap.set(headingRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(buttonWrapperRef.current, {
        opacity: 0,
        y: 20,
      });

      // Main animation timeline
      const mainTimeline = gsap.timeline({ scrollTrigger });

      mainTimeline
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0
        )
        .to(
          buttonWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.9
        );

      // Button hover animation
      const buttonElement = buttonContainer.querySelector("a, button");
      if (buttonElement instanceof HTMLElement) {
        const buttonHoverAnimation = {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        };

        const handleButtonEnter = () => {
          gsap.to(buttonElement, buttonHoverAnimation);
        };

        const handleButtonLeave = () => {
          gsap.to(buttonElement, {
            ...buttonHoverAnimation,
            scale: 1,
          });
        };

        buttonElement.addEventListener("mouseenter", handleButtonEnter);
        buttonElement.addEventListener("mouseleave", handleButtonLeave);

        // Add smooth scroll on click
        const handleButtonClick = (e: Event) => {
          e.preventDefault();
          const targetSection = document.querySelector("#benefits-section");
          if (targetSection) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: targetSection,
                offsetY: 80,
              },
              ease: "power3.inOut",
            });
          }
        };

        buttonElement.addEventListener("click", handleButtonClick);

        cleanupFunctions.push(() => {
          buttonElement.removeEventListener("mouseenter", handleButtonEnter);
          buttonElement.removeEventListener("mouseleave", handleButtonLeave);
          buttonElement.removeEventListener("click", handleButtonClick);
        });
      }
    });

    return () => {
      // Clean up all event listeners
      cleanupFunctions.forEach((cleanup) => cleanup());
      // Clean up GSAP
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about-section" className={cx("about")} ref={containerRef}>
      <div className={cx("about__content")}>
        {/* Heading */}
        <div className={cx("about__heading")} ref={headingRef}>
          <div className={cx("about__heading-text")}>
            <AnimatedText
              text="Supreme BARF Canine es un alimento diseñado por amantes de perros para amantes de perros."
              variant="h3"
              color="white"
              animationType="words"
            />
            <AnimatedText
              text="Alimento natural de calidad humana que ofrece beneficios únicos."
              variant="p1"
              fontWeight={600}
              color="white"
              className={cx("about__heading-subtitle")}
              animationType="block"
            />
          </div>
        </div>

        {/* Implementación del componente ImageGrid con la variante seleccionada */}
        <ImageGrid
          variant={gridVariant}
          className={cx("about__gallery")}
          animate={true}
        >
          <Image
            src={aboutImage}
            alt="Cute dog"
            className={cx("about__dog")}
            fill
            placeholder="blur"
            sizes="(max-width: 768px) 100%, 33.333%"
          />
          <Image
            src={aboutImage}
            alt="Cute dog profile"
            className={cx("about__dog")}
            fill
            placeholder="blur"
            sizes="(max-width: 768px) 100%, 33.333%"
          />
          <Image
            src={aboutImage}
            alt="Cute dog close-up"
            className={cx("about__dog")}
            fill
            placeholder="blur"
            sizes="(max-width: 768px) 100%, 33.333%"
          />
        </ImageGrid>

        {/* Botón para cambiar la variante (solo para demostración) */}
        {process.env.NODE_ENV === "development" && (
          <div className={cx("about__dev-controls")}>
            <button
              onClick={changeGridVariant}
              className={cx("about__variant-button")}
            >
              Cambiar variante (Actual: {gridVariant})
            </button>
          </div>
        )}

        {/* Button - Debajo de la galería */}
        <div className={cx("about__button-wrapper")} ref={buttonWrapperRef}>
          <div ref={buttonRef}>
            <Button
              variant="link-light"
              icon="right-arrow"
              target="_self"
              href="#benefits-section"
              className={cx("about__button")}
            >
              Conoce los beneficios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
