"use client";
import { useEffect, RefObject } from "react";

type AnimationType =
  | "blurToFocus"
  | "fadeInUp"
  | "rotateIn"
  | "scaleUp"
  | "slideIn"
  | "slideFromSide";

interface AnimationConfig {
  ref: RefObject<HTMLElement | HTMLElement[]>;
  type: AnimationType;
  options?: any; // Extend this with specific options for each animation type
}

const useAnimations = (configs: AnimationConfig[]) => {
  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;
    let contexts: any[] = [];

    if (typeof window !== "undefined") {
      const loadModules = async () => {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsap = gsapModule.default;
        ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        configs.forEach((config) => {
          const context = gsap.context(() => {
            switch (config.type) {
              case "blurToFocus":
                applyBlurToFocusEffect(gsap, ScrollTrigger, config);
                break;
              case "slideFromSide":
                applySlideFromSideEffect(gsap, ScrollTrigger, config);
                break;
              case "fadeInUp":
                fadeInUpEffect(gsap, ScrollTrigger, config);
                break;
              case "rotateIn":
                rotateInEffect(gsap, ScrollTrigger, config);
                break;
              case "scaleUp":
                scaleUpEffect(gsap, ScrollTrigger, config);
                break;
              case "slideIn":
                slideInEffect(gsap, ScrollTrigger, config);
                break;
              // Add more cases for different animation types if needed
            }
          }, config.ref);
          contexts.push(context);
        });

        ScrollTrigger.refresh();
      };

      loadModules();

      return () => {
        contexts.forEach((context) => context.revert());
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        }
        if (gsap) {
          gsap.globalTimeline.clear();
        }
      };
    }
  }, [configs]);
};

const fadeInUpEffect = (
  gsap: any,
  ScrollTrigger: any,
  config: AnimationConfig
) => {
  const { ref, options } = config;
  if (!ref.current) return;

  gsap.fromTo(
    ref.current,
    { autoAlpha: 0, y: 30 },
    {
      duration: 1.2,
      autoAlpha: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
      },
      ...options,
    }
  );
};

const rotateInEffect = (
  gsap: any,
  ScrollTrigger: any,
  config: AnimationConfig
) => {
  const { ref, options } = config;
  if (!ref.current) return;

  gsap.fromTo(
    ref.current,
    { autoAlpha: 0, rotation: -10 },
    {
      duration: 1.5,
      autoAlpha: 1,
      rotation: 0,
      ease: "elastic.out(1, 0.75)",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        scrub: 1,
      },
      ...options,
    }
  );
};

const scaleUpEffect = (
  gsap: any,
  ScrollTrigger: any,
  config: AnimationConfig
) => {
  const { ref, options } = config;
  if (!ref.current) return;

  gsap.fromTo(
    ref.current,
    { autoAlpha: 0, scale: 0.8 },
    {
      duration: 1.3,
      autoAlpha: 1,
      scale: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        end: "bottom 70%",
        scrub: 1,
      },
      ...options,
    }
  );
};

const slideInEffect = (
  gsap: any,
  ScrollTrigger: any,
  config: AnimationConfig
) => {
  const { ref, options } = config;
  if (!ref.current) return;

  gsap.fromTo(
    ref.current,
    { autoAlpha: 0, x: -50 },
    {
      duration: 1.4,
      autoAlpha: 1,
      x: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        end: "bottom 65%",
        scrub: 1,
      },
      ...options,
    }
  );
};

const applyBlurToFocusEffect = (
  gsap: any,
  ScrollTrigger: any,
  config: AnimationConfig
) => {
  const { ref, options } = config;

  if (!ref.current) return;

  const defaultOptions = {
    duration: 1.5,
    start: "top 80%",
    scrub: 1,
    end: "bottom 60%",
    ...options,
  };

  gsap.fromTo(
    ref.current,
    { autoAlpha: 0, filter: "blur(4px)" },
    {
      duration: defaultOptions.duration,
      autoAlpha: 1,
      filter: "blur(0px)",
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: defaultOptions.start,
        scrub: defaultOptions.scrub,
        end: defaultOptions.end,
      },
    }
  );
};

const applySlideFromSideEffect = (
  gsap: any,
  ScrollTrigger: any,
  config: AnimationConfig
) => {
  const { ref, options } = config;

  const defaultOptions = {
    duration: 1,
    start: "top center+=100",
    toggleActions: "play none none reverse",
    x: -100, // Default slide from left
    ...options,
  };

  if (Array.isArray(ref.current)) {
    ref.current.forEach((element, index) => {
      if (element) {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            x: index % 2 === 0 ? defaultOptions.x : -defaultOptions.x,
          },
          {
            duration: defaultOptions.duration,
            autoAlpha: 1,
            x: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              start: defaultOptions.start,
              toggleActions: defaultOptions.toggleActions,
            },
          }
        );
      }
    });
  } else if (ref.current) {
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, x: defaultOptions.x },
      {
        duration: defaultOptions.duration,
        autoAlpha: 1,
        x: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: defaultOptions.start,
          toggleActions: defaultOptions.toggleActions,
        },
      }
    );
  }
};

export default useAnimations;
