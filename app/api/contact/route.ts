import { NextRequest, NextResponse } from "next/server";
import { mailOptions, transporter } from "@/app/_lib/nodemailer";
import { getContactFormSchema } from "@/app/_lib/validationSchemas";
import { generateEmailHTML } from "@/app/_utils/htmlEmailGenerator";

// Función para validar el token de reCAPTCHA
const validateRecaptcha = async (
  token: string
): Promise<{ success: boolean; score: number }> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();

  return { success: data.success, score: data.score };
};

interface ContactMessageFields {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken?: string; // Añadimos el token de reCAPTCHA
}

export async function POST(request: NextRequest) {
  try {
    // Parseamos el cuerpo de la solicitud como JSON
    const data: ContactMessageFields = await request.json();

    // Validar la estructura del formulario utilizando Yup
    // Utilizamos abortEarly: true para detener la validación en el primer error
    await getContactFormSchema(true).validate(data, { abortEarly: true });

    // Validar el token de reCAPTCHA y loggear el score
    const recaptchaResponse = await validateRecaptcha(data.recaptchaToken!);
    const { success, score } = recaptchaResponse;

    if (!success || score < 0.5) {
      return NextResponse.json(
        {
          message: "La verificación de reCAPTCHA falló o el puntaje es bajo",
          score,
        },
        { status: 400 }
      );
    }

    // Excluimos el token reCAPTCHA al generar el contenido del correo
    const { recaptchaToken, ...formData } = data;

    // Enviar el correo electrónico utilizando Nodemailer
    await transporter.sendMail({
      ...mailOptions,
      subject: "Nuevo Contacto desde la Página Web",
      text: `Nombre: ${formData.name}\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\nMensaje: ${formData.message}`,
      html: generateEmailHTML(formData), // Aquí llamamos a la función que genera el HTML
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      // Capturamos el primer error de validación específico de Yup
      const firstError = err.errors[0]; // Tomamos solo el primer error
      return NextResponse.json({ message: firstError }, { status: 400 });
    }

    console.error("Error del servidor:", err);
    return NextResponse.json(
      { message: "Error interno del servidor", error: err.message },
      { status: 500 }
    );
  }
}
