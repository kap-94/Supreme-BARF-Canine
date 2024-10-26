"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import CustomIcon, { IconName } from "../CustomIcon";
import { MenuList, Typography } from "@/app/_components";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

interface Logo {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface SocialLink {
  site: string;
  icon: IconName;
  link: string;
}

interface FooterOptions {
  copyright_name: string;
  logo: Logo;
  social_links: SocialLink[];
}

export interface FooterProps {
  footerMenuDataPrimary: any[];
  footerMenuDataSecondary: any[];
  footerPoliticsData: any[];
  frontPageID: string;
  options: FooterOptions;
}

const Footer: FC<FooterProps> = ({
  footerMenuDataPrimary,
  footerMenuDataSecondary,
  footerPoliticsData,
  frontPageID,
  options: { logo, social_links, copyright_name },
}) => {
  const year = new Date().getFullYear();

  // Renderizar enlaces sociales
  const socialLinks = social_links?.map((link, i) => (
    <Link key={i} href={link.link} target="_blank" rel="noreferrer">
      <CustomIcon icon={link.icon} width={24} height={24} color="white" />
    </Link>
  ));

  return (
    <div id="footer" className={cx("footer__container")}>
      <footer className={cx("footer")}>
        <Link href="/" passHref className={cx("footer__logo")}>
          {logo && (
            <Image
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          )}
          <div className={cx("footer__copyright")}>
            <Typography variant="p3">
              © {year}
              {copyright_name}
            </Typography>
          </div>
        </Link>

        <div className={cx("footer__links")}>
          {footerMenuDataPrimary.length > 0 && (
            <MenuList
              data={footerMenuDataPrimary}
              frontPageID={1}
              orientation="vertical"
              gap={16}
            />
          )}
        </div>

        <div className={cx("footer__links")}>
          {footerMenuDataSecondary.length > 0 && (
            <MenuList
              data={footerMenuDataSecondary}
              frontPageID={1}
              orientation="vertical"
            />
          )}
        </div>

        {/* Formulario de suscripción al newsletter con ícono de envío */}
        <div className={cx("footer__legal")}>
          {/* <Typography
            variant="p3"
            textTransform="uppercase"
            className={cx("newsletter__title")}
          >
            Subscríbete a nuestro newsletter
          </Typography>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Email inválido")
                .required("Este campo es obligatorio"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // Manejar el envío del formulario
              console.log("Email suscrito:", values.email);
              // Aquí puedes hacer la llamada a tu API para procesar la suscripción
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className={cx("newsletter__form")}>
                <div className={cx("newsletter__input-wrapper")}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Tu correo electrónico"
                    className={cx("newsletter__input")}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cx("newsletter__icon-button")}
                  >
                    <CustomIcon
                      icon="right-arrow" // Asegúrate de tener un icono llamado 'send' en tu componente CustomIcon
                      width={24}
                      height={24}
                      color="white"
                    />
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={cx("newsletter__error")}
                />
              </Form>
            )}
          </Formik> */}

          {footerPoliticsData.length > 0 && (
            <MenuList
              data={footerPoliticsData}
              frontPageID={1}
              orientation="vertical"
              gap={16}
            />
          )}
        </div>

        {/* Puedes descomentar esto si quieres mostrar los íconos sociales */}
        {/* <ul className={cx("footer__icons")}>{socialLinks}</ul> */}
      </footer>
    </div>
  );
};

export default Footer;
