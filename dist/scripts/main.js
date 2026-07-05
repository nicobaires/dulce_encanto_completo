document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Menú hamburguesa
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.contains('flex');
            navMenu.classList.toggle('flex', !isOpen);
            navMenu.classList.toggle('hidden', isOpen);
            this.setAttribute('aria-expanded', !isOpen);
            const icon = this.querySelector('i');
            icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth < 768) {
                    navMenu.classList.add('hidden');
                    navMenu.classList.remove('flex');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav on scroll
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('.order-btn, .btn-primary, .btn-secondary');
    const phoneNumber = '5491123456789';
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const message = encodeURIComponent('Hola, me gustaría hacer un pedido a Dulce Encanto');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });

    // Lightbox en páginas de categoría
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (!card.closest('a')) {
            card.addEventListener('click', function () {
                const img = this.querySelector('img');
                const title = this.querySelector('h3').textContent;
                openLightbox(img.src, title);
            });
        }
    });

    // Cerrar lightbox con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    // Intersection Observer for fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

function openLightbox(src, title) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const wa = document.getElementById('lightbox-wa');
    img.src = src;
    img.alt = title;
    titleEl.textContent = title;
    wa.href = `https://wa.me/5491123456789?text=${encodeURIComponent('Hola, me gustaría conocer más sobre ' + title)}`;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    document.body.style.overflow = '';
}
