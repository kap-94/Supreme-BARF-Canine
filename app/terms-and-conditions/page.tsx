// TermsAndConditions.tsx
import React from "react";
import classNames from "classnames/bind";
import { SectionHeader, Typography } from "@/app/_components";
import styles from "./TermsAndConditions.module.scss";
import { Metadata } from "next";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Términos y condiciones",
};

const TermsAndConditions: React.FC = () => {
  return (
    <section className={cx("terms-and-conditions")}>
      <SectionHeader
        title="Términos y Condiciones"
        subtitle="Por favor, lee cuidadosamente nuestros términos"
        align="center"
        className={cx("terms-and-conditions__header")}
      />

      <div className={cx("terms-and-conditions__content")}>
        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">
            1. Aceptación de los Términos de Uso
          </Typography>
          <Typography variant="p1">
            Al acceder y utilizar nuestro sitio web, aceptas estar sujeto a
            estos Términos y Condiciones. Si no estás de acuerdo con todos los
            términos, por favor, no utilices nuestros servicios.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">2. Elegibilidad</Typography>
          <Typography variant="p1">
            Debes tener al menos 18 años para usar nuestros servicios. Si eres
            menor de 18 años, solo puedes usar el sitio bajo la supervisión de
            un padre o tutor legal.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">3. Conductas Prohibidas</Typography>
          <Typography variant="p1">
            Te comprometes a no utilizar el sitio para publicar o transmitir
            contenido ilegal, ofensivo, difamatorio o que infrinja derechos de
            terceros. Esto incluye, pero no se limita a, la publicación de
            contenido que viole derechos de autor, marcas registradas u otros
            derechos de propiedad intelectual.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">4. Propiedad Intelectual</Typography>
          <Typography variant="p1">
            Todos los contenidos del sitio, incluyendo textos, gráficos, logos,
            imágenes y software, son propiedad de Supreme BARF Canine o de sus
            licenciantes y están protegidos por las leyes de propiedad
            intelectual aplicables.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">5. Enlaces a Sitios de Terceros</Typography>
          <Typography variant="p1">
            Nuestro sitio puede contener enlaces a sitios web de terceros. No
            somos responsables del contenido ni de las prácticas de privacidad
            de dichos sitios. Te recomendamos leer los términos y políticas de
            privacidad de cualquier sitio de terceros que visites.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">6. Privacidad</Typography>
          <Typography variant="p1">
            Tu uso del sitio está sujeto a nuestra{" "}
            <a href="/privacy-policy" target="_self">
              Política de Privacidad
            </a>
            . Por favor, revisa nuestra política para entender nuestras
            prácticas.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">7. Uso del Servicio</Typography>
          <Typography variant="p1">
            Al utilizar nuestros servicios, te comprometes a seguir todas las
            leyes y regulaciones aplicables. No utilizarás los servicios para
            ningún propósito ilegal o no autorizado.
          </Typography>
          {/* <Typography variant="p1">
            Te responsabilizas de mantener la confidencialidad de tu cuenta y
            contraseña, así como de todas las actividades que ocurran bajo tu
            cuenta.
          </Typography> */}
        </section>

        {/* <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">8. Terminación de la Cuenta</Typography>
          <Typography variant="p1">
            Podemos suspender o terminar tu cuenta y acceso a nuestros servicios
            en cualquier momento, sin previo aviso, por cualquier motivo,
            incluyendo pero no limitado a, incumplimiento de estos Términos y
            Condiciones.
          </Typography>
          <Typography variant="p1">
            Tras la terminación, cesarás todo derecho a usar nuestros servicios
            y puedes eliminar toda la información asociada a tu cuenta.
          </Typography>
        </section> */}

        {/* <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">9. Indemnización</Typography>
          <Typography variant="p1">
            Aceptas indemnizar, defender y eximir de responsabilidad a Supreme
            BARF Canine, sus subsidiarias, afiliadas, licenciantes y cesionarios
            y sus respectivos funcionarios, directores, gerentes, agentes,
            socios y empleados, de y contra todas y cada una de las pérdidas,
            responsabilidades, reclamos, daños y demandas, incluidos, entre
            otros, los honorarios razonables de abogados, realizados por un
            tercero debido a:
          </Typography>
          <ul>
            <li>
              <Typography variant="p2">
                Tu acceso y/o uso del sitio y los servicios, incluyendo
                cualquier contenido, servicio y/o productos ofrecidos por el
                mismo o en conexión con el mismo.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Una violación o incumplimiento por parte tuya o cualquier
                usuario de tu cuenta, de cualquiera de los términos de estos
                Términos y Condiciones, incluyendo, entre otros, el
                incumplimiento de cualquiera de las representaciones, garantías
                o acuerdos establecidos en estos Términos.
              </Typography>
            </li>
            <li>
              <Typography variant="p2">
                Cualquier contenido que publiques a través del sitio o los
                servicios, incluyendo, sin limitación, cualquier reclamo de que
                tu contenido, en su totalidad o en parte, causó daños a un
                tercero.
              </Typography>
            </li>
          </ul>
        </section> */}

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">8. Descuentos</Typography>
          <Typography variant="p1">
            Ofrecemos un descuento inicial que se aplica una vez por cliente y
            es válido para un máximo de cinco (5) paquetes de producto. Este
            descuento no es acumulable con otras promociones, ofertas o
            descuentos especiales.
          </Typography>
          <Typography variant="p1">
            Para aprovechar este descuento, el cliente debe realizar la compra
            de los paquetes de producto de forma simultánea y cumplir con los
            términos y condiciones específicos de la promoción vigente al
            momento de la compra.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">9. Limitación de Responsabilidad</Typography>
          <Typography variant="p1">
            Supreme BARF Canine no será responsable por ningún daño indirecto,
            incidental o consecuente que resulte del uso o la imposibilidad de
            uso de nuestros servicios, incluso si hemos sido advertidos de la
            posibilidad de dichos daños.
          </Typography>
          <Typography variant="p1">
            En ningún caso nuestra responsabilidad excederá el monto que nos
            hayas pagado, si es que has realizado algún pago, por los servicios
            proporcionados.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">10. Cambios en los Términos</Typography>
          <Typography variant="p1">
            Nos reservamos el derecho de modificar estos Términos y Condiciones
            en cualquier momento. Cualquier cambio será efectivo inmediatamente
            después de su publicación en el sitio.
          </Typography>
          <Typography variant="p1">
            Te recomendamos revisar estos términos periódicamente para estar al
            tanto de cualquier cambio. El uso continuo de nuestros servicios
            después de la publicación de cambios constituye tu aceptación de
            dichos cambios.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">11. Ley Aplicable y Jurisdicción</Typography>
          <Typography variant="p1">
            Estos Términos y Condiciones se regirán e interpretarán de
            conformidad con las leyes de México, sin tener en cuenta sus
            disposiciones sobre conflictos de leyes.
          </Typography>
          <Typography variant="p1">
            Cualquier disputa que surja de estos Términos y Condiciones o tu
            acceso y uso del sitio y los servicios será resuelta exclusivamente
            por los tribunales ubicados en la Ciudad de México, y tú y Supreme
            BARF Canine acuerdan someterse a la jurisdicción exclusiva de dichos
            tribunales.
          </Typography>
        </section>

        <section className={cx("terms-and-conditions__section")}>
          <Typography variant="h4">12. Contacto</Typography>
          <Typography variant="p1">
            Si tienes preguntas o comentarios sobre estos Términos y
            Condiciones, por favor contáctanos:
          </Typography>
          <div className={cx("terms-and-conditions__contact")}>
            <Typography variant="p1">
              Email: supremebarfcanine@gmail.com
            </Typography>
            <Typography variant="p1">Teléfono: +52 2228938475</Typography>
          </div>
        </section>
      </div>
    </section>
  );
};

export default TermsAndConditions;
