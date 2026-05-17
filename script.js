/* ============================================
   TUPAGINA ESMERALDAS - JavaScript
   Animaciones, interacciones y efectos
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // NAVBAR - CAMBIO AL HACER SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateNavbar() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // ==========================================
    // MENÚ HAMBURGUESA (MÓVIL)
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // ==========================================
    // NAVEGACIÓN ACTIVA POR SECCIÓN
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ==========================================
    // CONTADORES ANIMADOS (HERO STATS)
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 50;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = Math.ceil(target / 60);
            let count = 0;

            function updateCount() {
                count += increment;
                if (count < target) {
                    counter.textContent = count;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            }

            updateCount();
        });
    }

    // ==========================================
    // INTERSECTION OBSERVER - REVEAL EN SCROLL
    // ==========================================
    function setupRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.product-card, .valor-item, .contact-card, .nosotros-content, .nosotros-image, .contacto-form'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });

        // Observar también las stats del hero
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }

    setupRevealAnimations();

    // ==========================================
    // PARALLAX EN FLOATING GEMS
    // ==========================================
    const gems = document.querySelectorAll('.gem');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gems.forEach((gem, index) => {
            const speed = (index + 1) * 0.5;
            gem.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ==========================================
    // FORMULARIO DE CONTACTO
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !email || !mensaje) {
            showToast('Por favor completa los campos requeridos.', 'error');
            return;
        }

        // Simulación de envío exitoso
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✉️ Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            showToast('✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            contactForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    function showToast(message, type = 'success') {
        // Eliminar toast existente si hay
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // Estilos inline para el toast
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.95rem',
            fontWeight: '500',
            color: '#fff',
            background: type === 'success'
                ? 'linear-gradient(135deg, #1e8449, #27ae60)'
                : 'linear-gradient(135deg, #922b21, #e74c3c)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '400px',
            border: '1px solid rgba(212,175,55,0.2)'
        });

        document.body.appendChild(toast);

        // Animar entrada
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        // Remover después de 4 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ==========================================
    // EFECTO DE ESCRITURA EN HERO (OPCIONAL)
    // ==========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // El título ya tiene el efecto shimmer vía CSS
        // Solo agregamos un pequeño efecto de aparición
        heroTitle.style.animation = 'fadeInScale 1s ease-out forwards';
    }

    // ==========================================
    // ICONOS ALEATORIOS - REEMPLAZAR CON IMÁGENES PNG
    // ==========================================
    function setRandomIcons() {
        const images = ['1.png', '2.png', '3.png', '4.png'];
        const icons = document.querySelectorAll('.random-icon');

        icons.forEach(icon => {
            const randomIndex = Math.floor(Math.random() * images.length);
            icon.src = images[randomIndex];
        });
    }

    setRandomIcons();

    // ==========================================
    // BOTONES "CONSULTAR PRECIO" - SCROLL A CONTACTO
    // ==========================================
    const consultButtons = document.querySelectorAll('.btn-card');
    consultButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                contactoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log('💎 TuPagina Esmeraldas - Página cargada con éxito');
});
