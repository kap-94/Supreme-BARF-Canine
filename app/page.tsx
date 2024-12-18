import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import whatsappImage from "@/public/whatsapp.png";
import {
  About,
  Benefits,
  Hero,
  ProductGrid,
  FoodCalculator,
  FrequentAskedQuestions,
  Contact,
} from "./_modules";
import styles from "@/app/page.module.scss";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Supreme BARF Canine | Alimento Natural para Perros",
  description:
    "Alimentación natural y saludable para perros. Dieta BARF de alta calidad, elaborada por expertos veterinarios. Mejora la salud y vitalidad de tu mascota con ingredientes 100% naturales.",
  keywords: [
    "Supreme BARF Canine",
    "alimento para perros",
    "dieta BARF",
    "comida natural perros",
    "alimentación canina",
    "nutrición canina",
    "comida cruda para perros",
    "BARF México",
    "alimento natural mascotas",
    "salud canina",
  ],
  openGraph: {
    title: "Supreme BARF Canine | Alimento Natural para Perros",
    description:
      "Alimentación natural y saludable para perros. Dieta BARF de alta calidad, elaborada por expertos veterinarios.",
    url: "https://www.supremebarfcanine.com",
    siteName: "Supreme BARF Canine",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supreme BARF Canine | Alimento Natural para Perros",
    description:
      "Alimentación natural y saludable para perros. Dieta BARF de alta calidad.",
  },
  alternates: {
    canonical: "https://www.supremebarfcanine.com",
  },
};

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <About />
        <ProductGrid />
        <Benefits />
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
