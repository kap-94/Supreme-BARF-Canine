import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationElements } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface UseAnimationsProps {
  sectionRef: React.RefObject<HTMLElement>;
  headerRef: React.RefObject<HTMLDivElement>;
  itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cx: (...args: any[]) => string;
}

export const useAnimations = ({
  sectionRef,
  headerRef,
  itemsRef,
  cx,
}: UseAnimationsProps) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;

      // Header Animation
      if (headerRef.current) {
        const title = headerRef.current.querySelector("h2");
        const subtitle = headerRef.current.querySelector("p");

        gsap.set([title, subtitle], {
          opacity: 0,
          y: 50,
        });

        const headerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reverse restart reverse",
            // Alternativa más suave:
            // toggleActions: "restart pause resume reset",
          },
        });

        headerTimeline.to([title, subtitle], {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.2,
            ease: "power1.inOut",
          },
        });
      }

      // Benefits Items Animation
      const items = itemsRef.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

      items.forEach((item, index) => {
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

        if (
          !elements.number ||
          !elements.icon ||
          !elements.title ||
          !elements.description
        )
          return;

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
  }, [sectionRef, headerRef, itemsRef, cx]);
};
