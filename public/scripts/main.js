(function () {
    function setupFadeIn() {
        if (document.body.dataset.mcInit) return;
        document.body.dataset.mcInit = '1';

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
        fadeEls.forEach(function (el) {
            var parent = el.closest('.grid, .flex');
            if (parent) {
                var siblings = Array.from(parent.children).filter(function (c) {
                    return c.classList.contains('fade-in') || c.classList.contains('fade-in-left') || c.classList.contains('fade-in-right');
                });
                var idx = siblings.indexOf(el);
                var isMobile = window.innerWidth < 768;
                if (idx > 0) el.dataset.fadeDelay = isMobile ? idx * 40 : idx * 80;
            }
            observer.observe(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFadeIn);
    } else {
        setupFadeIn();
    }
})();
