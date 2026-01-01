document.addEventListener("DOMContentLoaded", function () {

    /* ================== MENU HAMBURGUESA ================== */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("open");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinksContainer.classList.remove("open");
            });
        });
    }

    /* ================== SCROLL ACTIVO ================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const offset = 120;

    function updateActiveLink() {
        let current = "home";

        const reversedSections = Array.from(sections).reverse();

        for (const section of reversedSections) {
            const sectionTop = section.offsetTop - offset;

            if (window.scrollY + offset >= sectionTop) {
                current = section.getAttribute("id");
                break;
            }
        }

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
            current = sections[sections.length - 1].getAttribute("id");
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.dataset.target === current) {
                link.classList.add("active");
            }
        });
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);

    /* ================== SCROLL ANIMATIONS ================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animation').forEach(el => {
        observer.observe(el);
    });

    const animatedItems = document.querySelectorAll('.card, .servicio-card, .trabajo-item');
    animatedItems.forEach((el, index) => {
        el.classList.add('scroll-animation');
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });

    /* ================== NAVBAR SCROLL ================== */
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

});
