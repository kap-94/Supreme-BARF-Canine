"use client";
// Importación de módulos y componentes necesarios
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classnames from "classnames/bind";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import useScrollActiveSection from "@/app/_hooks/useScrollActiveSection";
import Icon, { IconName } from "@/app/_components/CustomIcon";
import { Typography } from "@/app/_components";
import { getPath } from "@/app/_utils";
import styles from "./MenuList.module.scss";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollToPlugin);

// Definición de la interfaz MenuItem que representa cada elemento del menú
export interface MenuItem {
  menu_item_id: number;
  menu_item_parent: number;
  title: string;
  url: string;
  target?: string;
  icon?: IconName;
  showDropdownIcon?: boolean;
  isSectionLink?: boolean; // Prop para detectar si es un enlace interno a una sección
}

// Definición de las props para el componente MenuList
interface MenuListProps {
  data: MenuItem[]; // Array de elementos de menú
  frontPageID: number; // ID de la página de inicio
  onClick?: () => void; // Manejador de clic opcional
  useActiveStyle?: boolean; // Prop para habilitar/deshabilitar estilos activos
  orientation?: "horizontal" | "vertical"; // Prop para establecer la orientación del menú
  gap?: number; // Valor numérico para el espaciado
  showBorders?: boolean; // Prop para alternar el borde derecho entre elementos de la lista
}

// Vinculación de estilos para nombres de clase condicionales
const cx = classnames.bind(styles);

