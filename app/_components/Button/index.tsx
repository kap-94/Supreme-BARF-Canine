import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import Icon, { IconName } from "@/app/_components/CustomIcon";
import { Typography, Spinner } from "@/app/_components";
import styles from "./Button.module.scss";
import { LucideIcon, ArrowRight, Search, User } from "lucide-react";

const cx = classNames.bind(styles);

// Configuración para el icono
interface IconConfig {
  source: "custom" | "lucide";
  name: IconName | string;
}

// Propiedades base del botón (se agregó la prop "disabled" y se conserva "isDisabled" para compatibilidad)
export interface ButtonBaseProps {
  children: ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  fullWidth?: boolean;
  icon?: IconConfig | IconName; // Soporta tanto la nueva estructura como la anterior para retrocompatibilidad
  onClick?: () => void;
  pill?: boolean;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "accent" | "link-light" | "link-dark";
  isLoading?: boolean;
  disabled?: boolean; // NUEVA prop
  isDisabled?: boolean; // Prop antigua (mantener para compatibilidad)
}

// Props para variante de link
interface LinkVariantProps extends ButtonBaseProps {
  variant: "link-light" | "link-dark";
  href: string;
  target: "_blank" | "_self";
}

// Props para los otros variants
interface NonLinkVariantProps extends ButtonBaseProps {
  variant?: "primary" | "secondary" | "accent";
  href?: undefined;
  target?: undefined;
}

export type ButtonProps = LinkVariantProps | NonLinkVariantProps;

// Mapeo de iconos de Lucide
const LUCIDE_ICONS: { [key: string]: LucideIcon } = {
  search: Search,
  user: User,
  arrowRight: ArrowRight,
};

// Función helper para renderizar el icono
const renderIcon = (
  iconProp: IconConfig | IconName | undefined,
  className: string,
  size: { height: number; width: number }
) => {
  if (!iconProp) return null;

  // Si se pasa un string, asumimos que es un icono personalizado (retrocompatibilidad)
  if (typeof iconProp === "string") {
    return (
      <Icon
        icon={iconProp as IconName}
        height={size.height}
        width={size.width}
        className={className}
      />
    );
  }

  // Si es un objeto IconConfig y el source es "lucide"
  if (iconProp.source === "lucide") {
    const LucideIconComponent = LUCIDE_ICONS[iconProp.name];
    return LucideIconComponent ? (
      <LucideIconComponent
        className={className}
        size={size.height}
        strokeWidth={2}
      />
    ) : null;
  }

  // Para iconos personalizados
  return (
    <Icon
      icon={iconProp.name as IconName}
      height={size.height}
      width={size.width}
      className={className}
    />
  );
};

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    size = "medium",
    type = "button",
    variant = "primary",
    children,
    className = "",
    disabled,
    isDisabled,
    fullWidth = false,
    icon,
    onClick,
    pill = false,
    style,
    elevation = 0,
    href,
    isLoading = false,
    target,
  }) => {
    // Se prioriza la prop "disabled" y se utiliza "isDisabled" si no está definida
    const actualDisabled =
      (disabled !== undefined ? disabled : isDisabled) || isLoading;

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

    const iconSize =
      size === "small"
        ? { height: 14, width: 14 }
        : size === "large"
        ? { height: 20, width: 20 }
        : { height: 16, width: 16 };

    // Para variantes de link
    if ((variant === "link-light" || variant === "link-dark") && href) {
      return (
        <a
          href={href}
          className={buttonClasses}
          style={style}
          target={target}
          rel="noopener noreferrer"
          aria-disabled={actualDisabled}
          onClick={(e) => {
            if (actualDisabled) {
              e.preventDefault();
            }
          }}
        >
          <Typography
            variant="p1"
            fontWeight={800}
            className={cx("button__text")}
          >
            {children}
          </Typography>
          {isLoading ? (
            <Spinner variant="button" className={cx("button__spinner")} />
          ) : (
            renderIcon(icon, cx("button__icon"), { height: 30, width: 30 })
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
        disabled={actualDisabled}
        aria-busy={isLoading}
      >
        <Typography
          variant="p1"
          fontWeight={700}
          className={cx("button__text")}
        >
          {children}
        </Typography>
        {isLoading ? (
          <Spinner variant="button" className={cx("button__spinner")} />
        ) : (
          renderIcon(icon, cx("button__icon"), iconSize)
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
