# Spec 002 — Carrito local con pedido por WhatsApp

**Estado:** Borrador, pendiente de aprobación del Product Owner.

## Problema
Hoy el cliente ve los productos en la web, pero tiene que coordinar cada uno por WhatsApp a mano. Eso hace lento el pedido para la clienta y para quien atiende.

## Objetivo
Que el cliente junte productos en un carrito y envíe un único pedido por WhatsApp, con el detalle y el total.

## Fuera de alcance
- Pagos online, checkout, stock, usuarios o cuentas.
- Base de datos o backend: todo vive en el navegador (`localStorage`).
- Combos de lunch (catering por cantidad de unidades). Van en una spec aparte: cambian las reglas de precio y cantidades.
- Cambios al esquema de Decap CMS.

## Decisiones pendientes (responder antes de implementar)
1. **Productos sin precio.** El campo `price` es opcional en el schema. Propuesta: se pueden agregar, aparecen como "a consultar" en el mensaje y no suman al total.
2. **Dónde va el botón "Agregar".** Propuesta: en la página individual del producto y en las cards del catálogo.
3. **Cantidad máxima por producto.** Propuesta: 20, para evitar errores de tipeo.

## Criterios de aceptación
- [ ] Desde la página de un producto se puede agregar al carrito.
- [ ] Un producto con `disponible: false` no se puede agregar: el botón queda deshabilitado y lo explica.
- [ ] Hay un botón flotante con la cantidad de ítems, visible en todas las páginas.
- [ ] Se puede cambiar la cantidad de cada ítem y quitarlo.
- [ ] El carrito sobrevive a recargar la página y a cerrar la pestaña.
- [ ] Con el carrito vacío no se puede enviar el pedido.
- [ ] "Enviar pedido" abre WhatsApp con un mensaje con una línea por ítem, cantidad, precio y total.
- [ ] Un precio con formato inesperado no rompe nada: el ítem se muestra "a consultar".
- [ ] Si un producto del carrito ya no existe en el catálogo, se descarta sin errores.
- [ ] Si `localStorage` no está disponible (modo privado, bloqueado), el carrito funciona en memoria sin romper la página.
- [ ] `pnpm run build` y `pnpm exec astro check` pasan.

## Ejemplo de mensaje
```
*Pedido de Cocina LoLa*
- 2x Torta de chocolate ($18.000 c/u)
- 1x Alfajor de maicena (a consultar)

*Total estimado: $36.000*
```
El mensaje sale por `buildWaLink` de `src/lib/whatsapp.ts`, que ya codifica el texto.

## Arquitectura (archivos)
Respeta la separación de AGENTS.md: la lógica en `src/lib/`, la UI en Svelte.

**Crear:**
- `src/lib/carrito.ts`: funciones puras (agregar, quitar, cambiar cantidad, total, armar mensaje). Usa `cleanPrice` de `price.ts` para leer precios.
- `src/lib/carrito.svelte.ts`: estado reactivo con `$state` y persistencia en `localStorage` (con `try/catch`). Va con extensión `.svelte.ts` porque usa runas fuera de un componente.
- `src/components/CarritoFlotante.svelte`: botón flotante y panel del carrito.
- `src/components/BotonAgregar.svelte`: botón para usar dentro de páginas y cards Astro.

**Modificar:**
- `src/layouts/Layout.astro`: montar `CarritoFlotante` (hidratación `client:idle`).
- `src/pages/productos/[category]/[slug].astro` y `src/components/ProductCard.astro`: incluir `BotonAgregar`.

**Pasar por props** al botón: id, nombre, precio y `disponible`. No leer el contenido desde Svelte.

## Tests
`src/lib/carrito.ts` es lógica pura: si el proyecto suma un runner (Vitest), cubrir agregar duplicado, cantidad cero o negativa, precio inválido, carrito vacío y mensaje con ítems sin precio.

## Cómo verificar
1. `pnpm dev`, abrir en 375px.
2. Recorrer cada criterio a mano, incluido recargar y probar en ventana privada.
3. Confirmar que el mensaje llega a WhatsApp con el formato del ejemplo.
