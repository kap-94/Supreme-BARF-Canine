export const generateEmailHTML = (formData: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) => {
  return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            padding: 0;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            padding: 24px;
            border-radius: 10px;
          }
          .header {
            text-align: center;
            margin-top: 12px;
            margin-bottom: 8px;
          }
          .header h1 {
            font-size: 24px;
            color: #333333;
            margin: 0;
          }
          .content {
            padding: 20px;
          }
          .content p {
            font-size: 16px;
            color: #666666;
            margin: 0 0 10px;
          }
          .content h3 {
            font-size: 18px;
            color: #333333;
            margin-bottom: 16px;
          }
          .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #999999;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #000000;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Mensaje de Contacto</h1>
          </div>
          <div class="content">
            <h3>Detalles del Contacto</h3>
            <p><strong>Nombre:</strong> ${formData.name}</p>
            <p><strong>Teléfono:</strong> ${formData.phone}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">${
              formData.message
            }</p>
  
            <a href="mailto:${
              formData.email
            }" class="button">Responder al Correo</a>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático generado desde la página web.</p>
            <p>&copy; ${new Date().getFullYear()} Supreme BARF Canine. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
