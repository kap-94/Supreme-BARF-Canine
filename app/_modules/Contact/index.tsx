"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import {
  Alert,
  Button,
  Snackbar,
  TextArea,
  TextField,
  Typography,
} from "@/app/_components";
import { sendContactForm } from "@/app/_lib/api";
import styles from "./Contact.module.scss";
import classNames from "classnames/bind";
import { getContactFormSchema } from "@/app/_lib/validationSchemas";

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
          <div className={cx("contact__form-heading")}>
            <Typography variant="h2" align="center">
              ¿Cómo Podemos Ayudarte?
            </Typography>

            <Typography variant="p1" align="center">
              Contáctanos y te contestaremos a la brevedad
            </Typography>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={getContactFormSchema(false)} // Para el frontend, sin el token reCAPTCHA
            onSubmit={(values, { resetForm }) => {
              handleFormSubmit(values);
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
                  // isDisabled={!dirty}
                  isLoading={isSubmitting}
                  className={cx("contact__submit-button")}
                >
                  Enviar Mensaje
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Información de contacto */}
        <div className={cx("contact__info")}>
          {/* <Image
            src={logo}
            height={240}
            width={240}
            className={cx("contact__logo")}
            alt="Supreme BARF Canine"
          /> */}
          <Typography variant="h2" align="center">
            SUPREME <span style={{ fontWeight: 600 }}>BARF</span> CANINE
          </Typography>
          <Typography variant="p1" fontWeight={600} align="center">
            supremebarfcanine@gmail.com
          </Typography>
          <Typography variant="p1" fontWeight={600} align="center">
            +52 2228938475
          </Typography>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        autoHideDuration={6000}
      >
        <Alert variant="filled" severity={snackbar.severity}>
          <Typography
            variant="p2"
            fontFamily="poppins"
            color="white"
            fontWeight={600}
          >
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
        async: true, // Carga asíncrona del script
        defer: true, // Deferir la carga del script
      }}
    >
      <Contact />
    </GoogleReCaptchaProvider>
  );
};

export default ContactWithReCaptcha;
