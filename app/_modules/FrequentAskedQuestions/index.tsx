// FAQ.tsx
import React from "react";
import classNames from "classnames/bind";
import { Accordion, SectionHeader } from "@/app/_components";
import styles from "./FrequentAskedQuestions.module.scss";

const cx = classNames.bind(styles);

const accordionData = {
  title: "Preguntas Frecuentes",
  subtitle: "Encuentra respuestas a las dudas más comunes",
  questions: [
    {
      id: "natural-food",
      title: "¿Por qué preferir un alimento natural?",
      content: `Al igual que los humanos, nuestros amigos peludos también se benefician ampliamente de una alimentación más natural. Un alimento natural, como SUPREME, es más fresco y rico en nutrientes esenciales. Lo anterior, aunado a la ausencia de aditivos artificiales y harinas ultra procesadas, favorece una mejor digestión, piel y pelaje saludables, y más energía.`,
    },
    {
      id: "cooked-vs-raw",
      title: "¿Por qué preferir un alimento cocido a uno crudo?",
      content: `Si bien los perros descienden de los lobos, lo cierto es que ambas especies se separaron hace millones de años y los perros llevan mucho tiempo ingiriendo alimentos con algún grado de cocción.
      Sabemos que existen opciones crudas en el mercado, sin embargo, un alimento cocido, como SUPREME, ofrece importantes beneficios en contraste, como una mayor digestibilidad y seguridad al eliminar patógenos presentes en ingredientes crudos, evitando el riesgo de contaminación bacteriana y malos olores. También permite una mejor absorción de nutrientes específicos debido al proceso de cocción.`,
    },
    {
      id: "can-eat-supreme",
      title: "¿Mi perro puede comer Supreme BARF Canine?",
      content: `¡Claro! Todos los perros son aptos para consumir SUPREME, las diferencias entre cada perro estarán en la porción diaria que deberás darle, dependiendo de factores como su peso, edad, nivel de actividad, esterilización y si se encuentra en etapa gestante o lactante. ¡Te invitamos a utilizar nuestra calculadora de alimento!`,
    },
    {
      id: "how-to-buy",
      title: "¿Cómo puedo comprar Supreme BARF Canine?",
      content: `Puedes hacer tu pedido en nuestra tienda en línea o comunicarte con nosotros a través de WhatsApp. Una vez hecho tu pedido, pediremos que confirmes el pago y coordinaremos la entrega a domicilio de tu pedido. Verifica que tu ciudad se encuentre dentro de nuestro rango de entregas.
      Aceptamos pagos con tarjeta (tienda en línea) y transferencias (comunícate a nuestro WhatsApp).`,
    },
    {
      id: "returns-policy",
      title: "¿Cuál es la política de devoluciones?",
      content: `Nuestra política de devoluciones dura 30 días en casos de algún defecto con el alimento. Si han pasado más de 30 días desde tu compra, lamentablemente no podemos ofrecerte un reembolso o cambio. Una vez que solicites el cambio o devolución, te pediremos que nos hagas entrega de la bolsa que tiene un defecto.`,
    },
    {
      id: "storage",
      title: "¿Cómo conservar mi bolsa de SUPREME?",
      content: `Por tratarse de un alimento natural, tus bolsas de SUPREME deberán permanecer en refrigeración en todo momento. Dentro del refrigerador, nuestras bolsas durarán, por lo menos, 30 días y si decides congelarlas, durarán aún más. Solo te sugerimos que las pongas en el refrigerador por lo menos un día antes de dárselas a tu peludo.`,
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
