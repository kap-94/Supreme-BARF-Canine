"use client";
import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import classnames from "classnames/bind";
// import { convertLink, fixInvalidLink } from "@/app/utils";
import { HeaderProps } from "./interfaces";
import Hamburger from "../Hamburger/Hamburger";
import Menulist from "../MenuList";
// import PopUpNotification from "../PopUpNotification/PopUpNotification";
import { Button, Typography } from "@/app/_components";
import HeaderLogo from "@/app/_components/Header/HeaderLogo";
import { Option } from "@/app/_components/Dropdown";

import styles from "./Header.module.scss";
import PromoSnackbar from "../PromoSnackbar";
import CartButton from "../CartButton";
import CartDrawer from "../CartDrawer/indexLegacy";

const cx = classnames.bind(styles);

const Header: FC<HeaderProps> = ({
  data,
  frontPageID,
  translatedPages,
  elevation = 0,
}) => {
  // const router = useRouter();
  // const selectedLanguage = router.locale;
  const selectedLanguage = "es";
  // let translatedUrlFr = fixInvalidLink(`${router.basePath}/fr`);
  // let translatedUrlEn = fixInvalidLink(`${router.basePath}/`);

  // if (translatedPages) {
  //   if (translatedPages.fr) {
  //     translatedUrlFr = convertLink(translatedPages.fr);
  //   }
  //   if (translatedPages.en) {
  //     translatedUrlEn = convertLink(translatedPages.en);
  //   }
  // }
  type HeaderVariant = "default" | "scrolled";

  const {
    buttonItems,
    dropdownItems,
    menuDataPrimary,
    menuDataSecondary,
    logos,
  } = data;

  const [currentVariant, setCurrentVariant] =
    useState<HeaderVariant>("default");
  const [hamburgerIsActive, setHamburgerIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Función para manejar la selección de la opción
  const handleDropdownToggle = (option: Option) => {
    setSelectedOption(option); // Actualiza el estado con la opción seleccionada
    console.log(`Opción seleccionada:`, option);
  };

  // Crea un objeto de mapeo para dropdownItems
  const dropdownMapping = dropdownItems.reduce((acc, item) => {
    acc[item.id] = item; // Mapeamos cada item por su id
    return acc;
  }, {} as Record<string, (typeof dropdownItems)[0]>);

  // Crea un objeto de mapeo para buttonItems
  const buttonMapping = buttonItems.reduce((acc, item) => {
    acc[item.id] = item; // Mapeamos cada item por su id
    return acc;
  }, {} as Record<string, (typeof buttonItems)[0]>);

  // const closeDropdowns = () => {
  //   setDropdownStates({ bookNow: false, int: false, giftCards: false });
  // };

  const toggleMenu = () => {
    setHamburgerIsActive(!hamburgerIsActive);
    // closeDropdowns();
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setCurrentVariant("scrolled"); // Cambia a 'scrolled' cuando hay scroll
  //     } else {
  //       setCurrentVariant("default"); // Cambia a 'default' cuando no hay scroll
  //     }
  //   };

  //   if (typeof window !== "undefined") {
  //     document.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       document.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  const closeMenu = () => {
    setHamburgerIsActive(false);
  };

  const elevationClass = cx({
    "header--elevation-0": elevation === 0,
    "header--elevation-1": elevation === 1,
    "header--elevation-2": elevation === 2,
    "header--elevation-3": elevation === 3,
    "header--elevation-4": elevation === 4,
    "header--elevation-5": elevation === 5,
  });

  return (
    <header
      key={"router.asPath"}
      className={cx("header", elevationClass, {
        // default: currentVariant === "default",
        // light: currentVariant === "scrolled",
        open: hamburgerIsActive,
      })}
    >
      {/* <div className={cx("light-overlay")}></div> */}

      <div className={cx("header__inner-wrapper")}>
        <div className={cx("header__mobile-actions")}>
          <CartButton />
          <div
            className={cx("header__hamburger-container")}
            onClick={toggleMenu}
          >
            <Hamburger
              // dark={menuIsLight || headerDark}
              dark={false}
              active={hamburgerIsActive}
            />
          </div>
        </div>

        {/* <div className={cx("header__nav")}> */}
        <div className={cx("header__logo-container")}>
          <HeaderLogo
            data={logos}
            closeMenu={closeMenu}
            variant={currentVariant}
          />
        </div>

        <div className={cx("header__menu--primary")}>
          <Menulist
            // frontPageID={frontPageID}
            frontPageID={1}
            data={menuDataPrimary}
            onClick={closeMenu}
            useActiveStyle
          />
        </div>

        <div className={cx("header__menu--secondary")}>
          {currentVariant !== "scrolled" && (
            <Menulist
              frontPageID={1}
              data={menuDataSecondary}
              onClick={closeMenu}
              useActiveStyle
              // frontPageID={frontPageID}
            />
          )}
          {/* Add CartIcon here */}
          <CartButton />
        </div>
      </div>

      <div className={cx("mobile")}>
        <div className={cx("mobile__header")}>
          <div
            className={cx("mobile__hamburger-container")}
            onClick={toggleMenu}
          >
            <Hamburger
              // dark={menuIsLight || headerDark}
              dark={false}
              active={hamburgerIsActive}
            />
          </div>
        </div>

        <div className={cx("mobile__menu")}>
          <Menulist
            data={[...data.menuDataPrimary, ...data.menuDataSecondary]}
            onClick={closeMenu}
            // frontPageID={frontPageID}
            frontPageID={1}
            useActiveStyle={false}
          />
        </div>
      </div>

      {/* <PopUpNotification props={props} /> */}

      <PromoSnackbar />
    </header>
  );
};

export default Header;
