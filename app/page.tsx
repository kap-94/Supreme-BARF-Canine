import Image from "next/image";
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

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <About />
        <Benefits />
        <ProductGrid />
        <FoodCalculator />
        <FrequentAskedQuestions />
        <Contact />
      </main>

      <a
        href="https://wa.me/+5215649395148"
        className={cx("whatsapp-float")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={whatsappImage} alt="WhatsApp" fill />
      </a>
    </div>
  );
}
