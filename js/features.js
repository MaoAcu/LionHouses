// features.js - Funcionalidades nuevas manteniendo simplicidad

document.addEventListener('DOMContentLoaded', function() {
    // 1. Año actual en footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // 2. Lightbox para galería
    initLightbox();
    
    // 4. Formularios
    initForms();
    
    // 5. Puntos interactivos en mapa
    initMapPoints();
});

// Lightbox simple
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Abrir lightbox al hacer clic en imágenes de galería
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            const label = this.getAttribute('data-label');
            
            lightboxImg.src = `/static/images/${imgSrc}`;
            lightboxCaption.textContent = label;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Formularios simples
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const confirmation = document.getElementById('formConfirmation');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!email || !message) {
                showConfirmation('Por favor completa todos los campos', 'error');
                return;
            }
            
            // Simular envío (aquí conectarías con tu backend)
            showConfirmation('¡Mensaje enviado! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            this.reset();
            
           
        });
    }
    
    function showConfirmation(message, type) {
        if (!confirmation) return;
        
        confirmation.textContent = message;
        confirmation.className = 'form-confirmation ' + type;
        confirmation.style.display = 'block';
        
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 5000);
    }
    
    // Pregunta rápida
    const quickQuestionBtn = document.querySelector('.btn-quick-question');
    if (quickQuestionBtn) {
        quickQuestionBtn.addEventListener('click', function() {
            const textarea = this.previousElementSibling;
            if (textarea.value.trim()) {
                alert('Pregunta enviada. Te responderemos pronto por email.');
                textarea.value = '';
            } else {
                alert('Por favor escribe tu pregunta.');
            }
        });
    }
}

// Mapa interactivo simple
function initMapPoints() {
    document.querySelectorAll('.point').forEach(point => {
        point.addEventListener('click', function() {
            const tooltip = this.querySelector('.point-tooltip');
            alert(tooltip.textContent + ' - ¡Es increíble!');
        });
    });
}

// Funciones globales
function openCalendar() {
    window.open('https://airbnb.com/your-listing', '_blank');
}

function openGoogleMaps() {
    window.open('https://maps.google.com/?q=Lions+Houses+Parrita+Costa+Rica', '_blank');
}

function openWhatsApp() {
    const message = 'Hola, me interesa Lions Houses. ¿Podrían darme más información?';
    const phone = '+50688888888'; // Tu número
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');

}
   

 
