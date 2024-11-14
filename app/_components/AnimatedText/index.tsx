"use client";
import { useEffect, useRef } from "react";
import { Typography } from "@/app/_components";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AnimatedText.module.scss";

const cx = classNames.bind(styles);

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const typographyElement = containerRef.current.querySelector("h3");
    if (!typographyElement) return;

    // Configuración inicial del texto
    const originalStyles = window.getComputedStyle(typographyElement);
    const words = text.split(" ").filter((word) => word.length > 0);
    const wrappedContent = words
      .map((word) => `<span class="${cx("split-word")}">${word}</span>`)
      .join(" ");

    const styledContainer = document.createElement("div");
    Object.assign(styledContainer.style, {
      color: originalStyles.color,
      fontSize: originalStyles.fontSize,
      fontWeight: originalStyles.fontWeight,
      lineHeight: originalStyles.lineHeight,
      letterSpacing: originalStyles.letterSpacing,
    });

    styledContainer.innerHTML = wrappedContent;
    typographyElement.innerHTML = "";
    typographyElement.appendChild(styledContainer);

    wordsRef.current = Array.from(
      typographyElement.getElementsByClassName(cx("split-word"))
    ) as HTMLSpanElement[];

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(wordsRef.current, {
          opacity: 0,
          y: 20,
          immediateRender: true,
        });

        gsap.to(wordsRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.5,
            ease: "power2.out",
          },
          clearProps: "transform",
        });
      });

      return () => ctx.revert();
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text]);
  return (
    <div ref={containerRef} className={cx("text-wrapper")}>
      <Typography variant="h3" color="white" className={className}>
        {text}
      </Typography>
    </div>
  );
};

export default AnimatedText;
