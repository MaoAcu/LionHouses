from flask import Blueprint, render_template, send_from_directory, current_app, make_response
 

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


@routes_bp.route('/robots.txt')
def robots():
    return send_from_directory(current_app.static_folder, 'robots.txt')


@routes_bp.route('/sitemap.xml')
def sitemap():
    response = make_response(send_from_directory(current_app.static_folder, 'sitemap.xml'))
    response.headers['Content-Type'] = 'application/xml'
    return response
