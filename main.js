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
    }
    );
});

document.getElementById("FormContact").addEventListener("submit", async function(e) {
    e.preventDefault();

    let errores = [];

    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let email = document.getElementById("email").value.trim();
    let celular = document.getElementById("celular").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    // Validaciones
    if (nombre.length < 3 || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
        errores.push("• Ingresá un nombre válido con más de 3 letras.");
    }

    if (apellido.length < 3 || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(apellido)) {
        errores.push("• Ingresá un apellido válido con más de 3 letras.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errores.push("• Ingresá un email válido que contenga @.");
    }

    if (!/^[0-9+ ]{6,}$/.test(celular)) {
        errores.push("• Ingresá un número de celular válido (mínimo 6 dígitos).");
    }

    if (mensaje.length < 5) {
        errores.push("• El mensaje debe tener al menos 5 caracteres.");
    }

    const divErrores = document.getElementById("errores");
    divErrores.innerHTML = "";

    if (errores.length > 0) {
        divErrores.innerHTML = errores.join("<br>");
        return;
    }

    // Si todo está bien → enviar con fetch
    const formData = new FormData(this);

    try {
        divErrores.style.color = "#00d4d4";
        divErrores.innerHTML = "Enviando mensaje...";

        const response = await fetch("https://formspree.io/f/xjknyvkd", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            divErrores.style.color = "#4caf50";
            divErrores.innerHTML = "¡Mensaje enviado con éxito! Pronto te contactaremos.";
            this.reset();
        } else {
            divErrores.style.color = "#ff4d6d";
            divErrores.innerHTML = "Hubo un error al enviar. Inténtalo más tarde.";
        }
    } catch (error) {
        divErrores.style.color = "#ff4d6d";
        divErrores.innerHTML = "Error de conexión. Revisa tu internet.";
    }
});