// Componente principal MenuList
const MenuList: React.FC<MenuListProps> = ({
  data,
  frontPageID,
  onClick,
  useActiveStyle = true, // Por defecto en true para estilos activos
  orientation = "horizontal", // Orientación por defecto horizontal
  gap = 24, // Valor de espaciado por defecto
  showBorders = false, // Por defecto en false para el borde
}) => {
  // Retorno temprano si no se proporciona data
  if (!data) return null;

  const router = useRouter();
  const pathname = usePathname();

  // Estado para determinar si el viewport es de tamaño móvil
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Estado para mantener el elemento de menú actualmente activo
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Refs para elementos del DOM
  const ref = useRef<HTMLUListElement>(null); // Referencia a la lista del menú
  const menuRef = useRef<HTMLUListElement>(null); // Referencia al contenedor del menú
  const menuItemRefs = useRef<Array<HTMLLIElement | null>>([]); // Referencias a elementos individuales del menú

  // Separar los elementos del menú en elementos de nivel superior y submenús
  const topMenuItems = data.filter((item) => item.menu_item_parent === 0);
  const submenuItems = data.filter((item) => item.menu_item_parent !== 0);

  // Extraer IDs de sección para el hook personalizado que rastrea secciones activas
  const sectionIds = data
    .filter((item) => item.url.startsWith("#"))
    .map((item) => item.url.replace("#", ""));

  // Uso del hook personalizado para obtener el ID de la sección actualmente activa
  const activeSectionId = useScrollActiveSection(sectionIds);

  // Calcular el valor de gap basado en la orientación
  const menuStyle = {
    "--menu-gap": `${gap}px`,
  } as React.CSSProperties;

  // Función para manejar los clics en elementos del menú
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
    hasSubmenu: boolean,
    menuItemId: number
  ) => {
    if (isMobile && hasSubmenu) {
      // En móvil, alternar la visibilidad del submenú
      e.preventDefault();
      setActiveIndex(activeIndex === menuItemId ? null : menuItemId);
    } else if (href.startsWith("#")) {
      // Manejo de enlaces internos a secciones
      e.preventDefault();
      if (pathname !== "/") {
        // Si no estás en la página de inicio, navega a la home con el hash
        router.push(`/${href}`);
      } else {
        // Si ya estás en la página de inicio, simplemente desplázate a la sección
        handleScrollToSection(href);
      }
      setActiveIndex(menuItemId); // Establece el elemento de menú activo
      if (onClick) {
        onClick(); // Llama al manejador onClick si se proporciona
      }
    } else {
      // Para enlaces externos o rutas normales
      if (onClick) {
        onClick();
      }
    }
  };

  // Función de callback para manejar el desplazamiento suave a secciones
  const handleScrollToSection = useCallback((href: string) => {
    const targetElement = document.querySelector(href); // Obtener el elemento de destino

    if (targetElement) {
      const offset = 120; // Desplazamiento adicional de 120px

      gsap.to(window, {
        duration: 1, // Duración de la animación
        scrollTo: {
          y: targetElement, // Scroll hasta el elemento de destino
          offsetY: offset, // Desplazar hacia arriba por 120px
        },
      });
    }
  }, []);

  // Efecto para manejar eventos de redimensionamiento de ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1360);
    };

    // Comprobación inicial al montar el componente
    handleResize();

    // Añadir listener para redimensionamiento
    window.addEventListener("resize", handleResize);

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Efecto para manejar clics fuera del menú (para escritorio)
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          // Cerrar cualquier submenú abierto
          setActiveIndex(null);
        }
      };

      // Añadir listeners para eventos de mouse y touch
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      // Limpiar listeners al desmontar
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isMobile]);

  // Efecto para actualizar el elemento de menú activo basado en la ruta actual
  useEffect(() => {
    // Primero verificar secciones activas en la página actual
    if (activeSectionId) {
      const activeItem = data.find(
        (item) => item.url === `#${activeSectionId}`
      );
      if (activeItem) {
        setActiveIndex(activeItem.menu_item_id);
        return;
      }
    }

    // Si no hay una sección activa, verificar si la ruta actual coincide con algún elemento del menú
    if (pathname) {
      // Verificar si la ruta actual coincide con algún elemento del menú de nivel superior
      const matchingItem = topMenuItems.find((item) => {
        const itemPath = getPath(item, frontPageID);
        // Verificar si la ruta actual es exactamente igual al path del item
        // o si es una ruta root como "/productos"
        return (
          pathname === itemPath ||
          (pathname.startsWith(itemPath) && itemPath !== "/")
        );
      });

      if (matchingItem) {
        setActiveIndex(matchingItem.menu_item_id);
      } else {
        // Si no se encontró una coincidencia en los elementos de nivel superior,
        // buscar en los elementos del submenú
        const matchingSubmenuItem = submenuItems.find((item) => {
          const itemPath = getPath(item, frontPageID);
          return (
            pathname === itemPath ||
            (pathname.startsWith(itemPath) && itemPath !== "/")
          );
        });

        if (matchingSubmenuItem) {
          // Si encontramos una coincidencia en el submenú, activar el elemento padre
          setActiveIndex(matchingSubmenuItem.menu_item_parent);
        } else {
          // Si no hay coincidencias, desactivar todos los elementos
          setActiveIndex(null);
        }
      }
    } else {
      setActiveIndex(null);
    }
  }, [
    pathname,
    activeSectionId,
    data,
    topMenuItems,
    submenuItems,
    frontPageID,
  ]);

  // Efecto para manejar el desplazamiento a la sección cuando la URL tiene un hash
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      if (pathname === "/" && window.location.hash) {
        const hash = window.location.hash;
        if (hash) {
          handleScrollToSection(hash);
        }
      }
    }
  }, [pathname, handleScrollToSection]);

  // Efecto para actualizar la posición del indicador bajo el elemento de menú activo
  useEffect(() => {
    if (menuRef.current) {
      if (useActiveStyle && activeIndex !== null && menuItemRefs.current) {
        const activeItemIndex = topMenuItems.findIndex(
          (item) => item.menu_item_id === activeIndex
        );
        const activeItem = menuItemRefs.current[activeItemIndex];
        if (activeItem) {
          const menuElement = menuRef.current;
          const itemRect = activeItem.getBoundingClientRect();
          const menuRect = menuElement.getBoundingClientRect();

          const left = itemRect.left - menuRect.left;
          const width = itemRect.width;

          // Actualizar propiedades CSS personalizadas para el indicador
          menuElement.style.setProperty("--indicator-left", `${left}px`);
          menuElement.style.setProperty("--indicator-width", `${width}px`);
        }
      } else {
        // Ocultar el indicador si no hay elemento activo o los estilos activos están deshabilitados
        menuRef.current.style.setProperty("--indicator-width", `0px`);
      }
    }
  }, [useActiveStyle, activeIndex, topMenuItems]);

  // Mapear sobre los elementos de menú de nivel superior para renderizar el menú
  const menu = topMenuItems.map((menuItem, index) => {
    const path = getPath(menuItem, frontPageID); // Obtener la ruta para el elemento de menú
    const childSubmenuItems = submenuItems.filter(
      (item) => item.menu_item_parent === menuItem.menu_item_id
    );

    const hasSubmenu = childSubmenuItems.length > 0; // Verificar si el elemento tiene un submenú
    const isActive = activeIndex === menuItem.menu_item_id; // Verificar si el elemento está activo

    return (
      <li
        key={menuItem.menu_item_id}
        ref={(el) => {
          menuItemRefs.current[index] = el; // Almacenar referencia al elemento de menú
        }}
        className={cx("menu__item", {
          "menu__item--active": useActiveStyle && isActive, // Aplicar clase activa condicionalmente
          "menu__item--border":
            showBorders && index !== topMenuItems.length - 1, // Aplicar borde si showBorders es true y no es el último elemento
        })}
      >
        <Link
          href={path}
          target={menuItem.target}
          className={cx("menu__link")}
          onClick={(e) =>
            handleMenuClick(e, path, hasSubmenu, menuItem.menu_item_id)
          }
        >
          {/* Renderizar el icono si se proporciona */}
          {menuItem.icon && (
            <Icon
              icon={menuItem.icon}
              className={cx("menu__icon")}
              width={18}
              height={18}
              color="white"
            />
          )}
          {/* Renderizar el título del elemento de menú */}
          <Typography variant="p2" color="white" fontWeight={500}>
            {menuItem.title}
          </Typography>
          {/* Renderizar icono de dropdown si hay un submenú y no está explícitamente oculto */}
          {hasSubmenu && menuItem.showDropdownIcon !== false && (
            <Icon
              icon="dropDown"
              color="white"
              width={14}
              height={14}
              className={cx("dropdown__icon")}
            />
          )}
        </Link>

        {/* Renderizar el submenú si existe */}
        {hasSubmenu && (
          <ul
            className={cx("submenu", {
              "submenu--open": isActive, // Abrir el submenú si el elemento está activo
              "submenu--vertical": orientation === "vertical", // Aplicar estilos verticales si es necesario
            })}
          >
            {childSubmenuItems.map((submenuItem) => {
              const subpath = getPath(submenuItem, frontPageID); // Obtener la ruta para el elemento del submenú
              return (
                <li
                  key={submenuItem.menu_item_id}
                  className={cx("submenu__item")}
                >
                  <Link
                    href={subpath}
                    className={cx("submenu__link")}
                    onClick={onClick}
                    target={submenuItem.target}
                  >
                    {/* Renderizar el icono si se proporciona */}
                    {submenuItem.icon && (
                      <Icon
                        icon={submenuItem.icon}
                        className={cx("submenu__icon")}
                        width={16.5}
                        height={16.5}
                      />
                    )}
                    {/* Renderizar el título del elemento del submenú */}
                    <Typography variant="p3" textTransform="uppercase">
                      {submenuItem.title}
                    </Typography>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  });

  // Renderizar el menú completo
  return (
    <ul
      ref={menuRef}
      className={cx("menu", {
        "menu--vertical": orientation === "vertical", // Aplicar orientación vertical si se especifica
      })}
      style={menuStyle}
    >
      {menu}
    </ul>
  );
};

// Exportar el componente MenuList como default
export default MenuList;
