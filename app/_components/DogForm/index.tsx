"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import { Typography, Dropdown, TextField } from "@/app/_components";
import useCalculateFoodAmount from "@/app/_hooks/useCalculateFoodAmount";
import styles from "./DogForm.module.scss";

const cx = classNames.bind(styles);

// Esquema de validación con Yup
const DogFormSchema = Yup.object().shape({
  dogYears: Yup.string().required("Este campo es requerido"),
  dogMonths: Yup.string().required("Este campo es requerido"),
  dogWeight: Yup.number()
    .min(0.1, "El peso debe ser mayor a 0.1 kg")
    .required("Este campo es requerido"),
  sterilized: Yup.string().required("Este campo es requerido"),
  activityLevel: Yup.string().required("Este campo es requerido"),
});

// Interfaz de los valores iniciales
interface DogFormValues {
  dogYears: string;
  dogMonths: string;
  dogWeight: number | string;
  sterilized: string;
  activityLevel: string;
}

// Opciones para los Dropdowns (orden numérico)
const yearsOptions = Array.from({ length: 20 }, (_, i) => ({
  value: i.toString(),
  label: `${i} años`,
}));

const monthsOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i.toString(),
  label: `${i} meses`,
}));

const sterilizedOptions = [
  { value: "yes", label: "Sí" },
  { value: "no", label: "No" },
];

const activityLevelOptions = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
];

const DogForm: React.FC = () => {
  const initialValues: DogFormValues = {
    dogYears: "1", // Valor por defecto
    dogMonths: "0", // Valor por defecto
    dogWeight: "1", // Permitimos valor como string
    sterilized: "yes", // Valor por defecto
    activityLevel: "medium", // Valor por defecto
  };

  const [calculationResult, setCalculationResult] = useState<{
    foodAmount: string;
    additionalMessage: string;
  }>({
    foodAmount: "",
    additionalMessage: "",
  });

  return (
    <div className={cx("dog-form")}>
      <div className={cx("dog-form__content")}>
        {/* Formulario */}
        <div className={cx("dog-form__form")}>
          <Typography variant="h4">Datos del Perro</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={DogFormSchema}
            onSubmit={() => {}}
          >
            {({ values, errors, touched, setFieldValue }) => {
              const { foodAmount, additionalMessage } =
                useCalculateFoodAmount(values);

              useEffect(() => {
                setCalculationResult({ foodAmount, additionalMessage });
              }, [foodAmount, additionalMessage]);

              return (
                <Form>
                  {/* Edad del perro: Años y Meses */}
                  <div className={cx("form-group", "form-group--double")}>
                    <div className={cx("form-group__dropdown")}>
                      <Dropdown
                        label="Edad del perro (años)"
                        id="dogYears"
                        options={yearsOptions}
                        selected={
                          yearsOptions.find(
                            (option) => option.value === values.dogYears
                          )!
                        }
                        onSelectedChange={(option) =>
                          setFieldValue("dogYears", option.value)
                        }
                      />
                      {errors.dogYears && touched.dogYears && (
                        <div className={cx("error")}>{errors.dogYears}</div>
                      )}
                    </div>

                    <div className={cx("form-group__dropdown")}>
                      <Dropdown
                        label="Edad del perro (meses)"
                        id="dogMonths"
                        options={monthsOptions}
                        selected={
                          monthsOptions.find(
                            (option) => option.value === values.dogMonths
                          )!
                        }
                        onSelectedChange={(option) =>
                          setFieldValue("dogMonths", option.value)
                        }
                      />
                      {errors.dogMonths && touched.dogMonths && (
                        <div className={cx("error")}>{errors.dogMonths}</div>
                      )}
                    </div>
                  </div>

                  {/* Peso del perro */}
                  <div className={cx("form-group")}>
                    <TextField
                      label="¿Cuánto pesa mi perro? (kg)"
                      name="dogWeight"
                      type="number"
                      placeholder="Ej. 10.5"
                      min="1"
                      variant="primary"
                      value={values.dogWeight}
                      onBlur={(e) => {
                        const weight = parseFloat(e.target.value);
                        if (!e.target.value || weight < 0.1) {
                          setFieldValue("dogWeight", 0.1); // Reset to 0.1 if blank or below minimum
                        }
                      }}
                      onChange={(e) =>
                        setFieldValue("dogWeight", e.target.value)
                      }
                    />
                  </div>

                  {/* Dropdown para esterilización */}
                  <div className={cx("form-group")}>
                    <Dropdown
                      label="¿Está mi perro esterilizado?"
                      id="sterilized"
                      options={sterilizedOptions}
                      selected={
                        sterilizedOptions.find(
                          (option) => option.value === values.sterilized
                        )!
                      }
                      onSelectedChange={(option) =>
                        setFieldValue("sterilized", option.value)
                      }
                    />
                    {errors.sterilized && touched.sterilized && (
                      <div className={cx("error")}>{errors.sterilized}</div>
                    )}
                  </div>

                  {/* Dropdown para nivel de actividad */}
                  <div className={cx("form-group")}>
                    <Dropdown
                      id="activityLevel"
                      label="Nivel de actividad"
                      selected={
                        activityLevelOptions.find(
                          (option) => option.value === values.activityLevel
                        )!
                      }
                      onSelectedChange={(option) =>
                        setFieldValue("activityLevel", option.value)
                      }
                      options={activityLevelOptions}
                    />
                    {errors.activityLevel && touched.activityLevel && (
                      <div className={cx("error")}>{errors.activityLevel}</div>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        {/* Resultados */}
        <div className={cx("dog-form__results")}>
          <Typography variant="h4">Cantidad de Alimento</Typography>
          <div className={cx("dog-form__result-details")}>
            {/* Renderizar foodAmount con HTML */}
            <p
              dangerouslySetInnerHTML={{ __html: calculationResult.foodAmount }}
            ></p>

            {/* Mensaje adicional permanece sin cambios */}
            {calculationResult.additionalMessage && (
              <p>{calculationResult.additionalMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogForm;
