# Tasks

## Spec 001 — Catálogo mobile (`specs/spec.md`)
- [x] Revisar cómo el catálogo agrupa productos por categoría
- [x] Implementar vista de categorías en mobile (`CatalogoMobile.svelte`)
- [x] Filtrado al tocar una categoría + botón volver
- [x] Actualizar `memory.md`
- [ ] Verificar el criterio de los 50 productos (hoy hay 13; duplicar de prueba y medir)

## Spec 002 — Carrito local (`specs/carrito.md`)
- [ ] 0. El Product Owner responde las 3 decisiones pendientes y aprueba la spec
- [ ] 1. Escribir `specs/plan-carrito.md` con el enfoque
- [ ] 2. `src/lib/carrito.ts`: funciones puras
- [ ] 3. `src/lib/carrito.svelte.ts`: estado y persistencia
- [ ] 4. `BotonAgregar.svelte` y su integración en producto y cards
- [ ] 5. `CarritoFlotante.svelte` y montaje en `Layout.astro`
- [ ] 6. Verificar criterios de aceptación y `pnpm run build`
- [ ] 7. Actualizar `memory.md`

## Spec 003 — Rendimiento mobile de la home (`specs/rendimiento-mobile.md`)
- [x] Línea base medida y registrada en la spec (PSI Mobile: 72, LCP 4,7s)
- [x] Paso 1: Optimización de imágenes del carrusel Destacados (<60 KB)
- [x] Paso 2: Eliminación de Font Awesome CDN, iconos SVG locales (`Icon.astro`/`Icon.svelte`) y select en CMS
- [x] Paso 3: Fuentes autoalojadas Poppins y Playfair Display (`@fontsource`), preload woff2, purga de Montserrat
- [x] Paso 4: Headers de caché inmutable para `/_astro/*` en `public/_headers`
- [x] Paso 5: Remoción de `will-change-transform` para liberar GPU en móviles
- [x] Build verificado con `pnpm run build`, `astro check` y `tsc --noEmit`
- [x] Documentación actualizada en `memory.md` y `specs/rendimiento-mobile.md`

## Producción (pendientes sueltos)
- [ ] Cargar el número de WhatsApp real en `src/data/siteInfo.ts`
- [ ] Dominio propio
- [ ] Netlify Forms como respaldo del formulario
- [ ] Rendimiento en celular (`/productos` renderiza las dos vistas)
