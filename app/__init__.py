from flask import Flask
 
import os
from app.Services import email_service 
 
from .Controllers.routes import routes_bp
from .Controllers.formController import form_bp
 


def create_app():
    app = Flask(__name__)
    
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    
    
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.secret_key = os.getenv("SECRET_KEY")
    #  Inicializa la base de datos
 
    email_service.init_app(app) 
    # Seguridad de cookies
    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    
    #  Registra los blueprints
    app.register_blueprint(routes_bp) 
    app.register_blueprint(form_bp)
    return app
