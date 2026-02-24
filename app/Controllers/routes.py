from flask import Blueprint, render_template,send_from_directory,current_app
 

routes_bp = Blueprint("routes", __name__)



@routes_bp.route('/')
def index():
   
    return render_template('animacion.html')

@routes_bp.route('/Vgallery', endpoint="Vgallery")
def VGallery():
   
    return render_template('gallery.html')


@routes_bp.route('/inicio', endpoint="inicio")
def Inicio():
   
    return render_template('index.html')
