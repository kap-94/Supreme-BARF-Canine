"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Mail, Phone } from "lucide-react";
import { sendContactForm } from "@/app/_lib/api";
import { getContactFormSchema } from "@/app/_lib/validationSchemas";
import {
  Alert,
  Button,
  SectionHeader,
  Snackbar,
  TextArea,
  TextField,
  Typography,
} from "@/app/_components";
import dogIllustration from "@/public/novak-2.png";
import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

const Contact: React.FC = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Add useEffect to control reCAPTCHA badge visibility
  useEffect(() => {
    // Add inline style to head to hide badge immediately
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `.grecaptcha-badge { visibility: hidden !important; opacity: 0 !important; }`;
    document.head.appendChild(styleTag);

    // Function to handle reCAPTCHA badge
    const setupRecaptchaBadge = () => {
      const badge = document.querySelector(".grecaptcha-badge") as HTMLElement;
      if (badge) {
        // Change position from fixed to absolute for the badge
        badge.style.position = "absolute";
        badge.style.bottom = "20px"; // Adjust as needed
        badge.style.right = "20px"; // Adjust as needed

        // Move the badge element into our contact section container
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
          contactSection.appendChild(badge);
          // Only after it's moved into our section, make it visible
          setTimeout(() => {
            badge.style.visibility = "visible";
            badge.style.opacity = "1";
          }, 100);
        }
      }
    };

    // Set a delay to ensure reCAPTCHA has loaded
    const timeoutId = setTimeout(setupRecaptchaBadge, 1000);

    return () => {
      clearTimeout(timeoutId);
      // Remove the style tag on unmount
      if (styleTag.parentNode) {
        styleTag.parentNode.removeChild(styleTag);
      }

      // When unmounting, move the badge back to body and hide it
      const badge = document.querySelector(".grecaptcha-badge") as HTMLElement;
      if (badge) {
        badge.style.visibility = "hidden";
        badge.style.opacity = "0";
        // Reset position to fixed (original state)
        badge.style.position = "fixed";
      }
    };
  }, []);

  const initialValues: ContactFormValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const showSnackbar = ({ message, severity }: Omit<SnackbarState, "open">) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFormSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // Ejecutar reCAPTCHA v3 y obtener el token
      const token = await executeRecaptcha?.("contact_form");

      if (!token) {
        showSnackbar({
          message: "Error al verificar reCAPTCHA",
          severity: "error",
        });
        setIsSubmitting(false);
        return;
      }

      // Enviar el formulario junto con el token reCAPTCHA
      const { status, message } = await sendContactForm({
        ...values,
        recaptchaToken: token,
      });

      // Si el estado es 200 o 201, es un éxito
      if (status >= 200 && status < 300) {
        showSnackbar({ message, severity: "success" });
      } else {
        showSnackbar({ message, severity: "error" });
      }
    } catch (error: any) {
      // En caso de error, mostrar el mensaje de error y usar severidad de error
      showSnackbar({
        message: error.message || "Hubo un problema al enviar el mensaje",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className={cx("contact")}>
      <div className={cx("contact__content")}>
        <div className={cx("contact__form")}>
          <SectionHeader
            title="¿Cómo podemos ayudarte?"
            subtitle="Contáctanos y te contestaremos a la brevedad"
            align="center"
            className={cx("contact__form-heading")}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={getContactFormSchema(false)} // Para el frontend, sin el token reCAPTCHA
            onSubmit={(values, { resetForm }) => {
              handleFormSubmit(values);
              resetForm();
            }}
          >
            {({
              values,
              errors,
              touched,
              dirty,
              isValid,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form className={cx("form")}>
                <div className={cx("form__group")}>
                  <TextField
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    variant="primary"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputClassName={cx("contact__input")}
                  />
                </div>
                <div className={cx("form__group")}>
                  <TextField
                    label="Teléfono"
                    name="phone"
                    type="text"
                    placeholder="Ej. +52 222222222"
                    variant="primary"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputClassName={cx("contact__input")}
                  />
                </div>
                <div className={cx("form__group")}>
                  <TextField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Ej. juanperez@gmail.com"
                    variant="primary"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputClassName={cx("contact__input")}
                  />
                </div>
                <div className={cx("form__group")}>
                  <TextArea
                    label="Mensaje"
                    name="message"
                    placeholder="Ej. Estoy interesado en conocer más sobre sus productos."
                    variant="primary"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputClassName={cx("contact__input")}
                  />
                </div>

                <Button
                  type="submit"
                  size="large"
                  variant="accent"
                  icon="send"
                  fullWidth
                  isLoading={isSubmitting}
                  className={cx("contact__submit-button")}
                >
                  Enviar Mensaje
                </Button>

                {/* Declaración de reCAPTCHA movida debajo del botón */}
                <div className={cx("recaptcha-terms")}>
                  <Typography variant="p3">
                    Este sitio está protegido por reCAPTCHA y se aplican la
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Política de Privacidad{" "}
                    </a>
                    y los{" "}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Términos de Servicio
                    </a>{" "}
                    de Google.
                  </Typography>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Información de contacto */}
        <div className={cx("contact__info")}>
          <div className={cx("contact__image-wrapper")}>
            <Image
              src={dogIllustration}
              fill
              sizes="(max-width: 768px) 300px, (max-width: 1280px) 400px, 530px"
              className={cx("contact__image")}
              alt="Supreme BARF Canine"
              priority
            />
          </div>

          <Typography
            variant="h2"
            align="center"
            className={cx("contact__company-name")}
          >
            SUPREME <span style={{ fontWeight: 400 }}>BARF</span> CANINE
          </Typography>

          <div className={cx("contact__details")}>
            <div className={cx("contact__detail-item")}>
              <div className={cx("contact__detail-icon")}>
                <Mail />
              </div>
              <Typography variant="p1" fontWeight={500}>
                supremebarfcanine@gmail.com
              </Typography>
            </div>

            <div className={cx("contact__detail-item")}>
              <div className={cx("contact__detail-icon")}>
                <Phone /> {/* Lucide React Phone Icon */}
              </div>
              <Typography variant="p1" fontWeight={500}>
                +52 5649395148
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        autoHideDuration={6000}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          <Typography variant="p2" color="white" fontWeight={600}>
            {snackbar.message}
          </Typography>
        </Alert>
      </Snackbar>
    </section>
  );
};

// Envolvemos el componente Contact con el proveedor de reCAPTCHA
const ContactWithReCaptcha: React.FC = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head", // Agrega el script al head en lugar del body
      }}
    >
      <Contact />
    </GoogleReCaptchaProvider>
  );
};

export default ContactWithReCaptcha;
