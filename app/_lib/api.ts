interface ContactFormData {
  [key: string]: any;
}

export const sendContactForm = async (
  data: ContactFormData
): Promise<{ status: number; message: string }> => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    // Si la respuesta no es OK (status >= 400), lanzamos un error con el mensaje y el estado
    throw {
      status: response.status,
      message: responseData.message || "Error desconocido",
    };
  }

  // Devolvemos el estado y el mensaje
  return {
    status: response.status,
    message: responseData.message || "Mensaje enviado con éxito",
  };
};
