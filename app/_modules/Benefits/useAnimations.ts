import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseAnimationsProps {
  sectionRef: React.RefObject<HTMLElement>;
  headerRef: React.RefObject<HTMLDivElement>;
  itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  dividerRef?: React.RefObject<HTMLDivElement>; // Hacemos dividerRef opcional
  verticalDividerRef: React.RefObject<HTMLDivElement>;
  mediaGridRef: React.RefObject<HTMLDivElement>;
  cx: (...args: any[]) => string;
}

export const useAnimations = ({
  sectionRef,
  headerRef,
  itemsRef,
  dividerRef,
  verticalDividerRef,
  mediaGridRef,
  cx,
}: UseAnimationsProps) => {
  useEffect(() => {
    // Asegurarnos de que estamos en un entorno de navegador
    if (typeof window === "undefined") return;

    // Verificar que el ref principal está disponible
    if (!sectionRef.current) return;

    // Detectar el tamaño de pantalla para aplicar las animaciones correctas
    const screenWidth = window.innerWidth;
    const isTablet = screenWidth <= 1280 && screenWidth > 768;
    const isMobile = screenWidth <= 768;

    // Función para animaciones (se ejecutará después de un pequeño retraso)
    const runAnimations = () => {
      // Crear un contexto GSAP
      const ctx = gsap.context(() => {
        // 1. ANIMACIÓN DEL ENCABEZADO
        if (headerRef.current) {
          const title = headerRef.current.querySelector("h2");
          const subtitle = headerRef.current.querySelector("p");

          if (title && subtitle) {
            gsap.set([title, subtitle], {
              opacity: 0,
              y: 30,
            });

            gsap.to([title, subtitle], {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.2,
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top bottom",
                toggleActions: "play none none reverse",
              },
            });
          }
        }

        // 2. ANIMACIÓN DEL BORDER-BOTTOM DE FIRST-ROW ITEMS (reemplaza al divisor horizontal)
        if (!isTablet && !isMobile) {
          const firstRowItems = document.querySelectorAll(
            `.${cx("benefits__item--first-row")}`
          );

          if (firstRowItems.length) {
            // Animar el pseudo-elemento ::after de cada item
            firstRowItems.forEach((item) => {
              // Usar GSAP para animar el item con respecto a su propiedad CSS
              gsap.fromTo(
                item,
                {
                  "--border-scale": 0, // Propiedad CSS personalizada
                  opacity: 0.5,
                },
                {
                  "--border-scale": 1,
                  opacity: 1,
                  duration: 1,
                  ease: "power2.inOut",
                  scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            });
          }
        }

        // 3. ANIMACIÓN DEL DIVISOR VERTICAL (sólo en tablet)
        if (verticalDividerRef.current && isTablet) {
          gsap.set(verticalDividerRef.current, {
            scaleY: 0,
            opacity: 0,
          });

          gsap.to(verticalDividerRef.current, {
            scaleY: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: verticalDividerRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          });
        }

        // 4. ANIMACIÓN DE LOS ÍTEMS DE BENEFICIOS
        // Obtenemos los ítems que están visibles según el breakpoint
        let visibleItems;
        if (!isTablet && !isMobile) {
          visibleItems = document.querySelectorAll(
            `.${cx("benefits__grid-wrapper--desktop")} .${cx("benefits__item")}`
          );
        } else if (isTablet && !isMobile) {
          visibleItems = document.querySelectorAll(
            `.${cx("benefits__grid-wrapper--tablet")} .${cx("benefits__item")}`
          );
        } else {
          visibleItems = document.querySelectorAll(
            `.${cx("benefits__grid-wrapper--mobile")} .${cx("benefits__item")}`
          );
        }

        // Animamos cada ítem visible
        visibleItems.forEach((item) => {
          const index = parseInt(item.getAttribute("data-index") || "0", 10);

          // Elementos a animar dentro del ítem
          const numberEl = item.querySelector(
            `.${cx("benefits__item-number")}`
          );
          const iconWrapperEl = item.querySelector(
            `.${cx("benefits__item-icon-wrapper")}`
          );
          const titleEl = item.querySelector(`.${cx("benefits__item-title")}`);
          const descEl = item.querySelector(
            `.${cx("benefits__item-description")}`
          );

          if (!numberEl || !iconWrapperEl || !titleEl || !descEl) return;

          // Establecer estado inicial
          gsap.set(numberEl, { opacity: 0, scale: 0.8 });
          gsap.set(iconWrapperEl, { opacity: 0, scale: 0 });
          gsap.set(titleEl, { opacity: 0, y: 20 });
          gsap.set(descEl, { opacity: 0, y: 20 });

          // Calcular delay basado en el índice
          const delay = (index % 3) * 0.1 + Math.floor(index / 3) * 0.2;

          // Crear timeline para este ítem
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          });

          tl.to(numberEl, {
            opacity: 0.07,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: delay,
          })
            .to(
              iconWrapperEl,
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
              },
              "-=0.3"
            )
            .to(
              titleEl,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.4"
            )
            .to(
              descEl,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.5"
            );
        });

        // 5. ANIMACIÓN SIMPLIFICADA DE LAS IMÁGENES
        if (mediaGridRef.current) {
          const mediaItems = mediaGridRef.current.querySelectorAll(
            `.${cx("benefits__media-grid-item")}`
          );

          if (mediaItems.length) {
            // Configuración inicial simple
            gsap.set(mediaItems, {
              opacity: 0,
            });

            // Animación simple de fade-in con pequeño movimiento vertical
            gsap.to(mediaItems, {
              opacity: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power1.out",
              scrollTrigger: {
                trigger: mediaGridRef.current,
                start: "top bottom-=50",
                toggleActions: "play none none none",
              },
            });
          }
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    // Ejecutar animaciones después de un pequeño retraso
    // para garantizar que todos los elementos estén renderizados
    const animationTimer = setTimeout(runAnimations, 150);

    // Limpieza
    return () => {
      clearTimeout(animationTimer);
    };
  }, [
    sectionRef,
    headerRef,
    itemsRef,
    dividerRef,
    verticalDividerRef,
    mediaGridRef,
    cx,
  ]);
};
