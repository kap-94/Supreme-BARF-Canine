"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatedText, Button } from "@/app/_components";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import aboutImage from "@/public/about-image.jpg";
import styles from "./About.module.scss";

const cx = classNames.bind(styles);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollToPlugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    if (
      !containerRef.current ||
      !buttonRef.current ||
      !imageRef.current ||
      !textBottomRef.current
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
      gsap.set([buttonContainer], {
        opacity: 0,
        scale: 0.98,
        y: 20,
      });

      gsap.set(textBottomRef.current, {
        opacity: 0,
        y: 20,
      });

      // Main animation timeline
      const mainTimeline = gsap.timeline({ scrollTrigger });

      mainTimeline
        .to(
          textBottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0
        )
        .to(
          buttonContainer,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.2
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
        <div className={cx("about__text")}>
          <div className={cx("about__text--top")}>
            <AnimatedText
              text="Supreme BARF Canine es un alimento diseñado por amantes de perros para amantes de perros."
              variant="h3"
              color="white"
              animationType="words"
            />
          </div>

          <div className={cx("about__text--bottom")} ref={textBottomRef}>
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

            <AnimatedText
              text="Alimento natural de calidad humana que ofrece beneficios únicos."
              variant="p1"
              fontWeight={500}
              color="white"
              animationType="block"
            />
          </div>
        </div>

        <div className={cx("about__image")} ref={imageRef}>
          <Image
            src={aboutImage}
            alt="Cute dog"
            className={cx("about__dog")}
            fill
            placeholder="blur"
            sizes="(max-width: 1348px) 100vw, (max-width: 1440px) 50vw, 720px"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
