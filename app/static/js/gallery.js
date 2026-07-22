let galleryItems = [];
let currentLightboxIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById('dynamic-gallery');
    if (!galleryGrid) return;

    const tallIndexes = [3, 7, 12, 16, 22];
    const wideIndexes = [5, 10, 18, 25];
    let imageIndex = 0;

    for (let i = 3; i <= 27; i++) {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.setAttribute('data-index', imageIndex + 1);
        card.onclick = function() { openLightbox(this); };

        if (tallIndexes.includes(i)) card.classList.add('tall');
        if (wideIndexes.includes(i)) card.classList.add('wide');

        card.innerHTML = `
            <img src="${imagePath}${i}.webp" alt="Lions Houses foto ${i}" loading="lazy" onerror="this.parentElement.style.display='none'">
            <div class="card-overlay">
                <span class="card-icon"><i class="fas fa-search-plus"></i></span>
                <span class="card-label">FOTO ${i}</span>
            </div>
        `;

        galleryGrid.appendChild(card);
        imageIndex++;
    }

    galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-card'));
    document.getElementById('galleryCount').textContent = `${galleryItems.length} fotos`;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
    });
});

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-media-container');
    if (!lightbox || !container) return;

    const index = parseInt(element.getAttribute('data-index'));
    currentLightboxIndex = isNaN(index) ? 0 : index;

    const source = element.querySelector('img, video');
    if (!source) return;

    renderLightboxMedia(source, container);
    updateLightboxCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderLightboxMedia(source, container) {
    container.innerHTML = '';

    if (source.tagName === 'IMG') {
        const img = document.createElement('img');
        img.src = source.src;
        img.className = 'lightbox-content';
        container.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.src = source.src;
        video.controls = true;
        video.autoplay = true;
        video.className = 'lightbox-content';
        container.appendChild(video);
    }
}

function navigateLightbox(direction) {
    if (galleryItems.length === 0) return;

    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryItems.length - 1;
    if (currentLightboxIndex >= galleryItems.length) currentLightboxIndex = 0;

    const item = galleryItems[currentLightboxIndex];
    const source = item.querySelector('img, video');
    if (!source) return;

    const container = document.getElementById('lightbox-media-container');
    renderLightboxMedia(source, container);
    updateLightboxCounter();
}

function updateLightboxCounter() {
    const counter = document.getElementById('lightboxCounter');
    if (counter) {
        counter.textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;
    }
}

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    const container = document.getElementById('lightbox-media-container');
    if (container) {
        const video = container.querySelector('video');
        if (video) video.pause();
        container.innerHTML = '';
    }
    document.body.style.overflow = 'auto';
};

window.openLightbox = openLightbox;
window.navigateLightbox = navigateLightbox;
