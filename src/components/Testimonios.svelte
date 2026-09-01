<script>
  const testimonios = [
    {
      nombre: 'María',
      texto: 'Pedí una torta personalizada para el cumpleaños de mi hija y fue un éxito. Todos preguntaban dónde la había comprado.',
      estrellas: 5,
    },
    {
      nombre: 'Carlos',
      texto: 'Los alfajores de maicena son los mejores que probé. Pido cada semana y siempre llegan frescos.',
      estrellas: 5,
    },
    {
      nombre: 'Lucía',
      texto: 'El budín de limón es espectacular. Ideal para acompañar el mate a la tarde.',
      estrellas: 5,
    },
    {
      nombre: 'Jorge',
      texto: 'Hicieron la torta para mi casamiento. Quedó exactamente como la imaginamos, y el sabor inolvidable.',
      estrellas: 5,
    },
  ];

  let current = $state(0);
  const total = testimonios.length;

  function next() {
    current = (current + 1) % total;
  }

  function prev() {
    current = (current - 1 + total) % total;
  }

  $effect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  });
</script>

<section class="py-24 bg-rose-50 dark:bg-gray-800 scroll-mt-20">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <p class="label text-rose-400 mb-3">TESTIMONIOS</p>
      <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">Lo que dicen nuestros clientes</h2>
    </div>
    <div class="max-w-3xl mx-auto relative">
      <div class="relative h-72 md:h-64">
        {#each testimonios as t, i}
          <div
            class="absolute inset-0 transition-opacity duration-500 {i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
          >
            <div class="bg-rose-50 dark:bg-gray-800 rounded-2xl p-8 md:p-10 text-center">
              <div class="flex justify-center gap-1 mb-6 text-amber-400 text-lg">
                {#each Array(t.estrellas) as _, j}
                  <i class="fas fa-star" aria-hidden="true"></i>
                {/each}
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed italic">
                &ldquo;{t.texto}&rdquo;
              </p>
              <p class="text-gray-800 dark:text-gray-100 font-semibold mt-6 text-lg">
                &mdash; {t.nombre}
              </p>
            </div>
          </div>
        {/each}
      </div>

      <button
        onclick={prev}
        aria-label="Testimonio anterior"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-rose-400 transition-colors"
      >
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button
        onclick={next}
        aria-label="Siguiente testimonio"
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-rose-400 transition-colors"
      >
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </button>

      <div class="flex justify-center gap-2 mt-8">
        {#each testimonios as _, i}
          <button
            onclick={() => current = i}
            aria-label="Ir al testimonio {i + 1}"
            class="w-2.5 h-2.5 rounded-full transition-all {i === current ? 'bg-rose-400 w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section>
