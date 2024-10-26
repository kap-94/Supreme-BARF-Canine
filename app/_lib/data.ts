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
        url: "#about-section",
        target: "_self",
        isSectionLink: true,
      },
      {
        menu_item_id: 739,
        menu_item_parent: 0,
        title: "Beneficios",
        target: "_self",
        url: "#benefits-section",
      },
      {
        menu_item_id: 740,
        menu_item_parent: 0,
        title: "Productos",
        url: "#product-section",
        target: "_self",
      },
      {
        menu_item_id: 741,
        menu_item_parent: 0,
        title: "Calculadora de alimento",
        url: "#food-calculator-section",
        target: "_self",
      },
      {
        menu_item_id: 742,
        menu_item_parent: 0,
        title: "Preguntas Frecuentes",
        target: "_self",
        url: "#faq-section",
      },

      // Submenu items for "Destinations"
    ],
    menuDataSecondary: [
      {
        menu_item_id: 743,
        menu_item_parent: 0,
        title: "Tienda en línea",
        target: "_blank",
        url: "https://supremebarfcanine.shop/",
      },
      {
        menu_item_id: 744,
        menu_item_parent: 0,
        title: "Contacto",
        target: "_self",
        url: "#contact-section",
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
        url: "/logo-full.png",
        href: "/#",
        alt: "logo",
        width: 74,
        height: 80,
      },
      light: {
        // url: "https://login.scandinave.com/wp-content/uploads/2022/10/logo-1-1.svg",
        url: "/logo-full.png",
        href: "/#",
        alt: "logo",
        width: 64,
        height: 64,
      },
      lightMobile: {
        url: "/logo-full.png",
        href: "/#",
        alt: "logo",
        height: 46,
        width: 46,
      },
      dark: {
        url: "/logo-full.png",
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
    {
      menu_item_id: 1,
      menu_item_parent: 0,
      title: "¿Qué es supreme barf canine?",
      url: "#about-section",
      target: "_self",
      isSectionLink: true,
    },
    {
      menu_item_id: 2,
      menu_item_parent: 0,
      title: "Beneficios",
      url: "#benefits-section",
      target: "_self",
    },
    {
      menu_item_id: 3,
      menu_item_parent: 0,
      title: "Productos",
      url: "#product-section",
      target: "_self",
    },
    {
      menu_item_id: 4,
      menu_item_parent: 0,
      title: "Calculadora de alimento",
      url: "#food-calculator",
      target: "#food-calculator",
    },
    {
      menu_item_id: 5,
      menu_item_parent: 0,
      title: "Preguntas Frecuentes",
      url: "#faq-section",
      target: "_self",
    },

    // Submenu items for "Destinations"
  ],
  footerMenuDataSecondary: [
    {
      menu_item_id: 8,
      menu_item_parent: 0,
      title: "Instagram",
      target: "_blank",
      url: "https://www.instagram.com/supremebarfcanine/?hl=es",
      icon: "instagram",
    },
    {
      menu_item_id: 6,
      menu_item_parent: 0,
      title: "Facebook",
      target: "_blank",
      url: "https://www.facebook.com/profile.php?id=100077477490273",
      icon: "facebook",
    },
    // {
    //   menu_item_id: 7,
    //   menu_item_parent: 0,
    //   title: "Tiktok",
    //   target: "/",
    //   url: "/",
    //   icon: "tiktok",
    // },
  ],
  footerPoliticsData: [
    {
      menu_item_id: 9,
      menu_item_parent: 0,
      title: "Términos y condiciones",
      target: "_self",
      url: "/terms-and-conditions",
    },
    {
      menu_item_id: 10,
      menu_item_parent: 0,
      title: "Política de privacidad",
      target: "_self",
      url: "/privacy-policy",
    },
  ],
  frontPageID: "12345",
  options: {
    copyright_name:
      " Supreme BARF Canine. All rights reserved. | Built By KAgency",
    logo: {
      url: "/logo-full.png",
      alt: "Supreme BARF Canine",
      width: 74,
      height: 80,
    },
    social_links: [
      {
        site: "Facebook",
        icon: "facebook",
        link: "https://www.facebook.com", // Corrected link to actual Facebook page
      },
      {
        site: "Instagram",
        icon: "instagram",
        link: "https://www.instagram.com",
      },
    ],
  },
};
