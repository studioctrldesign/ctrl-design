document.addEventListener("DOMContentLoaded", function () {
    // === NAVEGACIÓN ACTIVA AL SCROLLEAR ===
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const offset = 120;

    function updateActiveLink() {
        let current = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.dataset.target === current) {
                link.classList.add("active");
            }
        });
    }

    // === SCROLL REVEAL ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Deja de observar para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar las secciones grandes
    document.querySelectorAll('.scroll-animation').forEach(el => {
        observer.observe(el);
    });

    // Observar tarjetas individuales con delay progresivo (efecto escalonado)
    const animatedItems = document.querySelectorAll('.card, .servicio-card, .trabajo-item');
    animatedItems.forEach((el, index) => {
        el.classList.add('scroll-animation'); // Asegura que tengan la clase
        el.style.transitionDelay = `${index * 0.15}s`; // 0s, 0.15s, 0.30s...
        observer.observe(el);
    });

    // === EFECTO NAVBAR AL SCROLLEAR ===
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            document.querySelector(".navbar").classList.add("scrolled");
        } else {
            document.querySelector(".navbar").classList.remove("scrolled");
        }
    });

    // Ejecutar al cargar
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);
});