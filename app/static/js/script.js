// Marquee Animation
document.addEventListener('DOMContentLoaded', function() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (marqueeContent) {
        // Clone the content for seamless loop
        const items = marqueeContent.innerHTML;
        marqueeContent.innerHTML += items;
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
//Validacion del formulario
function validateForm(formData) {
    const errors = [];
    
    // Validar nombre
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Ingresa un email válido');
    }
    
    // Validar fechas
    if (!formData.dates) {
        errors.push('Las fechas son obligatorias');
    } else {
        // Si es una fecha en formato YYYY-MM-DD, validar que no sea pasada
        if (formData.dates.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const selectedDate = new Date(formData.dates);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                errors.push('La fecha no puede ser anterior a hoy');
            }
        }
    }
    
    
     // Validar mensaje
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    return errors;
}  
//Mostrar errores en el formulario
function showFormErrors(errors) {
    const confirmationDiv = document.getElementById('formConfirmation');
    if (!confirmationDiv) return;
    
    if (errors.length > 0) {
        confirmationDiv.innerHTML = `
            <div class="alert alert-danger">
                <strong>Por favor corrige:</strong>
                <ul style="margin-top: 5px; margin-bottom: 0;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        confirmationDiv.style.display = 'block';
        
        // Hacer scroll hasta el mensaje de error
        confirmationDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        confirmationDiv.style.display = 'none';
    }
} 
// Validacion de la fecha minima
 
function setMinDate() {
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', minDate);
    }
}
//animacion btn envio
function setButtonLoading(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;
    
    if (isLoading) {
        // Guardar el texto original
        submitBtn.dataset.originalText = submitBtn.innerHTML;
        
        // Deshabilitar botón y mostrar animación
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Enviando...
        `;
        submitBtn.classList.add('btn-loading');
    } else {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtn.dataset.originalText || 'ENVIAR MENSAJE';
        submitBtn.classList.remove('btn-loading');
    }
}
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

  
   const form = document.getElementById('contactForm');

if (form) {
    setMinDate();
     const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar mensajes anteriores
        const confirmationDiv = document.getElementById('formConfirmation');
        if (confirmationDiv) {
            confirmationDiv.style.display = 'none';
        }
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validar datos
        const errors = validateForm(data);
        if (errors.length > 0) {
            showFormErrors(errors);
            return;
        }
        
        // Añadir un asunto por defecto
        data.subject = "Estoy interesado en adquirir los servicios";
        
        // ACTIVAR ANIMACIÓN DE CARGA
        setButtonLoading(true);
        
        try {
            const response = await fetch('/Sform/send_form', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            // DESACTIVAR ANIMACIÓN DE CARGA
            setButtonLoading(false);
            
           
            // TU MODAL EXISTENTE - SIN CAMBIOS
             
            if (result.success) {
                showModalContact('¡ÉXITO!', 'Hemos recibido tu consulta correctamente.');
                form.reset();
                
                // Resetear el campo de fecha al placeholder
                const dateInput = document.getElementById('dateInput');
                if (dateInput) {
                    dateInput.type = 'text';
                    dateInput.value = '';
                }
            } else {
                showModalContact('ERROR', result.message || 'No pudimos procesar tu solicitud. Intenta de nuevo.');
            }
            
        } catch (error) {
            console.error('Error:', error);
            // DESACTIVAR ANIMACIÓN DE CARGA
            setButtonLoading(false);
            
           
            
             
            showModalContact('ERROR', 'No pudimos enviar el mensaje. Intenta de nuevo.');
        }
    });
}
    // WhatsApp button
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const message = "¡Hola! Me interesa conocer más sobre Lions House.";
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Gallery hover effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
function toggleAccordion(element) {
    // Obtenemos el elemento padre (.accordion-item)
    const item = element.parentElement;
    
    // Toggle de la clase 'active'
    item.classList.toggle('active');
    
    // (Opcional) Cerrar otros que estén abiertos
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(i => {
        if (i !== item) {
            i.classList.remove('active');
        }
    });
}
let currentPos = 0;

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('homeSliderTrack');
  
 
   
    // Si track es null (no existe en esta página), salimos de la función.
    if (!track) return; 

    // Solo si existe el track  ejecutamos el bucle
    for (let i = 3; i <= 27; i++) {
        const slide = document.createElement('div');
        slide.className = 'gallery-item-slide';
        slide.innerHTML = `
            <img src="${imagePath}${i}.web" alt="Habitación ${i}">
            <div class="gallery-overlay">
                <span class="gallery-label">LION HOUSES</span>
            </div>
        `;
        track.appendChild(slide);
    }
});
function moveSlider(direction) {
    const track = document.getElementById('homeSliderTrack');
    const cards = document.querySelectorAll('.gallery-item-slide');
    const visibleCards = window.innerWidth <= 768 ? 1 : 3;
    const maxIndex = cards.length - visibleCards;

    currentPos += direction;

    if (currentPos < 0) currentPos = 0;
    if (currentPos > maxIndex) currentPos = maxIndex;

    const cardWidth = cards[0].offsetWidth + 15; // Ancho + gap
    track.style.transform = `translateX(-${currentPos * cardWidth}px)`;
}