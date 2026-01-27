document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById('dynamic-gallery');
    
    // ESCUDO 1: Si no existe el contenedor, no intentes crear la galería
    if (!galleryGrid) {
        console.log("Sistema: Galería dinámica no detectada en esta página.");
        return; 
    }

    const imagePath = "images/gallery/Lions_Houses_f"; 
    
    for (let i = 3; i <= 27; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-aos', 'fade-up');

        item.innerHTML = `
            <img src="${imagePath}${i}.jpeg" alt="Lions Houses ${i}" loading="lazy" onerror="this.parentElement.style.display='none'">
            <div class="overlay"><i class="fas fa-search-plus"></i></div>
        `;

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
    
    // ESCUDO 2: Verificar que el Lightbox exista en el HTML antes de usarlo
    if (!lightbox || !container) {
        console.error("Error: Los elementos del Lightbox no existen en el HTML.");
        return;
    }

    const source = element.querySelector('img, video');
    if (!source) return;

    container.innerHTML = ''; 

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
    document.body.style.overflow = 'hidden'; 
}

// FUNCIÓN PARA CERRAR EL LIGHTBOX (Global para que el botón X funcione)
window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'none';
    const container = document.getElementById('lightbox-media-container');
    if (container) container.innerHTML = ''; 
    document.body.style.overflow = 'auto'; 
};