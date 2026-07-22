 

(function() {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
})();

document.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
    initLightbox();
    initForms();
    initMapPoints();
    initCompactGallery();
});

// Lightbox simple
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lb-prev');
    const nextBtn = document.querySelector('.lb-next');
    const counter = document.getElementById('lbCounter');

    const items = Array.from(document.querySelectorAll('.gallery-hero-item'));
    let currentIndex = 0;

    function open(index) {
        if (index < 0 || index >= items.length) return;
        currentIndex = index;
        const item = items[index];
        lightboxImg.src = item.getAttribute('data-image');
        lightboxCaption.textContent = item.getAttribute('data-label');
        if (counter) counter.textContent = `${index + 1} / ${items.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    items.forEach((item, i) => {
        item.addEventListener('click', () => open(i));
    });

    function navigate(dir) {
        let next = currentIndex + dir;
        if (next < 0) next = items.length - 1;
        if (next >= items.length) next = 0;
        open(next);
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'ArrowLeft') navigate(-1);
    });
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
    
    // Pregunta rapida
      const quickQuestionBtn = document.querySelector('.btn-quick-question'); // El botón "Enviar pregunta"

if (quickQuestionBtn) {
    quickQuestionBtn.addEventListener('click', function() {
        const textarea = this.previousElementSibling; // El área de texto
        const pregunta = textarea.value.trim();
        
        
        const miTelefono = "50612345678"; 
        
        if (pregunta) {
            // se codigica el texto
            const mensajeFinal = encodeURIComponent(`Hola Lion Houses, tengo una pregunta: ${pregunta}`);
            
            // se crea el enlace a WhatsApp
            const whatsappUrl = `https://wa.me/${miTelefono}?text=${mensajeFinal}`;
            
            // abre whsp en una ventana nueva
            window.open(whatsappUrl, '_blank');
            
            // limpia el campo despues de enviar
            textarea.value = '';
        } else {
            alert('Por favor escribe tu pregunta antes de enviar.');
        }
    });
  }
}


 
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
    const phone = '+50688888888'; 
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');

}

function initCompactGallery() {
    const container = document.getElementById('compactGallery');
    if (!container) return;

    const previewImages = [
        { src: '3', label: 'Sala' },
        { src: '8', label: 'Dormitorio' },
        { src: '12', label: 'Terraza' },
        { src: '18', label: 'Vista' }
    ];

    previewImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'compact-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', String(index * 60));
        item.innerHTML = `<img src="${imagePath}${img.src}.webp" alt="Lions Houses ${img.label}" loading="lazy">`;
        item.onclick = function() { window.location.href = '/Vgallery'; };
        container.appendChild(item);
    });
}

 
