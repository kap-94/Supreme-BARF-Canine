// not-found.tsx
import React from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import { Typography, Button } from "@/app/_components";
import styles from "./not-found.module.scss";

const cx = classNames.bind(styles);

const NotFound: React.FC = () => {
  return (
    <section className={cx("not-found")}>
      <div className={cx("not-found__content")}>
        <div className={cx("not-found__header")}>
          <Typography variant="h1" align="center">
            404
          </Typography>
          <Typography variant="h2" align="center">
            Página No Encontrada
          </Typography>
        </div>

        <div className={cx("not-found__message")}>
          <Typography variant="p1" align="center">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </Typography>
          <Typography variant="p1" align="center">
            Por favor, verifica la URL o regresa a la página principal.
          </Typography>
        </div>

        <Link href="/" className={cx("not-found__button-wrapper")}>
          <Button
            variant="accent"
            size="large"
            className={cx("not-found__button")}
            icon={{ source: "lucide", name: "arrowRight" }}
          >
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
