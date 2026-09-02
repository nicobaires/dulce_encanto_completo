<script>
  let { cards } = $props();
  let current = $state(0);
  let perView = $state(1);
  let hover = $state(false);
  const total = cards.length;
  const max = $derived(Math.max(0, total - perView));

  function updatePerView() {
    const w = window.innerWidth;
    perView = w < 768 ? 1 : w < 1024 ? 2 : 3;
    current = Math.min(current, max);
  }

  $effect(() => {
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  });

  $effect(() => {
    if (hover || total <= perView) return;
    const id = setInterval(() => {
      current = current >= max ? 0 : current + 1;
    }, 5000);
    return () => clearInterval(id);
  });

  function goTo(i) { current = i; }
  function prev() { current = current > 0 ? current - 1 : max; }
  function next() { current = current < max ? current + 1 : 0; }

  function formatPrice(value) {
    if (!value) return '';
    const num = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) return '';
    return '$' + num.toLocaleString('es-AR');
  }

  function cardStyle() {
    return `flex: 0 0 ${100 / perView}%`;
  }
</script>

<section
  class="py-24 bg-rose-50 dark:bg-gray-800 scroll-mt-20"
  onmouseenter={() => hover = true}
  onmouseleave={() => hover = false}
>
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <p class="label text-rose-400 mb-3">DESTACADOS</p>
      <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">Los más pedidos</h2>
    </div>

    {#if total === 0}
      <p class="text-center text-gray-500 dark:text-gray-400">Próximamente más productos destacados.</p>
    {:else}
      <div class="relative max-w-5xl mx-auto">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-out"
            style="transform: translateX(-{current * (100 / perView)}%)"
          >
            {#each cards as card, i}
              <a
                href={card.href}
                style={cardStyle()}
                class="block px-3 box-border shrink-0"
              >
                <div class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-800 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800 cursor-pointer border border-gray-100 dark:border-gray-700 h-full">
                  <div class="relative h-56 overflow-hidden">
                    <img
                      src={card.imgSrc}
                      alt={card.name}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{card.name}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{card.description}</p>
                    {#if formatPrice(card.price)}
                      <p class="text-rose-500 font-bold text-lg">{formatPrice(card.price)}</p>
                    {/if}
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>

        {#if total > perView}
          <button
            onclick={prev}
            aria-label="Anterior"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-rose-400 transition-colors"
          >
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button
            onclick={next}
            aria-label="Siguiente"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-rose-400 transition-colors"
          >
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>

          <div class="flex justify-center gap-2 mt-8">
            {#each Array(max + 1) as _, i}
              <button
                onclick={() => goTo(i)}
                aria-label="Ir al grupo {i + 1}"
                class="w-2.5 h-2.5 rounded-full transition-all {i === current ? 'bg-rose-400 w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}"
              ></button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>