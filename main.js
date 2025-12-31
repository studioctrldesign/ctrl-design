document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburger = document.getElementById("hamburger");
    const navLinksContainer = document.getElementById("navLinks");
    const offset = 120;

    // Hamburger menu toggle
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinksContainer.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinksContainer.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar")) {
            hamburger.classList.remove("active");
            navLinksContainer.classList.remove("active");
        }
    });

    function updateActiveLink() {
    let current = "home";

    const reversedSections = Array.from(sections).reverse();

    for (const section of reversedSections) {
        const sectionTop = section.offsetTop - offset;
        const sectionBottom = sectionTop + section.offsetHeight;

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

    document.querySelectorAll('.scroll-animation').forEach(el => {
        observer.observe(el);
    });

    const animatedItems = document.querySelectorAll('.card, .servicio-card, .trabajo-item');
    animatedItems.forEach((el, index) => {
        el.classList.add('scroll-animation'); 
        el.style.transitionDelay = `${index * 0.15}s`; 
        observer.observe(el);
    });


    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            document.querySelector(".navbar").classList.add("scrolled");
        } else {
            document.querySelector(".navbar").classList.remove("scrolled");
        }
    });

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);
});