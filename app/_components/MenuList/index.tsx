"use client";
// Import necessary modules and components
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import classnames from "classnames/bind";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import useScrollActiveSection from "@/app/_hooks/useScrollActiveSection";
import Icon, { IconName } from "@/app/_components/CustomIcon";
import { Typography } from "@/app/_components";
import { getPath } from "@/app/_utils";
import styles from "./MenuList.module.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

// Define the MenuItem interface representing each menu item
export interface MenuItem {
  menu_item_id: number;
  menu_item_parent: number;
  title: string;
  url: string;
  target?: string;
  icon?: IconName;
  showDropdownIcon?: boolean;
  isSectionLink?: boolean; // Prop to detect if it's an internal section link
}

// Define the props for the MenuList component
interface MenuListProps {
  data: MenuItem[]; // Array of menu items
  frontPageID: number; // ID of the front page
  onClick?: () => void; // Optional click handler
  useActiveStyle?: boolean; // Prop to enable/disable active styles
  orientation?: "horizontal" | "vertical"; // Prop to set menu orientation
  gap?: number; // Single numeric value for gap
  showBorders?: boolean; // New prop to toggle right border between list items
}

// Bind the styles for conditional class names
const cx = classnames.bind(styles);

// Main MenuList component
const MenuList: React.FC<MenuListProps> = ({
  data,
  frontPageID,
  onClick,
  useActiveStyle = true, // Default to true for active styles
  orientation = "horizontal", // Default orientation is horizontal
  gap = 24, // Default gap value
  showBorders = false, // Default to false for the border
}) => {
  // Early return if no data is provided
  if (!data) return null;

  // State to determine if the viewport is mobile-sized
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // State to keep track of the currently active menu item
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Refs for DOM elements
  const ref = useRef<HTMLUListElement>(null); // Reference to the menu list
  const menuRef = useRef<HTMLUListElement>(null); // Reference to the menu container
  const menuItemRefs = useRef<Array<HTMLLIElement | null>>([]); // References to individual menu items

  // Separate the menu items into top-level and submenu items
  const topMenuItems = data.filter((item) => item.menu_item_parent === 0);
  const submenuItems = data.filter((item) => item.menu_item_parent !== 0);

  // Extract section IDs for the custom hook to track active sections
  const sectionIds = data
    .filter((item) => item.url.startsWith("#"))
    .map((item) => item.url.replace("#", ""));

  // Use custom hook to get the currently active section ID
  const activeSectionId = useScrollActiveSection(sectionIds);

  // Calculate the gap value based on orientation
  const menuStyle = {
    "--menu-gap": `${gap}px`,
  } as React.CSSProperties;

  // Function to handle menu item clicks
  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
    hasSubmenu: boolean,
    menuItemId: number
  ) => {
    if (isMobile && hasSubmenu) {
      // On mobile, toggle submenu visibility
      e.preventDefault();
      setActiveIndex(activeIndex === menuItemId ? null : menuItemId);
    } else if (href.startsWith("#")) {
      // Internal section link handling
      e.preventDefault();
      handleScrollToSection(href); // Scroll to the section
      setActiveIndex(menuItemId); // Set the active menu item
      if (onClick) {
        onClick(); // Call the onClick handler if provided
      }
    } else if (onClick) {
      onClick(); // For external links, call the onClick handler
    }
  };

  // Callback function to handle smooth scrolling to sections
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

  // Effect to handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1360);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to handle clicks outside the menu (for desktop)
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          // Close any open submenus
          setActiveIndex(null);
        }
      };

      // Add event listeners for mouse and touch events
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      // Cleanup event listeners on unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isMobile]);

  // Effect to update the active menu item based on scroll position
  useEffect(() => {
    if (activeSectionId) {
      const activeItem = data.find(
        (item) => item.url === `#${activeSectionId}`
      );
      if (activeItem) {
        setActiveIndex(activeItem.menu_item_id);
      } else {
        setActiveIndex(null);
      }
    } else {
      setActiveIndex(null);
    }
  }, [activeSectionId, data]);

  // Effect to update the indicator position under the active menu item
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

          // Update CSS custom properties for the indicator
          menuElement.style.setProperty("--indicator-left", `${left}px`);
          menuElement.style.setProperty("--indicator-width", `${width}px`);
        }
      } else {
        // Hide the indicator if there's no active item or active styles are disabled
        menuRef.current.style.setProperty("--indicator-width", `0px`);
      }
    }
  }, [useActiveStyle, activeIndex, topMenuItems]);

  // Map over top-level menu items to render the menu
  const menu = topMenuItems.map((menuItem, index) => {
    const path = getPath(menuItem, frontPageID); // Get the path for the menu item
    const childSubmenuItems = submenuItems.filter(
      (item) => item.menu_item_parent === menuItem.menu_item_id
    );

    const hasSubmenu = childSubmenuItems.length > 0; // Check if the item has a submenu
    const isActive = activeIndex === menuItem.menu_item_id; // Check if the item is active

    return (
      <li
        key={menuItem.menu_item_id}
        ref={(el) => {
          menuItemRefs.current[index] = el; // Store reference to the menu item
        }}
        className={cx("menu__item", {
          "menu__item--active": useActiveStyle && isActive, // Conditionally apply active class
          "menu__item--border":
            showBorders && index !== topMenuItems.length - 1, // Apply border if showBorders is true and not the last item
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
          {/* Render the icon if provided */}
          {menuItem.icon && (
            <Icon
              icon={menuItem.icon}
              className={cx("menu__icon")}
              width={16}
              height={16}
              color="white"
            />
          )}
          {/* Render the menu item title */}
          <Typography variant="p3" textTransform="uppercase">
            {menuItem.title}
          </Typography>
          {/* Render dropdown icon if there's a submenu and it's not explicitly hidden */}
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

        {/* Render the submenu if it exists */}
        {hasSubmenu && (
          <ul
            className={cx("submenu", {
              "submenu--open": isActive, // Open the submenu if the item is active
              "submenu--vertical": orientation === "vertical", // Apply vertical styles if needed
            })}
          >
            {childSubmenuItems.map((submenuItem) => {
              const subpath = getPath(submenuItem, frontPageID); // Get the path for the submenu item
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
                    {/* Render the icon if provided */}
                    {submenuItem.icon && (
                      <Icon
                        icon={submenuItem.icon}
                        className={cx("submenu__icon")}
                        width={16}
                        height={16}
                      />
                    )}
                    {/* Render the submenu item title */}
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

  // Render the complete menu
  return (
    <ul
      ref={menuRef}
      className={cx("menu", {
        "menu--vertical": orientation === "vertical", // Apply vertical orientation if specified
      })}
      style={menuStyle}
    >
      {menu}
    </ul>
  );
};

// Export the MenuList component as default
export default MenuList;
