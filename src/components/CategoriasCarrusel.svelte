<script>
  /**
   * Carrusel interactivo de categorías para la Home (Opción 1).
   * - En celular (<768px): Desplazamiento táctil con efecto asomo (peek effect) y snap centrado.
   * - En desktop (>=768px): Fila fija con flechas de navegación circulares y dots.
   * Construido con Runas de Svelte 5 conforme a .agents/agents/svelte.md.
   */
  let { categories = [] } = $props();

  let current = $state(0);
  let perView = $state(5);
  const total = categories.length;
  const max = $derived(Math.max(0, total - perView));

  let resizeTimeout = $state(null);

  function updateLayout() {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    perView = w < 1024 ? 4 : 5;
    current = Math.min(current, max);
  }

  $effect(() => {
    updateLayout();
    function onResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateLayout, 150);
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
    };
  });

  function prev() {
    current = current > 0 ? current - 1 : max;
  }

  function next() {
    current = current < max ? current + 1 : 0;
  }

  function goTo(i) {
    current = i;
  }
</script>

<div class="w-full">
  <!-- VISTA MOBILE (<768px): Swipe táctil nativo con Peek Effect -->
  <div class="block md:hidden">
    <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4">
      {#each categories as c (c.id)}
        <a
          href={`/productos/${c.id}`}
          class="group w-[72vw] max-w-[240px] shrink-0 snap-center rounded-2xl border border-rose-100 dark:border-gray-700 shadow-sm dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-800 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden bg-rose-50/60 dark:bg-gray-800/60 block"
        >
          <div class="relative aspect-[3/4] w-3/4 mx-auto mt-4 rounded-full overflow-hidden shadow-md dark:shadow-gray-800 bg-gray-100 dark:bg-gray-800">
            <img
              src={c.imgSrc}
              alt={c.name}
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div class="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center text-white text-base shadow-md dark:shadow-gray-800 -mt-5 mx-auto relative z-10">
            <i class={`fas ${c.icon}`} aria-hidden="true"></i>
          </div>
          <div class="p-4 text-center">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-rose-500 transition-colors">{c.name}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">{c.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>

  <!-- VISTA DESKTOP (>=768px): Slider uniforme con flechas laterales -->
  <div class="hidden md:block relative max-w-6xl mx-auto px-6">
    <div class="overflow-hidden py-2">
      <div
        class="flex transition-transform duration-300 ease-out"
        style="transform: translateX(-{current * (100 / perView)}%)"
      >
        {#each categories as c (c.id)}
          <div
            style="flex: 0 0 {100 / perView}%;"
            class="px-2.5 box-border shrink-0"
          >
            <a
              href={`/productos/${c.id}`}
              class="group block w-full rounded-2xl border border-rose-100 dark:border-gray-700 shadow-sm dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-800 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden bg-rose-50/60 dark:bg-gray-800/60"
            >
              <div class="relative aspect-[3/4] w-3/4 mx-auto mt-4 rounded-full overflow-hidden shadow-md dark:shadow-gray-800 bg-gray-100 dark:bg-gray-800">
                <img
                  src={c.imgSrc}
                  alt={c.name}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center text-white text-base shadow-md dark:shadow-gray-800 -mt-5 mx-auto relative z-10">
                <i class={`fas ${c.icon}`} aria-hidden="true"></i>
              </div>
              <div class="p-4 text-center">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-rose-500 transition-colors">{c.name}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">{c.description}</p>
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>

    {#if total > perView}
      <button
        type="button"
        onclick={prev}
        aria-label="Categorías anteriores"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 lg:-translate-x-3 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-gray-600 transition-all z-20 border border-gray-100 dark:border-gray-600 cursor-pointer"
      >
        <i class="fas fa-chevron-left text-sm" aria-hidden="true"></i>
      </button>

      <button
        type="button"
        onclick={next}
        aria-label="Categorías siguientes"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 lg:translate-x-3 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-gray-600 transition-all z-20 border border-gray-100 dark:border-gray-600 cursor-pointer"
      >
        <i class="fas fa-chevron-right text-sm" aria-hidden="true"></i>
      </button>

      <div class="flex justify-center gap-2 mt-6">
        {#each Array(max + 1) as _, i}
          <button
            type="button"
            onclick={() => goTo(i)}
            aria-label="Ir al grupo {i + 1}"
            class="h-2 rounded-full transition-all {i === current ? 'bg-rose-400 w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 w-2'}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
</div>

