from flask import Blueprint, request, jsonify
from app.Services import email_service

form_bp = Blueprint("Sform", __name__, url_prefix='/Sform')

@form_bp.route("/send_form", methods=["POST"])
def SendForm():
    try:
        data = request.get_json()
        
        name = data.get("name")
        last_name = data.get("lastname", "")
        full_name = f"{name} {last_name}".strip()
        
        email = data.get("email")
        subject = data.get("subject", "Nueva consulta")
        message = data.get("message")
         
        dates = data.get("dates", "No especificadas")

         
        if not email or not message:
            return jsonify({"success": False, "message": "Faltan campos obligatorios"}), 400
       
       
        status = email_service.SendContactForm(
            name=full_name,
            email=email,
            subject=subject,
            message=message,
            dates=dates
        ) 
        
        if status:
            return jsonify({
                "success": True,
                "message": "Mensaje enviado correctamente"  
            })
        else:
            raise Exception("El servicio de correo falló")

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500