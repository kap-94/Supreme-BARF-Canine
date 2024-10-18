import { FooterProps } from "../_components/Footer/Footer";
import { HeaderProps } from "../_components/Header/interfaces";

export const payloadPrimary: HeaderProps = {
  frontPageID: "38",
  data: {
    menuDataPrimary: [
      {
        menu_item_id: 738,
        menu_item_parent: 0,
        title: "¿Qué es supreme barf canine?",
        target: "#about",
        url: "#about",
        isSectionLink: true,
        // icon: "boat",
      },
      {
        menu_item_id: 739,
        menu_item_parent: 0,
        title: "Calculadora de alimento",
        url: "#benefits",
        target: "#benefits",
        // icon: "book",
      },
      {
        menu_item_id: 740,
        menu_item_parent: 0,
        title: "Productos",
        target: "#product-grid",
        url: "#product-grid",
        // icon: "book",
      },
      {
        menu_item_id: 740,
        menu_item_parent: 0,
        title: "Preguntas Frecuentes",
        target: "#",
        url: "#",
        // icon: "book",
      },

      // Submenu items for "Destinations"
    ],
    menuDataSecondary: [
      {
        menu_item_id: 741,
        menu_item_parent: 0,
        title: "Tienda en línea",
        target: "/tienda",
        url: "/tienda",
        // icon: "clock",
      },
      {
        menu_item_id: 742,
        menu_item_parent: 0,
        title: "Contacto",
        target: "/#contacto",
        url: "/#contacto",
        // icon: "clock",
      },
    ],
    dropdownItems: [
      {
        id: "lenguages",
        options: [
          { label: "EN", value: "EN" },
          { label: "ES", value: "ES" },
        ],
        selected: { label: "EN", value: "EN" },
      },
    ],
    buttonItems: [
      {
        id: "sign-in",
        children: "SIGN IN",
      },
    ],
    logos: {
      defaultLogo: {
        // url: "https://login.scandinave.com/wp-content/uploads/2022/10/logo-1-1.svg",
        url: "/logo.png",
        href: "/#",
        alt: "logo",
        width: 74,
        height: 80,
      },
      light: {
        // url: "https://login.scandinave.com/wp-content/uploads/2022/10/logo-1-1.svg",
        url: "/logo.png",
        href: "/#",
        alt: "logo",
        width: 64,
        height: 64,
      },
      lightMobile: {
        url: "/logo.png",
        href: "/#",
        alt: "logo",
        height: 46,
        width: 46,
      },
      dark: {
        url: "/logo.png",
        href: "/#",
        alt: "logo",
        height: 46,
        width: 46,
      },
      // {
      //   id: 815,
      //   title: "logo-light-sm",
      //   url: "https://login.scandinave.com/wp-content/uploads/2022/09/logo-light-sm.svg",
      //   link: "https://login.scandinave.com/logo-light-sm/",
      //   alt: "logo",
      //   caption: "",
      // },
    },
  },
};

export const footerPayload: FooterProps = {
  footerMenuDataPrimary: [
    // { name: "Destinos", link: "/destinos" },
    // { name: "Itinerarios", link: "/itinerarios" },
    // { name: "Sobre Nosotros", link: "/sobre-nosotros" },
    // { name: "Contacto", link: "/contacto" },
    // { name: "Blog", link: "/blog" },

    {
      menu_item_id: 737,
      menu_item_parent: 0,
      title: "Inicio",
      target: "/#",
      url: "/#",
      showDropdownIcon: false,
    },
    {
      menu_item_id: 738,
      menu_item_parent: 0,
      title: "¿Qué es supreme barf canine?",
      target: "/#descripcion",
      url: "/#descripcion",
      // icon: "boat",
    },
    {
      menu_item_id: 739,
      menu_item_parent: 0,
      title: "Cantidades",
      target: "/#cantidades",
      url: "/#cantidades",
      // icon: "book",
    },
    {
      menu_item_id: 740,
      menu_item_parent: 0,
      title: "Productos",
      target: "/#productos",
      url: "/#productos",
      // icon: "book",
    },

    // Submenu items for "Destinations"
  ],
  footerMenuDataSecondary: [
    {
      menu_item_id: 739,
      menu_item_parent: 0,
      title: "Facebook",
      target: "/",
      url: "/",
      icon: "facebook",
    },
    {
      menu_item_id: 738,
      menu_item_parent: 0,
      title: "Tiktok",
      target: "/",
      url: "/",
      icon: "tiktok",
    },
    {
      menu_item_id: 737,
      menu_item_parent: 0,
      title: "Instagram",
      target: "/",
      url: "/",
      icon: "instagram",
    },
  ],
  frontPageID: "12345",
  options: {
    copyright_name:
      "© 2024 Supreme BARF Canine. All rights reserved. | Built By KAgency",
    logo: {
      url: "/logo.png",
      alt: "Supreme BARF Canine",
      width: 74,
      height: 80,
    },
    social_links: [
      {
        site: "Facebook",
        icon: "facebook",
        link: "https://www.facebook.com/KotahiTravel", // Corrected link to actual Facebook page
      },
      {
        site: "Instagram",
        icon: "instagram",
        link: "https://www.instagram.com/KotahiTravel",
      },
      {
        site: "Tiktok",
        icon: "tiktok",
        link: "https://www.twitter.com/KotahiTravel",
      },
      {
        site: "Youtube",
        icon: "youtube",
        link: "https://www.tiktok.com/@KotahiTravel",
      },
    ],
  },
};
