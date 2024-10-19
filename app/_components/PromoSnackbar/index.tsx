import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components";
import styles from "./PromoSnackbar.module.scss";

const cx = classNames.bind(styles);

const PromoSnackbar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lista de anuncios para el slider
  const announcements = [
    "30% de descuento en el primer pedido!",
    "Envío gratis en compras superiores a $50",
    "¡Nuevas recetas para el bienestar de tu perro!",
  ];

  //   // Cambiar anuncio cada 5 segundos (5000ms)
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }, 8000);

  //     // Limpiar el intervalo cuando el componente se desmonte
  //     return () => clearInterval(intervalId);
  //   }, [announcements.length]);

  return (
    <div className={cx("snackbar")}>
      <Typography
        variant="p1"
        color="white"
        fontWeight={600}
        style={{ fontStyle: "italic" }}
      >
        {announcements[currentIndex]} {/* Mostrar el anuncio actual */}
      </Typography>
    </div>
  );
};

export default PromoSnackbar;
