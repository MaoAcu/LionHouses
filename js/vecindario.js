document.addEventListener("DOMContentLoaded", () => {
    const nearbyList = document.getElementById('nearby-list');

    const locales = [
        {
            nombre: "Alma Marina",
            info: "Bar y Restaurante familiar con un ambiente súper agradable frente al mar.",
            distancia: "a 4 min caminando",
            icono: "fa-utensils",
            img1: "images/vecinos/AlmaMarina1.jpg",
            img2: "images/vecinos/AlmaMarina2.jpg"
        },
        {
            nombre: "Cafetería Centeno",
            info: "Deliciosa repostería artesanal y el mejor café para iniciar tu mañana.",
            distancia: "a 4 min caminando",
            icono: "fa-coffee",
            img1: "images/vecinos/CafeteriaCenteno1.jpg",
            img2: "images/vecinos/CafeteriaCenteno2.jpg"
        },
        {
            nombre: "La Esquinita del Sabor",
            info: "Sabores auténticos locales que te harán sentir como en casa.",
            distancia: "2 min en carro / 23 min caminando",
            icono: "fa-moped",
            img1: "images/vecinos/Esquinita_Sabor1.jpg",
            img2: "images/vecinos/Esquinita_Sabor2.jpg"
        }
    ];

    locales.forEach((local) => {
        const card = document.createElement('div');
        card.className = 'nearby-card-v2';
        
        card.innerHTML = `
            <div class="card-media">
                <div class="images-wrapper">
                    <img src="${local.img1}" class="slide-img active" onerror="this.src='https://placehold.co/400x300?text=Lion+Houses'">
                    <img src="${local.img2}" class="slide-img" onerror="this.src='https://placehold.co/400x300?text=Local+Sercano'">
                </div>
                <div class="slider-dots">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                </div>
            </div>
            <div class="card-body">
                <h3>${local.nombre}</h3>
                <p>${local.info}</p>
                <div class="card-footer">
                    <span><i class="fas ${local.icono}"></i></span>
                    <span class="dist">📍 ${local.distancia}</span>
                </div>
            </div>
        `;

        // Lógica simple para que las fotos cambien al pasar el mouse
        card.addEventListener('mouseenter', () => {
            const imgs = card.querySelectorAll('.slide-img');
            const dots = card.querySelectorAll('.dot');
            imgs[0].classList.remove('active');
            imgs[1].classList.add('active');
            dots[0].classList.remove('active');
            dots[1].classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            const imgs = card.querySelectorAll('.slide-img');
            const dots = card.querySelectorAll('.dot');
            imgs[1].classList.remove('active');
            imgs[0].classList.add('active');
            dots[1].classList.remove('active');
            dots[0].classList.add('active');
        });

        nearbyList.appendChild(card);
    });
});