// Button.tsx
import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import Icon, { IconName } from "@/app/_components/CustomIcon";
import { Typography, Spinner } from "@/app/_components";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

// Base props para el botón
export interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  fullWidth?: boolean;
  icon?: IconName;
  onClick?: () => void;
  pill?: boolean;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent" | "link-light" | "link-dark";
  isLoading?: boolean; // Nueva prop isLoading
}

// Props cuando el variant es "link-light" o "link-dark" (href es obligatorio)
interface LinkVariantProps extends ButtonBaseProps {
  variant: "link-light" | "link-dark";
  href: string; // href es obligatorio para estos variants
  isDisabled?: never; // isDisabled no es válido para enlaces
}

// Props para todos los otros variants
interface NonLinkVariantProps extends ButtonBaseProps {
  variant?: "primary" | "secondary" | "accent";
  href?: undefined;
  isDisabled?: boolean; // Nueva prop isDisabled solo para botones no enlazados
}

// Unión de tipos para definir los props del botón
export type ButtonProps = LinkVariantProps | NonLinkVariantProps;

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    size = "medium",
    type = "button",
    variant = "primary",
    children,
    className = "",
    isDisabled = false, // Nueva prop isDisabled
    fullWidth = false,
    icon,
    onClick,
    pill = false,
    style,
    elevation = 0,
    href,
    isLoading = false, // Valor por defecto para isLoading
  }) => {
    // Solo aplicamos isDisabled si está definido (solo para NonLinkVariantProps)
    const actualDisabled = isDisabled || isLoading;

    const buttonClasses = cx(
      "button",
      `button--${size}`,
      `button--${variant}`,
      `button--elevation-${elevation}`,
      {
        "button--full-width": fullWidth,
        "button--pill": pill,
        "button--loading": isLoading,
      },
      className
    );

    // Retorna un Link para los variants "link-light" o "link-dark"
    if ((variant === "link-light" || variant === "link-dark") && href) {
      return (
        <a
          href={href}
          className={buttonClasses}
          style={style}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography
            variant="p1"
            fontFamily="raleway"
            fontWeight={800}
            className={cx("button__text")}
          >
            {children}
          </Typography>
          {isLoading ? (
            <Spinner variant="button" className={cx("button__spinner")} />
          ) : (
            icon && (
              <Icon
                icon={icon}
                height={32}
                width={32}
                className={cx("button__icon")}
              />
            )
          )}
        </a>
      );
    }

    // Botón regular
    return (
      <button
        type={type}
        className={buttonClasses}
        style={style}
        onClick={onClick}
        disabled={actualDisabled} // Deshabilitar si está cargando o isDisabled
        aria-busy={isLoading}
      >
        <Typography
          variant="p1"
          fontFamily="poppins"
          fontWeight={700}
          className={cx("button__text")}
        >
          {children}
        </Typography>
        {isLoading ? (
          <Spinner variant="button" className={cx("button__spinner")} />
        ) : (
          icon && (
            <Icon
              icon={icon}
              height={20}
              width={20}
              className={cx("button__icon")}
            />
          )
        )}
      </button>
    );
  }
);

export default Button;
