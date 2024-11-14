// HeroParallaxImages.tsx
"use client";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([meatRef.current, dogRef.current, foodRef.current], {
        willChange: "transform",
      });

      gsap.to(meatRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(dogRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(foodRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={cx("hero__images")}>
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
        />
      </div>
      <div ref={dogRef} className={cx("hero__image", "hero__image--primary")}>
        <Image
          src={dogImage}
          fill
          sizes="(max-width: 1280px) 100vw, 50vw"
          className={cx("hero__dog")}
          alt="Perro alimentado con BARF"
        />
      </div>
      <div ref={foodRef} className={cx("hero__image", "hero__image--tertiary")}>
        <Image
          src={foodImage}
          fill
          sizes="(max-width: 1280px) 48vw, 25vw"
          className={cx("hero__food")}
          alt="Plato de alimento para perro"
        />
      </div>
    </div>
  );
};
