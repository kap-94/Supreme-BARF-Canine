import { useLayoutEffect, RefObject } from "react";
import gsap from "gsap";
import { CreativeGridVariant } from "../types";
import { animateContainer, createAnimationTimeline } from "../utils/animation";
import { getVariantConfig } from "../variants";

export const useGridAnimation = (
  gridRef: RefObject<HTMLDivElement>,
  imageRefs: RefObject<Array<HTMLDivElement | null>>,
  variant: CreativeGridVariant,
  animate: boolean,
  childCount: number,
  setIsReady: (ready: boolean) => void
): void => {
  useLayoutEffect(() => {
    if (!animate || !gridRef.current) {
      setIsReady(true);
      return;
    }

    const gridElement = gridRef.current;
    const elements = imageRefs.current?.filter(Boolean) || [];
    const variantConfig = getVariantConfig(variant);

    // Hide completely before any setup
    gsap.set(gridElement, {
      opacity: 0,
      visibility: "hidden",
      immediateRender: true,
      overwrite: "auto",
    });

    // Clean existing animations
    elements.forEach((element) => {
      if (element) gsap.killTweensOf(element);
    });

    // Initialize elements in their starting positions
    variantConfig.initElements(elements, childCount);

    const rafId = requestAnimationFrame(() => {
      if (!gridElement) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1px)", () => {
        try {
          const mainTimeline = createAnimationTimeline(gridElement);
          mainTimeline.reversed(false);

          // Animate container first
          animateContainer(gridElement, mainTimeline);

          // Show container before element animations
          gsap.set(gridElement, {
            opacity: 1,
            visibility: "visible",
            immediateRender: true,
          });

          // Animate elements
          variantConfig.animateElements(elements, mainTimeline, childCount);

          // Mark as ready
          setIsReady(true);
        } catch (error) {
          console.error("Animation error:", error);
          // Fallback: show content without animation
          gsap.set(gridElement, { opacity: 1, visibility: "visible" });
          gsap.set(elements, { opacity: 1, clearProps: "all" });
          setIsReady(true);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      gsap.matchMedia().revert();
      elements.forEach((el) => el && gsap.killTweensOf(el));
      if (gridRef.current) {
        gridRef.current.setAttribute("data-ready", "false");
      }
    };
  }, [animate, variant, childCount, gridRef, imageRefs, setIsReady]);
};

export default useGridAnimation;
