"use client";
import React from "react";
import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  SectionHeader,
  TextArea,
  TextField,
  Typography,
} from "@/app/_components";
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
  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    message: "",
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
          <Typography variant="h3">
            {/* Contáctanos para más información y asistencia */}
            ¿Cómo podemos ayudarte?
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={ContactFormSchema}
            onSubmit={(values, { resetForm }) => {
              // Lógica para enviar el formulario
              console.log(values);
              resetForm();
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
                  icon="send"
                  variant="accent"
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
    </section>
  );
};

export default Contact;
