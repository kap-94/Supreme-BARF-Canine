// PrivacyPolicy.tsx
import React from "react";
import { Metadata } from "next";
import classNames from "classnames/bind";
import { SectionHeader, Typography } from "@/app/_components";
import styles from "./PrivacyPolicy.module.scss";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Política de privacidad",
};

const PrivacyPolicy: React.FC = () => {
  return (
    <section className={cx("privacy-policy")}>
      <SectionHeader
        title="Política de Privacidad"
        subtitle="Tu privacidad es importante para nosotros"
        align="center"
        className={cx("privacy-policy__header")}
      />

      <div className={cx("privacy-policy__content")}>
        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">1. Información que recolectamos</Typography>
          <Typography variant="p1">
            En nuestra página web, recolectamos información personal que tú nos
            proporcionas directamente cuando realizas una compra, te registras
            para recibir nuestras noticias o te pones en contacto con nuestro
            equipo de atención al cliente. Esto incluye datos como tu nombre,
            dirección, correo electrónico, número de teléfono y detalles de
            pago. Además, podemos recolectar información automáticamente
            relacionada con el uso del sitio, como tu dirección IP, tipo de
            navegador y las páginas que visitas.
          </Typography>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">
            2. Cómo utilizamos tu información
          </Typography>
          <Typography variant="p1">
            Utilizamos la información que recolectamos para diversos fines,
            como:
          </Typography>
          <ul>
            <li>
              <Typography variant="p2">
                Procesar y gestionar tus pedidos de comida para perros.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Enviarte actualizaciones sobre tu pedido y comunicaciones
                promocionales si has optado por recibirlas.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Mejorar nuestra página web, productos y servicios, basándonos en
                las interacciones y el comportamiento de los usuarios.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Cumplir con nuestras obligaciones legales y proteger nuestros
                derechos en caso de disputas.
              </Typography>
            </li>
          </ul>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">3. Compartir tu información</Typography>
          <Typography variant="p1">
            No vendemos ni compartimos tu información personal con terceros para
            fines comerciales. Sin embargo, podemos compartir tu información
            con:
          </Typography>
          <ul>
            <li>
              <Typography variant="p2">
                Proveedores de servicios necesarios para procesar pagos,
                realizar envíos o manejar comunicaciones.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Autoridades legales en cumplimiento de las normativas vigentes,
                en caso de requerirse.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Servicios de análisis y marketing, siempre en el contexto de
                mejorar nuestra web y brindarte una mejor experiencia.
              </Typography>
            </li>
          </ul>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">4. Seguridad de tu información</Typography>
          <Typography variant="p1">
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger tu información personal frente a accesos no autorizados,
            pérdida o alteración. Estas medidas incluyen el uso de tecnología
            SSL para la transmisión segura de datos y almacenamiento en
            servidores protegidos.
          </Typography>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">
            5. Cookies y tecnologías similares
          </Typography>
          <Typography variant="p1">
            Utilizamos cookies y otras tecnologías de seguimiento para mejorar
            tu experiencia de usuario, personalizar contenido y analizar el uso
            de nuestra página. Puedes gestionar tus preferencias de cookies
            directamente en tu navegador.
          </Typography>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">6. Derechos del usuario</Typography>
          <Typography variant="p1">
            Tienes derecho a acceder, corregir o eliminar tu información
            personal en cualquier momento. Si deseas ejercer estos derechos o
            tienes preguntas sobre nuestra política de privacidad, puedes
            ponerte en contacto con nuestro equipo de atención al cliente a
            través de los datos de contacto proporcionados en esta página.
          </Typography>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">7. Cambios en esta política</Typography>
          <Typography variant="p1">
            Nos reservamos el derecho de actualizar esta política de privacidad
            en cualquier momento para reflejar cambios en nuestras prácticas o
            en las leyes aplicables. Te notificaremos sobre cualquier cambio
            significativo y te recomendamos revisar esta página periódicamente.
          </Typography>
        </section>

        <section className={cx("privacy-policy__section")}>
          <Typography variant="h4">8. Contacto</Typography>
          <Typography variant="p1">
            Si tienes alguna pregunta o inquietud sobre nuestra Política de
            Privacidad o el manejo de tu información personal, no dudes en
            contactarnos:
          </Typography>

          <div className={cx("privacy-policy__contact")}>
            <Typography variant="p1">
              Email: supremebarfcanine@gmail.com
            </Typography>
            <Typography variant="p1">Teléfono: +52 5649395148</Typography>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
