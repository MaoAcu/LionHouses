document.addEventListener('DOMContentLoaded', () => {

    const intro = document.getElementById('intro');
    const video = document.getElementById('aerial');
    const skipBtn = document.getElementById('skipBtn');
    const content = document.querySelectorAll('section:not(#intro), nav, footer');

    if (!intro || !video || typeof gsap === 'undefined') return;

    // Ocultar contenido
    content.forEach(el => {
        el.style.opacity = 0;
        el.style.visibility = 'hidden';
    });
    document.body.style.overflow = 'hidden';

    let animationFinished = false;

    function showContent() {
        if (animationFinished) return;
        animationFinished = true;

        content.forEach(el => {
            gsap.to(el, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        document.body.style.overflow = 'auto';
        intro.style.display = 'none';
    }

    skipBtn.addEventListener('click', showContent);

    // Animación inicial (fade in)
    gsap.fromTo(video,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    // ▶️ ESPERAR A QUE EL VIDEO ESTÉ LISTO
    video.addEventListener('loadeddata', () => {
        video.play().catch(() => {});
    });

    // 🧠 CUANDO EL VIDEO TERMINA → salir
    video.addEventListener('ended', () => {
        exitIntro();
    });

    // 🛡️ FALLBACK: si el video falla o no reporta duración
    setTimeout(() => {
        if (!animationFinished) {
            exitIntro();
        }
    }, 8000); // ajusta al largo real del video

    function exitIntro() {
        if (animationFinished) return;

        gsap.timeline({ onComplete: showContent })
            .to(video, {
                scale: 1.4,
                duration: 0.6,
                ease: 'power1.inOut'
            })
            .to(intro, {
                opacity: 0,
                duration: 0.4
            }, '-=0.2');
    }
});
