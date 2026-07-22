from flask import Flask
import os
from dotenv import load_dotenv
from .Controllers.routes import routes_bp
from .Controllers.formController import form_bp

#  importa la instancia
from app.Services import email_service

basedir = os.path.abspath(os.path.dirname(__file__))
env_path = os.path.join(basedir, '.env')

# Si no está, buscar en el directorio padre
if not os.path.exists(env_path):
    env_path = os.path.join(os.path.dirname(basedir), '.env')

 

load_dotenv(env_path)

def create_app():
    app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static"
    )
    
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.secret_key = os.getenv("SECRET_KEY")
    
    # Inicializa el servicio de email con la app
    email_service.init_app(app)
    
    # Seguridad de cookies
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    
    # Cache headers para archivos estáticos (imágenes, CSS, JS, video)
    @app.after_request
    def add_cache_headers(response):
        if response.content_type:
            ct = response.content_type
            if any(ct.startswith(t) for t in ('image/', 'video/', 'font/', 'text/css', 'application/javascript')):
                response.headers['Cache-Control'] = 'public, max-age=2592000'  # 30 días
            elif ct == 'application/json':
                response.headers['Cache-Control'] = 'public, max-age=86400'  # 1 día
        return response
    
    # Registra los blueprints
    app.register_blueprint(routes_bp)
    app.register_blueprint(form_bp)
    
    return app