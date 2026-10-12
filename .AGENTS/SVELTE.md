# Guía Svelte 5 — CocinaLola

> Complementa a [AGENTS.md](../AGENTS.md), que prevalece en caso de conflicto. Leer solo al crear o modificar archivos `.svelte`.

## Alcance
Islas interactivas del sitio: menús, carruseles, formularios, filtros visuales, toggles y estados de carga. `localStorage` solo para preferencias visuales no críticas.

## Sintaxis: Svelte 5 con runas
Usar solo la sintaxis nueva. Errores típicos a evitar:

| No usar (Svelte 3/4) | Usar (Svelte 5) |
|----------------------|-----------------|
| `let count = 0` (reactivo) | `let count = $state(0)` |
| `$: doble = count * 2` | `const doble = $derived(count * 2)` |
| `$: { ... }` (efectos) | `$effect(() => { ... })` |
| `export let titulo` | `let { titulo } = $props()` |
| `on:click={fn}` | `onclick={fn}` |
| `createEventDispatcher` | props con callbacks (`let { onCambio } = $props()`) |
| `<slot />` | `{@render children()}` |

Reglas de estado:
- `let` para primitivos reasignables, `const` para valores derivados.
- Preferir `$derived` antes que `$effect`; usar `$effect` solo para efectos externos (DOM, `localStorage`).
- `onMount` solo si es estrictamente necesario y se justifica.

## Diseño de componentes
- Pequeños y con una sola responsabilidad.
- Reciben datos por props o callbacks; no consultan globales ni accesos a contenido.
- La lógica de negocio (precios, combos, validación de pedidos) va fuera del componente.
- Accesibles: labels claros en inputs y buttons, y comportamiento mobile-first.

## Imágenes
`<Image />` de `astro:assets` solo funciona en `.astro`. En Svelte, recibir la imagen ya procesada como prop (ruta o metadatos) o por snippet. No usar `<img>` con rutas crudas.

## Antes de entregar
1. La UI no rompe el layout general ni el contenido de Astro.
2. `pnpm run build` pasa.
3. Resumir en pocas líneas qué hace el componente y qué props o callbacks expone.