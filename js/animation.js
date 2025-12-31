// animation.js - Animación de entrada para Lions Houses (compatible con móviles)

document.addEventListener('DOMContentLoaded', function() {
    // Elementos de la animación
    const introSection = document.getElementById('intro');
    const aerialImage = document.getElementById('aerial');
    const introText = document.querySelector('.intro-text');
    const loader = document.querySelector('.loader');
    const content = document.querySelectorAll('section:not(#intro), nav, footer');
    
    // Verificar si los elementos existen
    if (!introSection || !aerialImage) {
        console.log('Elementos de animación no encontrados, saltando animación');
        document.body.style.opacity = 1;
        return;
    }
    
    // Configurar GSAP (asegúrate de que GSAP está cargado)
    if (typeof gsap === 'undefined') {
        console.error('GSAP no está cargado');
        return;
    }
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    // Configuraciones diferentes para móvil y escritorio
    const animationConfig = {
        desktop: {
            imageScale: 1.1,
            zoomScale: 3.2,
            zoomY: "-25%",
            zoomX: "2%",
            duration: 2.0,
            zoomDuration: 2.5,
            containerWidth: "80%",
            containerHeight: "70vh"
        },
        mobile: {
            imageScale: 1.05,
            zoomScale: 1.8, // Menos zoom en móvil
            zoomY: "-15%", // Ajuste menor en móvil
            zoomX: "0%",
            duration: 1.2, // Más rápido en móvil
            zoomDuration: 1.8, // Más rápido en móvil
            containerWidth: "95%", // Más ancho en móvil
            containerHeight: "50vh" // Más bajo en móvil
        }
    };
    
    const config = isMobile ? animationConfig.mobile : animationConfig.desktop;
    
    // Ajustar contenedor para móviles
    if (isMobile) {
        const imageContainer = document.querySelector('.image-container');
        if (imageContainer) {
            imageContainer.style.width = config.containerWidth;
            imageContainer.style.height = config.containerHeight;
        }
    }
    
    // Ocultar contenido inicialmente
    content.forEach(el => {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
    });
    
    // Ocultar navbar al inicio
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.opacity = '0';
    }
    
    // Desactivar scroll durante la animación
    document.body.style.overflow = 'hidden';
    
    // Función para mostrar el contenido después de la animación
    function showContent() {
        // Mostrar navbar con animación
        if (navbar) {
            gsap.to(navbar, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });
        }
        
        // Mostrar el contenido principal
        content.forEach((el, index) => {
            gsap.to(el, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.8,
                delay: isMobile ? 0.05 * index : 0.1 * index, // Más rápido en móvil
                ease: "power2.out"
            });
        });
        
        // Restaurar scroll
        document.body.style.overflow = 'auto';
        
        // Eliminar la sección intro del flujo del documento
        setTimeout(() => {
            introSection.style.display = 'none';
        }, 500);
        
        // Inicializar AOS después de la animación (si existe)
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.init({
                    duration: isMobile ? 600 : 1000,
                    once: true,
                    offset: isMobile ? 50 : 100,
                    delay: isMobile ? 50 : 100,
                    easing: 'ease-out-cubic',
                    disable: function() {
                        return window.innerWidth < 480; // Solo desactivar en móviles muy pequeños
                    }
                });
            }, 500);
        }
    }
    
    // ANIMACIÓN COMPLETA (para todos los dispositivos)
    
    // 1. Fade in inicial suave
    const tl = gsap.timeline({
        onComplete: function() {
            // Iniciar el zoom después de una breve pausa
            setTimeout(startZoomAnimation, isMobile ? 800 : 1000); // Pausa más corta en móvil
        }
    });
    
    tl.fromTo(aerialImage, 
        { 
            scale: config.imageScale, 
            opacity: 0,
            filter: 'brightness(0.8) blur(5px)'
        },
        { 
            scale: 1, 
            opacity: 1,
            filter: 'brightness(1) blur(0)',
            duration: config.duration, 
            ease: "power2.out" 
        }
    )
    .fromTo(loader,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        isMobile ? "-=0.8" : "-=1.2"
    )
    .fromTo(introText,
        { 
            y: 30, 
            opacity: 0,
            scale: 0.95 
        },
        { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.8 : 1.2, // Más rápido en móvil
            ease: "power2.out" 
        },
        isMobile ? "-=0.5" : "-=0.8"
    );
    
    // 2. Función para el zoom en la entrada principal
    function startZoomAnimation() {
        const zoomTl = gsap.timeline({
            onComplete: showContent
        });
        
        // Ocultar loader
        zoomTl.to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        });
        
        // Efecto de enfoque y zoom en la puerta
        zoomTl.to(aerialImage, {
            scale: config.zoomScale,
            y: config.zoomY,
            x: config.zoomX,
            duration: config.zoomDuration,
            ease: "power2.inOut",
            onStart: function() {
                // Efecto de brillo durante el zoom (solo en escritorio)
                if (!isMobile) {
                    gsap.to(aerialImage, {
                        filter: 'brightness(1.2) contrast(1.1)',
                        duration: 1,
                        ease: "power2.inOut"
                    });
                }
            }
        }, 0);
        
        // Desvanecer el texto mientras se hace zoom
        zoomTl.to(introText, {
            opacity: 0,
            y: isMobile ? -10 : -20,
            scale: 0.9,
            duration: isMobile ? 0.6 : 1,
            ease: "power2.in"
        }, isMobile ? 0.3 : 0.5);
        
        // Efecto de desvanecimiento final
        zoomTl.to(introSection, {
            opacity: 0,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power2.inOut"
        }, isMobile ? "-=0.6" : "-=1");
    }
    
    // Manejar redimensionamiento de ventana
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Si se redimensiona durante la animación, solo mostrar contenido
            if (introSection.style.opacity < 1) {
                showContent();
            }
        }, 250);
    });
    
    // Manejar toques en móvil para saltar animación
    if (isMobile) {
        let tapCount = 0;
        let tapTimeout;
        
        introSection.addEventListener('touchstart', function(e) {
            tapCount++;
            
            if (tapCount === 2) { // Doble toque para saltar
                e.preventDefault();
                showContent();
                tapCount = 0;
                clearTimeout(tapTimeout);
            }
            
            tapTimeout = setTimeout(function() {
                tapCount = 0;
            }, 300);
        });
    }
});