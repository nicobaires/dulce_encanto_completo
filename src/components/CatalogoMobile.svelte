<script>
  import { formatPrice } from '../lib/price';

  /**
   * Componente interactivo para catálogo en dispositivos móviles (Spec 001).
   * Muestra primero las categorías y permite profundizar en sus productos.
   * Construido con Runas de Svelte 5.
   */
  let { categories = [] } = $props();

  let selectedId = $state(null);

  const selectedCategory = $derived(
    categories.find((c) => c.id === selectedId) || null
  );

  function selectCategory(id) {
    selectedId = id;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  function clearSelection() {
    selectedId = null;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }
</script>

<div class="w-full">
  {#if selectedCategory === null}
    <!-- Vista 1: Selector de Categorías -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Categorías</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Seleccioná una categoría para explorar sus productos:</p>
    </div>

    <div class="grid grid-cols-1 gap-3.5">
      {#each categories as cat (cat.id)}
        <button
          type="button"
          onclick={() => selectCategory(cat.id)}
          class="w-full text-left p-4 rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 shadow-sm active:scale-[0.99] hover:shadow-md transition-all flex items-center gap-4 group"
        >
          <div class="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700">
            <img
              src={cat.imgSrc}
              alt={cat.name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute bottom-1 right-1 w-6 h-6 bg-rose-400 text-white rounded-full flex items-center justify-center text-xs shadow">
              <i class={`fas ${cat.icon}`} aria-hidden="true"></i>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-bold text-base text-gray-800 dark:text-gray-100 group-hover:text-rose-500 transition-colors truncate">
                {cat.name}
              </h3>
              <span class="text-xs px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-300 font-medium">
                {cat.products.length} {cat.products.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {cat.description}
            </p>
          </div>

          <i class="fas fa-chevron-right text-gray-300 dark:text-gray-600 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all text-sm shrink-0" aria-hidden="true"></i>
        </button>
      {/each}
    </div>
  {:else}
    <!-- Vista 2: Productos de la Categoría Seleccionada -->
    <div class="space-y-6">
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          type="button"
          onclick={clearSelection}
          class="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-gray-800 px-3.5 py-2 rounded-xl transition-colors active:scale-95"
          aria-label="Volver a las categorías"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          Volver a categorías
        </button>

        <a
          href={`/productos/${selectedCategory.id}`}
          class="text-xs text-gray-500 dark:text-gray-400 hover:text-rose-400 font-medium flex items-center gap-1"
        >
          Ver página completa <i class="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
        </a>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-rose-400 text-white flex items-center justify-center text-lg shadow-sm">
          <i class={`fas ${selectedCategory.icon}`} aria-hidden="true"></i>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCategory.name}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">{selectedCategory.description}</p>
        </div>
      </div>

      {#if selectedCategory.products.length === 0}
        <p class="text-center py-10 text-gray-400 text-sm">No hay productos disponibles en esta categoría.</p>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each selectedCategory.products as p (p.id)}
            <a
              href={p.href}
              class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 block hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div class="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={p.imgSrc}
                  alt={p.name}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-base text-gray-800 dark:text-gray-100 mb-1 group-hover:text-rose-500 transition-colors">
                  {p.name}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                  {p.description}
                </p>
                {#if formatPrice(p.price)}
                  <p class="text-rose-500 font-bold text-base">
                    {formatPrice(p.price)}
                  </p>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      {/if}

      <div class="pt-6 text-center">
        <button
          type="button"
          onclick={clearSelection}
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-500 transition-colors py-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
          Volver a todas las categorías
        </button>
      </div>
    </div>
  {/if}
</div>

