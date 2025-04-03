// app/_components/Breadcrumbs/Breadcrumbs.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./Breadcrumbs.module.scss";

const cx = classNames.bind(styles);

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  const pathname = usePathname();

  return (
    <nav aria-label="Breadcrumb" className={cx("breadcrumbs", className)}>
      <ol className={cx("breadcrumbs__list")}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.current || pathname === item.href;

          return (
            <li
              key={item.href}
              className={cx("breadcrumbs__item", {
                "breadcrumbs__item--active": isActive,
              })}
            >
              {!isLast ? (
                <>
                  <Link
                    href={item.href}
                    className={cx("breadcrumbs__link", {
                      "breadcrumbs__link--active": isActive,
                    })}
                  >
                    {item.label}
                  </Link>
                  <span className={cx("breadcrumbs__separator")}>/</span>
                </>
              ) : (
                <span className={cx("breadcrumbs__current")}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
