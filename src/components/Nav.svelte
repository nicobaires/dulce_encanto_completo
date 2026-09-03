<script>
  let menuOpen = $state(false);
  let darkMode = $state(false);
  let activeId = $state('');

  function toggleDark() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('dark-mode', darkMode);
  }

  function closeMenu() {
    menuOpen = false;
  }

  function scrollTo(href) {
    const id = href.replace('/#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = href;
    }
    closeMenu();
  }

  $effect(() => {
    const saved = localStorage.getItem('dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'true' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
      darkMode = true;
    }
  });

  $effect(() => {
    function onScroll() {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        if (window.pageYOffset >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });
      activeId = current;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<nav
  aria-label="Navegación principal"
  class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 transition-colors"
>
  <div class="max-w-6xl mx-auto px-4 py-4">
    <div class="flex justify-between items-center gap-10">
      <a href="/" class="flex items-center gap-3 flex-shrink-0">
        <i class="fas fa-birthday-cake text-2xl text-rose-400" aria-hidden="true"></i>
        <div>
          <span class="text-lg font-bold text-gray-800 dark:text-gray-100">Cocina LoLa</span>
          <p class="text-xs font-semibold text-rose-400 tracking-wider">PASTELERÍA ARTESANAL</p>
        </div>
      </a>

      <div class="flex items-center gap-4">
        <button
          onclick={toggleDark}
          aria-label="Alternar modo oscuro"
          class="text-gray-600 dark:text-gray-300 hover:text-rose-400 dark:hover:text-rose-400 text-lg transition-colors"
        >
          <i class="fas {darkMode ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>
        </button>
        <button
          onclick={() => menuOpen = !menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          class="md:hidden text-gray-700 dark:text-gray-300 text-2xl p-1"
        >
          <i class="fas {menuOpen ? 'fa-times' : 'fa-bars'}" aria-hidden="true"></i>
        </button>
      </div>

      <ul
        class="gap-8 flex-1 {menuOpen ? 'flex' : 'hidden'} md:flex max-md:fixed max-md:inset-0 max-md:top-16 max-md:bg-white max-md:dark:bg-gray-900 max-md:flex-col max-md:items-center max-md:gap-6 max-md:pt-10 max-md:z-40"
      >
        <li>
          <a
            href="/#inicio"
            class="nav-link text-sm font-medium {activeId === 'inicio' || activeId === '' ? 'text-rose-400' : 'text-gray-700 dark:text-gray-200 hover:text-rose-400 dark:hover:text-rose-400'} transition-colors"
            onclick={(e) => { e.preventDefault(); scrollTo('/#inicio'); }}
          >Inicio</a>
        </li>
        <li>
          <a
            href="/#productos"
            class="nav-link text-sm font-medium {activeId === 'productos' ? 'text-rose-400' : 'text-gray-700 dark:text-gray-200 hover:text-rose-400 dark:hover:text-rose-400'} transition-colors"
            onclick={(e) => { e.preventDefault(); scrollTo('/#productos'); }}
          >Productos</a>
        </li>
        <li>
          <a
            href="/#sobre-mi"
            class="nav-link text-sm font-medium {activeId === 'sobre-mi' ? 'text-rose-400' : 'text-gray-700 dark:text-gray-200 hover:text-rose-400 dark:hover:text-rose-400'} transition-colors"
            onclick={(e) => { e.preventDefault(); scrollTo('/#sobre-mi'); }}
          >Sobre mí</a>
        </li>
        <li>
          <a
            href="/#pedidos"
            class="nav-link text-sm font-medium {activeId === 'pedidos' ? 'text-rose-400' : 'text-gray-700 dark:text-gray-200 hover:text-rose-400 dark:hover:text-rose-400'} transition-colors"
            onclick={(e) => { e.preventDefault(); scrollTo('/#pedidos'); }}
          >Pedidos</a>
        </li>
        <li>
          <a
            href="/#contacto"
            class="nav-link text-sm font-medium {activeId === 'contacto' ? 'text-rose-400' : 'text-gray-700 dark:text-gray-200 hover:text-rose-400 dark:hover:text-rose-400'} transition-colors"
            onclick={(e) => { e.preventDefault(); scrollTo('/#contacto'); }}
          >Contacto</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
