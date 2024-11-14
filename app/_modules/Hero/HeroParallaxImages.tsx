"use client";
import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.scss";

const cx = classNames.bind(styles);

gsap.registerPlugin(ScrollTrigger);

interface HeroParallaxImagesProps {
  dogImage: StaticImageData;
  meatImage: StaticImageData;
  foodImage: StaticImageData;
}

export const HeroParallaxImages = ({
  dogImage,
  meatImage,
  foodImage,
}: HeroParallaxImagesProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const meatRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<HTMLDivElement>(null);

  const setupParallax = useCallback(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const elements = [
          meatRef.current,
          dogRef.current,
          foodRef.current,
        ].filter(Boolean);

        gsap.set(elements, {
          willChange: "transform",
          force3D: true,
        });

        const commonScrollTrigger = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        };

        // Dog animation
        gsap.to(dogRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            ...commonScrollTrigger,
            scrub: 1, // Número simple para mejor rendimiento
          },
        });

        // Food animation
        gsap.to(foodRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            ...commonScrollTrigger,
            scrub: 2, // Número más alto para movimiento más suave
          },
        });
      });

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(setupParallax, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [setupParallax]);

  return (
    <div
      ref={sectionRef}
      className={cx("hero__images")}
      style={{ willChange: "transform", backfaceVisibility: "hidden" }}
    >
      <div
        ref={meatRef}
        className={cx("hero__image", "hero__image--secondary")}
      >
        <Image
          src={meatImage}
          fill
          sizes="(max-width: 1280px) 25vw, 30vw"
          className={cx("hero__meat")}
          alt="Carne fresca para perros"
          priority
        />
      </div>
      <div ref={dogRef} className={cx("hero__image", "hero__image--primary")}>
        <Image
          src={dogImage}
          fill
          sizes="(max-width: 1280px) 100vw, 50vw"
          className={cx("hero__dog")}
          alt="Perro alimentado con BARF"
          priority
        />
      </div>
      <div ref={foodRef} className={cx("hero__image", "hero__image--tertiary")}>
        <Image
          src={foodImage}
          fill
          sizes="(max-width: 1280px) 48vw, 25vw"
          className={cx("hero__food")}
          alt="Plato de alimento para perro"
          priority
        />
      </div>
    </div>
  );
};
