function openLightbox(src, title) {
    var lb = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');
    var titleEl = document.getElementById('lightbox-title');
    var wa = document.getElementById('lightbox-wa');
    img.src = src;
    img.alt = title;
    titleEl.textContent = title;
    wa.href = 'https://wa.me/5491123456789?text=' + encodeURIComponent('Hola, me gustaría conocer más sobre ' + title);
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    var lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    document.body.style.overflow = '';
}

(function () {
    function setup() {
        if (document.body.dataset.mcInit) return;
        document.body.dataset.mcInit = '1';
        document.querySelectorAll('.order-btn, .btn-primary, .btn-secondary').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var phoneNumber = '5491123456789';
                var message = encodeURIComponent('Hola, me gustaría hacer un pedido a Cocina LoLa');
                window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');
            });
        });

        document.querySelectorAll('.product-card').forEach(function (card) {
            if (!card.closest('a')) {
                card.addEventListener('click', function () {
                    var img = this.querySelector('img');
                    var title = this.querySelector('h3');
                    if (img && title) openLightbox(img.src, title.textContent);
                });
            }
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.dataset.fadeDelay || 0;
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

        var fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        fadeEls.forEach(function (el, i) {
            var parent = el.closest('.grid, .flex');
            if (parent) {
                var siblings = Array.from(parent.children).filter(function (c) { return c.classList.contains('fade-in') || c.classList.contains('fade-in-left') || c.classList.contains('fade-in-right'); });
                var idx = siblings.indexOf(el);
                var isMobile = window.innerWidth < 768;
                if (idx > 0) el.dataset.fadeDelay = isMobile ? idx * 40 : idx * 80;
            }
            observer.observe(el);
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    var pageLoadFired = false;
    document.addEventListener('astro:page-load', function () {
        pageLoadFired = true;
        setup();
    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!pageLoadFired) setup();
    });
})();
