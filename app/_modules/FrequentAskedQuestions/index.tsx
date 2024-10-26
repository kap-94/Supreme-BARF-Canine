// FAQ.tsx
import React from "react";
import classNames from "classnames/bind";
import { Accordion, SectionHeader } from "@/app/_components";
import styles from "./FrequentAskedQuestions.module.scss";

const cx = classNames.bind(styles);

// Datos para el componente Accordion
const accordionData = {
  title: "Preguntas Frecuentes",
  subtitle: "Encuentra respuestas a las dudas más comunes",
  questions: [
    {
      title: "¿Cuál es la política de devoluciones?",
      content: `Nuestra política de devoluciones dura 30 días. Si han pasado 30 días desde tu compra, lamentablemente no podemos ofrecerte un reembolso o cambio.`,
    },
    {
      title: "¿Cómo puedo rastrear mi pedido?",
      content: `Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes utilizar este número para rastrear tu pedido en el sitio web del transportista.`,
    },
    {
      title: "¿Ofrecen envío internacional?",
      content: `Sí, realizamos envíos a nivel internacional. Los tiempos de envío y costos pueden variar según el destino. Por favor, consulta nuestra página de envíos para más detalles.`,
    },
    {
      title: "¿Cómo es el proceso de compra?",
      content: `Para realizar una compra, simplemente agrega los productos que deseas al carrito y sigue los pasos del proceso de pago. Puedes registrarte para crear una cuenta o realizar la compra como invitado. Una vez confirmado el pago, recibirás un correo electrónico con los detalles de tu pedido.`,
    },
    {
      title: "¿Qué métodos de pago aceptan?",
      content: `Aceptamos varias formas de pago, incluyendo tarjetas de crédito y débito, PayPal y transferencias bancarias. Todas las transacciones son seguras y están encriptadas para proteger tu información.`,
    },
  ],
  custom_anchor_id: "seccion-preguntas-frecuentes",
};

interface FAQProps {
  customAnchorId?: string;
}

const FrequentAskedQuestions: React.FC<FAQProps> = ({
  customAnchorId = "faq-section",
}) => {
  return (
    <section className={cx("faq")} id={customAnchorId}>
      <SectionHeader
        title={accordionData.title}
        subtitle={accordionData.subtitle}
        align="center"
        className={cx("faq__header")}
      />

      <div className={cx("faq__content")}>
        <Accordion
          singleOpen
          questions={accordionData.questions}
          custom_anchor_id={accordionData.custom_anchor_id}
        />
      </div>
    </section>
  );
};

export default FrequentAskedQuestions;
