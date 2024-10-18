import Link from "next/link";
import Image from "next/image";
import classnames from "classnames/bind";
import styles from "./HeaderLogo.module.scss";

const cx = classnames.bind(styles);

interface Logo {
  href: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Logos {
  defaultLogo: Logo;
  light: Logo;
  lightMobile: Logo;
  dark: Logo;
}

// Props que se recibirán en el componente HeaderLogo
interface HeaderLogoProps {
  data: Logos;
  closeMenu: () => void; // Función que cierra el menú
  variant: "default" | "scrolled"; // Agregamos la prop variant
}

// Función que renderiza un logo
const renderLogo = (logo: Logo | undefined, className: string) => {
  if (!logo) return null;

  return (
    <Image
      // layout="fixed"
      priority
      className={cx(className)}
      src={logo.url}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
    />
  );
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  data,
  closeMenu,
  variant,
}) => {
  const { defaultLogo, dark, light, lightMobile } = data || {};

  // Puedes aplicar una clase o lógica basada en la variante del header
  return (
    <div
      className={cx("header__logo-container", {
        scrolled: variant === "scrolled",
      })}
    >
      <Link href="/" className={cx("logo")} onClick={closeMenu}>
        {renderLogo(defaultLogo, "logo__default")}
        {renderLogo(light, "logo__light")}
        {renderLogo(lightMobile, "logo__lightMobile")}
        {renderLogo(dark, "logo__dark")}
      </Link>
    </div>
  );
};

export default HeaderLogo;
