# 🛠️ SKILL: Creación de Componentes Reactivos e Interactivos (Svelte 5 Runas)

## 1. Propósito
Este procedimiento operativo le enseña al agente las directrices exactas para codificar componentes interactivos `.svelte` dentro del directorio `src/components/`, garantizando el uso exclusivo de la sintaxis moderna de Svelte 5 (Runas), rendimiento óptimo y aislamiento de estilos con Tailwind CSS.

## 2. Regla de Oro Absoluta (Prohibición de Sintaxis Antigua)
Está **estrictamente prohibido** utilizar código reactivo obsoleto de versiones previas de Svelte. 
- ❌ NO usar `let` sueltos para variables reactivas.
- ❌ NO usar la declaración reactiva `$: ` para estados derivados o efectos secundarios.
- ❌ NO usar `export let` para declarar propiedades (props).

## 3. Guía de Implementación Estricta (Estructura Svelte 5)

Cualquier componente nuevo (carruseles, formularios, botones interactivos) debe estructurarse siguiendo esta plantilla base limpia:

```svelte
<script>
  // 1. RECEPCIÓN DE PROPS (Uso mandatorio de desestructuración)
  let { unPrecio, titulo, esDestacado = false } = \$props();

  // 2. ESTADO REACTIVO PRINCIPAL (Uso mandatorio de \$state)
  let contador = \$state(0);
  let menuAbierto = \$state(false);

  // 3. ESTADO DERIVADO / CALCULADO (Uso mandatorio de \$derived)
  // Reemplaza por completo al antiguo `$: total = precio * cantidad`
  let precioTotal = \$derived(unPrecio * contador);

  // 4. EFECTOS SECUNDARIOS / SINCRONIZACIÓN (Uso mandatorio de \$effect)
  // Úsalo solo para interactuar con la pantalla (DOM) o localStorage
  \$effect(() => {
    // Ejemplo: Guardar preferencia en la compu del usuario
    console.log("El contador cambió a:", contador);
  });

  // 5. FUNCIONES DE LÓGICA (Manejadores de eventos)
  function incrementar() {
    contador += 1;
  }
</script>

<!-- ESTRUCTURA HTML (Aislada y semántica) -->
<div class="p-4 bg-white rounded-lg shadow-sm border border-rose-100">
  <h3 class="text-chocolate font-serif text-lg">{titulo}</h3>
  
  {#if esDestacado}
    <span class="text-xs bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">Destacado</span>
  {/if}

  <div class="mt-4 flex items-center gap-4">
    <button 
      onclick={incrementar} 
      class="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded transition-colors"
    >
      Agregar ({contador})
    </button>
    
    <p class="text-sm text-gray-600">Total: <span class="font-bold">\${precioTotal}</span></p>
  </div>
</div>
```

## 4. Estilos y Clases Intercaladas (Tailwind CSS)
- **Modularidad:** El diseño visual debe resolverse en un 100% mediante clases utilitarias de Tailwind en las etiquetas HTML. Evita abrir bloques `<style>` locales dentro del componente a menos que sea una animación CSS compleja de transición.
- **Eventos Limpios:** Usa la sintaxis nativa de Svelte 5 para escuchar interacciones (ej. `onclick={funcion}` en lugar del viejo `on:click`).

## 5. Criterios de Aceptación del Código
Antes de proponer el componente al usuario, el agente debe verificar:
- [ ] ¿Todas las propiedades de entrada utilizan `$props()`?
- [ ] ¿Cualquier variable que cambie en tiempo real está envuelta en `$state()`?
- [ ] ¿Se eliminó cualquier rastro de la sintaxis antigua (`$:`, `on:`, `export let`)?
- [ ] ¿El componente es modular y se puede reutilizar importándolo en páginas `.astro`?
