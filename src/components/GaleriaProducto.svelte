<script>
  /**
   * Componente de galería de producto con Svelte 5.
   * Recibe la imagen principal y las fotos adicionales preprocesadas.
   */
  let { imagenPrincipal, galeria = [], nombre } = $props();

  let imagenActiva = $state(imagenPrincipal.src);
  let altActivo = $state(nombre);

  function seleccionar(img, altText) {
    imagenActiva = img.src;
    altActivo = altText;
  }
</script>

<div>
  <div class="rounded-2xl overflow-hidden shadow-lg border border-rose-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
    <img
      src={imagenActiva}
      alt={altActivo}
      class="w-full h-auto max-h-[460px] object-cover transition-opacity duration-200"
      loading="eager"
    />
  </div>

  {#if galeria && galeria.length > 0}
    <div class="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
      <!-- Thumbnail de la imagen principal -->
      <button
        type="button"
        onclick={() => seleccionar(imagenPrincipal, nombre)}
        class="w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all {imagenActiva === imagenPrincipal.src ? 'border-rose-400 ring-2 ring-rose-200' : 'border-transparent hover:border-rose-300 opacity-70 hover:opacity-100'}"
        aria-label="Ver imagen principal"
      >
        <img
          src={imagenPrincipal.src}
          alt={nombre}
          class="w-full h-full object-cover"
        />
      </button>

      <!-- Thumbnails de fotos secundarias -->
      {#each galeria as foto, index (foto.src)}
        <button
          type="button"
          onclick={() => seleccionar(foto, `${nombre} - foto ${index + 1}`)}
          class="w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all {imagenActiva === foto.src ? 'border-rose-400 ring-2 ring-rose-200' : 'border-transparent hover:border-rose-300 opacity-70 hover:opacity-100'}"
          aria-label="Ver foto adicional {index + 1}"
        >
          <img
            src={foto.src}
            alt="{nombre} - foto {index + 1}"
            class="w-full h-full object-cover"
          />
        </button>
      {/each}
    </div>
  {/if}
</div>

