<script>
  let nombre = $state('');
  let email = $state('');
  let asunto = $state('');
  let mensaje = $state('');
  let touched = $state({ nombre: false, email: false, asunto: false, mensaje: false });

  let errors = $derived({
    nombre: nombre.trim().length === 0 ? 'El nombre es obligatorio' : '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : email.length === 0 ? '' : 'Email inválido',
    asunto: asunto.trim().length === 0 ? 'El asunto es obligatorio' : '',
    mensaje: mensaje.trim().length < 10 ? 'Debe tener al menos 10 caracteres' : '',
  });

  let valido = $derived(
    errors.nombre === '' && errors.email === '' && errors.asunto === '' && errors.mensaje === '' &&
    nombre.trim() !== '' && email.trim() !== '' && asunto.trim() !== '' && mensaje.trim().length >= 10
  );

  let restantes = $derived.by(() => {
    const r = 500 - mensaje.length;
    return r < 0 ? 0 : r;
  });

  function handleBlur(campo) {
    touched[campo] = true;
  }

  function submit() {
    touched = { nombre: true, email: true, asunto: true, mensaje: true };
    if (!valido) return;

    const texto = `Hola, soy ${nombre} (${email}).%0A%0AAsunto: ${encodeURIComponent(asunto)}%0A%0A${encodeURIComponent(mensaje)}`;
    window.open(`https://wa.me/5491123456789?text=${texto}`, '_blank');
  }
</script>

<section id="contacto" class="py-24 bg-rose-50 dark:bg-gray-800 scroll-mt-20">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <p class="label text-rose-400 mb-3">CONTACTO</p>
      <h2 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">Escribinos</h2>
    </div>
    <div class="max-w-lg mx-auto">
      <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="fade-in space-y-5 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg dark:shadow-gray-800 border border-gray-100 dark:border-gray-700">
        <div>
          <input
            id="contacto-nombre"
            type="text"
            bind:value={nombre}
            onblur={() => handleBlur('nombre')}
            class="w-full px-5 py-3 rounded-xl border {touched.nombre && errors.nombre ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'} outline-none transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Tu nombre"
          />
          {#if touched.nombre && errors.nombre}
            <p class="text-red-500 text-xs mt-1 ml-1">{errors.nombre}</p>
          {/if}
        </div>

        <div>
          <input
            id="contacto-email"
            type="email"
            bind:value={email}
            onblur={() => handleBlur('email')}
            class="w-full px-5 py-3 rounded-xl border {touched.email && errors.email ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'} outline-none transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="tu@email.com"
          />
          {#if touched.email && errors.email}
            <p class="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
          {/if}
        </div>

        <div>
          <input
            id="contacto-asunto"
            type="text"
            bind:value={asunto}
            onblur={() => handleBlur('asunto')}
            class="w-full px-5 py-3 rounded-xl border {touched.asunto && errors.asunto ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'} outline-none transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="¿Sobre qué nos querés escribir?"
          />
          {#if touched.asunto && errors.asunto}
            <p class="text-red-500 text-xs mt-1 ml-1">{errors.asunto}</p>
          {/if}
        </div>

        <div>
          <textarea
            id="contacto-mensaje"
            bind:value={mensaje}
            onblur={() => handleBlur('mensaje')}
            rows="4"
            maxlength={500}
            class="w-full px-5 py-3 rounded-xl border {touched.mensaje && errors.mensaje ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'} outline-none transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            placeholder="Contanos qué te gustaría pedir..."
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            {#if touched.mensaje && errors.mensaje}
              <p class="text-red-500 text-xs ml-1">{errors.mensaje}</p>
            {:else}
              <span></span>
            {/if}
            <span class="text-xs {restantes <= 20 ? 'text-red-500 font-semibold' : 'text-gray-400 dark:text-gray-500'}">
              {restantes} caracteres restantes
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!valido}
          class="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 {valido ? 'bg-green-500 hover:bg-green-600 shadow-md dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-800 hover:-translate-y-0.5 flex items-center justify-center gap-2' : 'bg-gray-300 cursor-not-allowed'}"
        >
          <i class="fab fa-whatsapp" aria-hidden="true"></i>
          Enviar por WhatsApp
        </button>
      </form>
    </div>
  </div>
</section>
