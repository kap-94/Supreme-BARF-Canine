import * as Yup from "yup";

// Función que devuelve el esquema de validación dinámico
export const getContactFormSchema = (isBackend: boolean = false) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Este campo es requerido")
      .min(2, "El nombre es muy corto")
      .max(50, "El nombre es muy largo"),
    email: Yup.string()
      .email("El correo electrónico es inválido")
      .required("Este campo es requerido"),
    phone: Yup.string()
      .required("Este campo es requerido")
      .matches(
        /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{6,10}$/,
        "Formato de teléfono inválido. Ejemplos: 222222222, (222) 222-2222"
      ),
    message: Yup.string()
      .required("Este campo es requerido")
      .min(10, "El mensaje es demasiado corto")
      .max(500, "El mensaje es demasiado largo"),
  });

  // Si es backend, añadimos la validación de recaptchaToken
  if (isBackend) {
    return schema.shape({
      recaptchaToken: Yup.string().required("El token reCAPTCHA es requerido"),
    });
  }

  return schema; // Si no, devolvemos el esquema sin recaptchaToken
};


export const DogFormSchema = Yup.object().shape({
  dogYears: Yup.string().required("Este campo es requerido"),
  dogMonths: Yup.string().required("Este campo es requerido"),
  dogWeight: Yup.number()
    .min(0.1, "El peso debe ser mayor a 0.1 kg")
    .required("Este campo es requerido"),
  sterilized: Yup.string().required("Este campo es requerido"),
  activityLevel: Yup.string().required("Este campo es requerido"),
  pregnancyStatus: Yup.string().required("Este campo es requerido"),
});
