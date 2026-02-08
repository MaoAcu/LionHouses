// Inicializar AOS después de que la animación intro termine
       document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que termine la animación de entrada
    setTimeout(function() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                // Configuración personalizada
                duration: 1000, // Duración de la animación en ms
                once: true, //   animación solo ocurre una vez
                offset: 100, // Offset (px) desde el borde inferior de la ventana
                delay: 0, // Retardo entre animaciones
                easing: 'ease-out-cubic', // Curva de aceleración
                
                // Optimización para móviles
                disable: function() {
                    // Solo deshabilitar en móviles MUY pequeños
                    var maxWidth = 360;
                    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    return window.innerWidth < maxWidth && isMobile;
                },
                
                // Configuraciones de AOS
                startEvent: 'DOMContentLoaded',
                initClassName: 'aos-init',
                animatedClassName: 'aos-animate',
                useClassNames: false,
                disableMutationObserver: false,
                debounceDelay: 50,
                throttleDelay: 99,
                
                
            });
            
          
            
            // Refrescar AOS cuando cambia el idioma
            document.addEventListener('languageChanged', function() {
                setTimeout(function() {
                    AOS.refresh();
                }, 300);
            });
            
            
            setTimeout(function() {
                AOS.refresh();
            }, 1000);
            
        } else {
            console.warn('AOS no está cargado');
        }
    }, 4000);  
});
   
    