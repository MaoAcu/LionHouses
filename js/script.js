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

    // Form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Here you would typically send this to a server
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
            // Show success message
            alert('¡Mensaje enviado! Te contactaremos pronto.');
            this.reset();
        });
    }

    // WhatsApp button
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const message = "¡Hola! Me interesa conocer más sobre Lions Houses.";
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
    const imagePath = "images/gallery/Lions_Houses_f"; 
    
    // Generar los cuadros dinámicamente
    for (let i = 3; i <= 27; i++) {
        const slide = document.createElement('div');
        slide.className = 'gallery-item-slide';
        slide.innerHTML = `
            <img src="${imagePath}${i}.jpeg" alt="Habitación ${i}">
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