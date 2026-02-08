import smtplib
import os
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class EmailService:

    def __init__(self):
        self.smtp_server = None
        self.smtp_port = None
        self.sender_email = None
        self.password = None
        self.principal_email = None

    def init_app(self, app):
        self.smtp_server = os.getenv("SMTP_SERVER")
        self.smtp_port = int(os.getenv("SMTP_PORT"))
        self.sender_email = os.getenv("SMTP_USER")   
        self.password = os.getenv("SMTP_PASSWORD")
        self.principal_email = os.getenv("PRINCIPAL")  

        

    def send_email(self, to_email, subject, html_body, reply_to=None):
        if not self.sender_email or not self.password:
             
            return False

        message = MIMEMultipart()
        message["From"] = f"Lion House <{self.sender_email}>"
        message["To"] = to_email
        message["Subject"] = subject

        if reply_to:
            message.add_header("Reply-To", reply_to)

        message.attach(MIMEText(html_body, "html"))

        try:
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                server.login(self.sender_email, self.password)
                server.sendmail(self.sender_email, to_email, message.as_string())

             
            return True

        except Exception as e:
            print(f"Error SMTP: {e}")
            return False

     #funcion que recibe por parametros los datos necesario para mandar el correo aqui esta el cuerpo del correo       
    def SendContactForm(self, name, email, subject, message, dates):
      try:
        my_receive_email = self.sender_email 
        logo_url = "http://lions-houses.com/gallery/Lions_Logo.jpg"
        
        c_primary_light = "#F2E8DE"
        c_primary_dark = "#1A3A2A"
        c_accent_tan = "#E6D5C3"
        c_text_dark = "#1A3A2A"
        c_text_light = "#FFFFFF"

        common_styles = f"""
            margin: 0; padding: 0; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
            background-color: {c_primary_light};
        """

         
        email_subject = f"Nueva Consulta: {subject}"
        html_admin = f"""
        <html>
        <body style="{common_styles}">
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid {c_accent_tan}; border-radius: 8px; overflow: hidden;">
                <div style="background-color: {c_primary_dark}; padding: 20px; text-align: center;">
                    <img src="{logo_url}" alt="Lions Houses" style="width: 150px; height: auto;">
                </div>
                <div style="padding: 30px; color: {c_text_dark};">
                    <h2 style="border-bottom: 2px solid {c_accent_tan}; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
                    <p><strong>Nombre:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Fechas de interés:</strong> <span style="color: #c49a6c; font-weight: bold;">{dates}</span></p>
                    <p><strong>Asunto:</strong> {subject}</p>
                    <p style="margin-top: 20px;"><strong>Mensaje:</strong></p>
                    <div style="background-color: {c_primary_light}; padding: 15px; border-radius: 5px; font-style: italic;">
                        {message}
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

        # 2. HTML PARA EL CLIENTE (Confirmación estándar)
        confirm_subject = "Hemos recibido tu mensaje | Lions Houses"
        html_client = f"""
        <html>
        <body style="{common_styles}">
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; text-align: center; overflow: hidden; border: 1px solid {c_accent_tan};">
                <div style="background-color: {c_primary_dark}; padding: 20px;">
                    <img src="{logo_url}" alt="Lions Houses" style="width: 120px; height: auto;">
                </div>
                <div style="padding: 40px 20px; color: {c_text_dark};">
                    <h1 style="font-size: 24px;">¡Hola, {name}!</h1>
                    <p style="font-size: 16px; line-height: 1.6;">Gracias por ponerte en contacto con <strong>Lions Houses</strong>.</p>
                    <p style="font-size: 16px; line-height: 1.6;">Hemos recibido tu consulta sobre <b>"{subject}"</b> para las fechas <b>{dates}</b>. Uno de nuestros asesores se comunicará contigo a la brevedad.</p>
                    <div style="margin-top: 30px;">
                        <a href="http://lions-houses.com" style="background-color: {c_primary_dark}; color: {c_text_light}; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Visitar sitio web</a>
                    </div>
                </div>
                <div style="background-color: {c_accent_tan}; padding: 15px; font-size: 12px; color: {c_text_dark};">
                    © 2026 Lions Houses - Todos los derechos reservados.
                </div>
            </div>
        </body>
        </html>
        """

        # Enviar correos en hilos
        threading.Thread(target=self.send_email, args=(my_receive_email, email_subject, html_admin)).start()
        threading.Thread(target=self.send_email, args=(email, confirm_subject, html_client)).start()

        return True

      except Exception as e:
        print(f"Error en SendContactForm: {e}")
        return False