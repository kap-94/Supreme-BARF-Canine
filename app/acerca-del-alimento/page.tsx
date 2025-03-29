// app/acerca-del-alimento/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import whatsappImage from "@/public/whatsapp.png";

// Estos módulos son los mismos que tenías en la página de "nosotros".
// Asegúrate de que tus importaciones coincidan con tu estructura actual.
import { About, Benefits, Contact } from "../_modules";
import styles from "./AboutPage.module.scss";
import NutritionalData from "../_modules/NutritionalData";
import VeterinaryValidation from "../_modules/VeterinaryValidation";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title:
    "Acerca del Alimento | Supreme BARF Canine: Comida Natural para Perros",
  description:
    "Conoce en detalle la formulación y beneficios del alimento natural de Supreme BARF Canine. Descubre cómo está elaborado y por qué es la mejor opción para tu mascota.",
  keywords: [
    "Supreme BARF Canine",
    "acerca del alimento",
    "dieta BARF",
    "comida natural perros",
    "nutrición canina",
    "alimentación cruda",
    "BARF México",
  ],
};

export default function AcercaDelAlimentoPage() {
  return (
    <div className={cx("page")}>
      <main>
        {/*
          Ajusta estos componentes según tu preferencia,
          por ejemplo si quieres cambiar "About" por algo
          más centrado en la descripción del producto.
        */}
        <About />
        <Benefits />
        <VeterinaryValidation />
        <NutritionalData />
        <Contact />
      </main>

      <Link
        href="https://wa.me/+5215649395148"
        target="_blank"
        rel="noopener noreferrer"
        className={cx("whatsapp-float")}
      >
        <Image src={whatsappImage} alt="WhatsApp" fill sizes="10vw" />
      </Link>
    </div>
  );
}
