document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const video = document.getElementById('aerial');
    const skipBtn = document.getElementById('skipBtn');
    
    // Si no hay intro, no hacemos nada
    if (!intro || !video) return;

    let redirected = false;

    function startRedirect() {
        if (redirected) return;
        redirected = true;
        
        // Animación de salida antes de irse
        gsap.to(intro, {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.in',
            onComplete: () => {
                window.location.href = URL_PAGINA;
            }
        });
    }

 
    skipBtn.addEventListener('click', startRedirect);
 
    video.addEventListener('ended', startRedirect);

     
    setTimeout(startRedirect, 8000);

     
    
});