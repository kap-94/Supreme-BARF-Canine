"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Icon,
  SectionHeader,
  Snackbar,
  Spinner,
  TextArea,
  TextField,
  Typography,
} from "@/app/_components";
import { sendContactForm } from "@/app/_lib/api";
import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

// Esquema de validación con Yup
const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es requerido"),
  email: Yup.string()
    .email("Email inválido")
    .required("Este campo es requerido"),
  message: Yup.string().required("Este campo es requerido"),
});

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    message: "",
  };

  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };
  const handleFormSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await sendContactForm(values);
      showSnackbar("Mensaje enviado con éxito");
    } catch (error) {
      console.log({ error });

      showSnackbar("Hubo un problema al enviar el mensaje");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className={cx("contact")}>
      {/* <SectionHeader
        title="Contacto"
        subtitle="Contáctanos para más información y asistencia"
      /> */}

      <div className={cx("contact__content")}>
        {/* Formulario de contacto */}
        <div className={cx("contact__form")}>
          <div className={cx("contact__form-heading")}>
            <Typography variant="h3">¿Cómo Podemos Ayudarte?</Typography>

            <Typography variant="p1" align="center">
              Contactanos y te contestaremos a la brevedad
            </Typography>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={ContactFormSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              handleFormSubmit(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
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
                    label="Email"
                    name="email"
                    type="email"
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
                  className={cx("contact__submit-button")}
                >
                  Enviar Mensaje
                  {isSubmitting ? (
                    <div className={cx("form__button-icon-container")}>
                      <Spinner />
                    </div>
                  ) : (
                    <Icon
                      icon="send"
                      width={20}
                      height={20}
                      className={cx("form__button-icon")}
                    />
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        {/* Información de contacto */}
        <div className={cx("contact__info")}>
          {/* <Image
            src={logo}
            height={140}
            width={140}
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
        <Alert
          variant="filled"
          severity={snackbar.message.includes("problem") ? "error" : "success"}
        >
          <Typography
            variant="p1"
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

export default Contact;
