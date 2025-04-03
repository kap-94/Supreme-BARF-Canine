import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import whatsappImage from "@/public/whatsapp.png";
import {
  Benefits,
  Hero,
  ProductGrid,
  FoodCalculator,
  FrequentAskedQuestions,
  Contact,
} from "./_modules";
import styles from "@/app/page.module.scss";
import FeaturedProducts from "./_components/FeaturedProducts";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Supreme BARF Canine | Alimentación BARF y Comida Natural para Perros",
  description:
    "La mejor dieta BARF para perros en México. Conoce nuestra comida natural y balanceada, preparada con ingredientes 100% reales y supervisada por veterinarios. Mejora la salud y el bienestar de tu mascota con Supreme BARF Canine.",
  keywords: [
    "Supreme BARF Canine",
    "alimento para perros",
    "comida natural perros",
    "dieta BARF",
    "alimentación canina",
    "nutrición canina",
    "comida cruda para perros",
    "BARF México",
    "alimento natural mascotas",
    "salud canina",
  ],
};

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <FeaturedProducts />
        <FoodCalculator />
        <FrequentAskedQuestions />
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
