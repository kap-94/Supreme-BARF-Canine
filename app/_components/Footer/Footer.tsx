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
            <Typography variant="p3" color="white">
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

        <div className={cx("footer__legal")}>
          {footerPoliticsData.length > 0 && (
            <MenuList
              data={footerPoliticsData}
              frontPageID={1}
              orientation="vertical"
              gap={16}
            />
          )}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
