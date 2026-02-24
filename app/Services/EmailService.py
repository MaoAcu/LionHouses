import smtplib
import os
import threading
import logging
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_server = None
        self.smtp_port = None
        self.smtp_use_ssl = True
        self.smtp_user = None
        self.smtp_password = None
        self.principal_email = None

    def init_app(self, app):
        self.smtp_server = os.getenv("SMTP_SERVER")
        self.smtp_port = int(os.getenv("SMTP_PORT", "465"))
        self.smtp_use_ssl = os.getenv("SMTP_USE_SSL", "true").lower() == "true"
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.principal_email = os.getenv("PRINCIPAL")

    def _execute_send(self, to_email, subject, html_body, text_body, reply_to=None):
        message = MIMEMultipart("alternative")
        message["From"] = f"Gestion Lion Houses <{self.smtp_user}>"
        message["To"] = to_email
        message["Subject"] = subject

        if reply_to:
            message["Reply-To"] = reply_to

        message.attach(MIMEText(text_body, "plain", "utf-8"))
        message.attach(MIMEText(html_body, "html", "utf-8"))

        try:
            context = ssl.create_default_context()
            if self.smtp_use_ssl:
                with smtplib.SMTP_SSL(
                    self.smtp_server,
                    self.smtp_port,
                    context=context,
                    timeout=15
                ) as server:
                    server.login(self.smtp_user, self.smtp_password)
                    server.sendmail(self.smtp_user, to_email, message.as_string())
            else:
                with smtplib.SMTP(
                    self.smtp_server,
                    self.smtp_port,
                    timeout=15
                ) as server:
                    server.starttls(context=context)
                    server.login(self.smtp_user, self.smtp_password)
                    server.sendmail(self.smtp_user, to_email, message.as_string())
            return True
        except Exception as e:
            logger.error(f"Error enviando correo: {e}")
            return False

    def SendContactForm(self, name, email, subject, message, dates):
        try:
            logo_url = "http://lions-houses.com/gallery/Lions_Logo.jpg"
            c_primary_light = "#F2E8DE"
            c_primary_dark = "#1A3A2A"
            c_accent_tan = "#E6D5C3"
            c_text_dark = "#1A3A2A"
            c_text_light = "#F2E8DE"

            container_style = (
                "max-width:600px;margin:20px auto;background:#ffffff;"
                f"border:1px solid {c_accent_tan};border-radius:4px;"
                "font-family:'Segoe UI',Arial,sans-serif;"
            )

            subject_admin = f"Nueva Consulta: {name} | Lion Houses"

            html_admin = f"""
            <html>
            <body style="background-color:{c_primary_light};margin:0;padding:0;">
                <div style="{container_style}">
                    <div style="background:{c_primary_dark};padding:30px;text-align:center;">
                        <img src="{logo_url}" width="140">
                        <p style="color:{c_accent_tan};font-size:12px;letter-spacing:2px;">
                            GESTION DE SOLICITUDES
                        </p>
                    </div>
                    <div style="padding:40px;color:{c_text_dark};">
                        <h2>Detalles del Prospecto</h2>
                        <p><strong>Nombre:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Estancia:</strong> {dates}</p>
                        <p><strong>Asunto:</strong> {subject}</p>
                        <blockquote style="border-left:4px solid {c_accent_tan};padding-left:15px;">{message}</blockquote>
                        <p style="text-align:center;margin-top:30px;">
                            <a href="mailto:{email}"
                               style="background:{c_primary_dark};color:{c_text_light};
                               padding:15px 25px;text-decoration:none;border-radius:4px;display:inline-block;">
                               RESPONDER AL CLIENTE
                            </a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """

            def _send_process():
                self._execute_send(
                    self.principal_email,
                    subject_admin,
                    html_admin,
                    f"Nueva consulta de {name}",
                    reply_to=email
                )

            threading.Thread(target=_send_process, daemon=True).start()
            return True

        except Exception as e:
            logger.error(f"[LIONS] Error en SendContactForm: {e}")
            return False