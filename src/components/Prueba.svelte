<script>
  let nombre = $state('');
  let email = $state('');
  let asunto = $state('');
  let mensaje = $state('');
  let enviando = $state(false);
  let enviado = $state(false);
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

  async function submit() {
    touched = { nombre: true, email: true, asunto: true, mensaje: true };
    if (!valido) return;

    enviando = true;
    await new Promise(r => setTimeout(r, 1500));
    enviando = false;
    enviado = true;
  }

  function resetForm() {
    nombre = '';
    email = '';
    asunto = '';
    mensaje = '';
    touched = { nombre: false, email: false, asunto: false, mensaje: false };
    enviado = false;
  }
</script>

<div class="max-w-lg mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-rose-100">
  <h2 class="text-3xl font-serif text-rose-800 text-center mb-2">Contacto</h2>
  <p class="text-gray-500 text-center mb-8 text-sm">Dejanos tu mensaje y te respondemos a la brevedad</p>

  {#if enviado}
    <div class="text-center py-12">
      <div class="text-5xl mb-4">✨</div>
      <h3 class="text-2xl font-serif text-rose-700 mb-2">¡Mensaje enviado!</h3>
      <p class="text-gray-500 mb-6">Gracias por contactarnos. Te responderemos pronto.</p>
      <button
        onclick={resetForm}
        class="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
      >
        Enviar otro
      </button>
    </div>
  {:else}
    <form onsubmit={(e) => { e.preventDefault(); submit(); }} class="space-y-5">
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          id="nombre"
          type="text"
          bind:value={nombre}
          onblur={() => handleBlur('nombre')}
          class="w-full px-4 py-3 rounded-xl border {touched.nombre && errors.nombre ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200'} outline-none transition-all duration-200"
          placeholder="Tu nombre"
        />
        {#if touched.nombre && errors.nombre}
          <p class="text-red-500 text-xs mt-1 ml-1">{errors.nombre}</p>
        {/if}
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          onblur={() => handleBlur('email')}
          class="w-full px-4 py-3 rounded-xl border {touched.email && errors.email ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200'} outline-none transition-all duration-200"
          placeholder="tu@email.com"
        />
        {#if touched.email && errors.email}
          <p class="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
        {/if}
      </div>

      <div>
        <label for="asunto" class="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
        <input
          id="asunto"
          type="text"
          bind:value={asunto}
          onblur={() => handleBlur('asunto')}
          class="w-full px-4 py-3 rounded-xl border {touched.asunto && errors.asunto ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200'} outline-none transition-all duration-200"
          placeholder="¿Sobre qué nos querés escribir?"
        />
        {#if touched.asunto && errors.asunto}
          <p class="text-red-500 text-xs mt-1 ml-1">{errors.asunto}</p>
        {/if}
      </div>

      <div>
        <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
        <textarea
          id="mensaje"
          bind:value={mensaje}
          onblur={() => handleBlur('mensaje')}
          rows="5"
          class="w-full px-4 py-3 rounded-xl border {touched.mensaje && errors.mensaje ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-200'} outline-none transition-all duration-200 resize-none"
          placeholder="Escribí tu mensaje acá..."
        ></textarea>
        <div class="flex justify-between items-center mt-1">
          {#if touched.mensaje && errors.mensaje}
            <p class="text-red-500 text-xs ml-1">{errors.mensaje}</p>
          {:else}
            <span></span>
          {/if}
          <span class="text-xs {restantes <= 20 ? 'text-red-500 font-semibold' : 'text-gray-400'}">
            {restantes} caracteres restantes
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={enviando}
        class="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 {valido ? 'bg-rose-500 hover:bg-rose-600 shadow-md hover:shadow-lg' : 'bg-gray-300 cursor-not-allowed'}"
      >
        {#if enviando}
          <span class="inline-flex items-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Enviando...
          </span>
        {:else}
          Enviar mensaje
        {/if}
      </button>
    </form>
  {/if}
</div>
