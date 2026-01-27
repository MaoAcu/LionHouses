document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById('dynamic-gallery');
    const imagePath = "images/gallery/Lions_Houses_f"; // Carpeta y prefijo
    
    // 1. Generar imágenes de la f3 a la f27
    for (let i = 3; i <= 27; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Efecto de entrada suave (si usas AOS.js puedes activarlo aquí)
        item.setAttribute('data-aos', 'fade-up');

        item.innerHTML = `
            <img src="${imagePath}${i}.jpeg" alt="Lions Houses ${i}" loading="lazy">
            <div class="overlay"><i class="fas fa-search-plus"></i></div>
        `;

        // Al hacer clic, abre el lightbox
        item.onclick = function() {
            openLightbox(this);
        };

        galleryGrid.appendChild(item);
    }
});

// FUNCIÓN PARA ABRIR EL LIGHTBOX
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    const source = element.querySelector('img, video');
    
    if (!source) return;

    container.innerHTML = ''; // Limpiar contenido previo

    if (source.tagName === 'IMG') {
        const newImg = document.createElement('img');
        newImg.src = source.src;
        newImg.className = 'lightbox-content';
        container.appendChild(newImg);
    } else {
        const newVideo = document.createElement('video');
        newVideo.src = source.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        newVideo.className = 'lightbox-content';
        container.appendChild(newVideo);
    }

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
}

// FUNCIÓN PARA CERRAR EL LIGHTBOX
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    
    lightbox.style.display = 'none';
    container.innerHTML = ''; // Detener videos al cerrar
    document.body.style.overflow = 'auto'; // Devolver el scroll
}