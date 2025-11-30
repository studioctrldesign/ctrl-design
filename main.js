document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const offset = 120; 

    function updateActiveLink() {
        let current = "home";

        // Recorremos las secciones de arriba hacia abajo
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;

            // Si el scroll está dentro de esta sección → activarla
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        // ACTUALIZAR LOS ENLACES
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.dataset.target === current) {
                link.classList.add("active");
            }
        });
    }

    const elements = document.querySelectorAll(".scroll-animation");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 }); // se activa cuando el 10% del elemento es visible

    elements.forEach(el => observer.observe(el));

    // Ejecutar en cada scroll y al cargar
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        document.querySelector(".navbar").classList.add("scrolled");
    } else {
        document.querySelector(".navbar").classList.remove("scrolled");
    }
});