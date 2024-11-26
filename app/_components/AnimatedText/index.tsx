"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypographyProps } from "../Typography/interfaces";
import { Typography } from "@/app/_components";
import styles from "./AnimatedText.module.scss";

const cx = classNames.bind(styles);

interface AnimatedTextProps extends Omit<TypographyProps, "children"> {
  text: string;
  className?: string;
  animationType?: "words" | "block";
}

export const AnimatedText = ({
  text,
  className,
  animationType = "words",
  ...typographyProps
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const typographyElement = containerRef.current.querySelector(
      "[class*='typography']"
    );
    if (!typographyElement) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        if (animationType === "words") {
          const words = text.split(" ").filter((word) => word.length > 0);
          const wrappedContent = words
            .map((word) => `<span class="${cx("split-word")}">${word}</span>`)
            .join(" ");

          typographyElement.innerHTML = wrappedContent;
          wordsRef.current = Array.from(
            typographyElement.getElementsByClassName(cx("split-word"))
          ) as HTMLSpanElement[];

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
        } else {
          typographyElement.innerHTML = text;

          gsap.set(typographyElement, {
            opacity: 0,
            y: 20,
            immediateRender: true,
          });

          gsap.to(typographyElement, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              fastScrollEnd: true,
              preventOverlaps: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "transform",
          });
        }
      });

      return () => ctx.revert();
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text, animationType]);

  return (
    <div ref={containerRef} className={cx("text-wrapper", className)}>
      <Typography {...typographyProps}>{text}</Typography>
    </div>
  );
};

export default AnimatedText;
