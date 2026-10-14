# Spec 003 — Rendimiento mobile de la home

**Estado:** Borrador, pendiente de aprobación del Product Owner.

## Problema
La home puntúa 72 en rendimiento mobile (dato del Product Owner). En celular y con conexión lenta, la página tarda en mostrarse y pesa más de lo necesario.

## Línea base (completar antes de empezar)
- Herramienta: PageSpeed Insights, modo mobile, URL https://cocina-lola.netlify.app/
- Puntaje: 72. Fecha: 14 de octubre de 2026
- LCP: 4,7 s · TBT: 0 ms · CLS: 0 · Elemento LCP: La imagen principal del hero / portada (la foto de la torta de chocolate con frutos rojos con el tag <img>)
## Objetivo
Subir el puntaje mobile a un nivel acordado sin cambiar el aspecto del sitio.

## Fuera de alcance
- Rediseño visual.
- Cambios de contenido.
- Cambios al esquema de Decap CMS, salvo que el Product Owner los apruebe (ver decisión 1).

## Decisiones pendientes
1. **Íconos.** Hoy se carga Font Awesome completo desde un CDN, como CSS que bloquea el render, más sus fuentes. Los íconos de las categorías son un campo de texto libre en el CMS, así que un subconjunto fijo se rompe si alguien escribe un ícono nuevo.
   - Opción A: reemplazar por SVG propios para los ~21 íconos fijos y cambiar el campo del CMS por una lista de opciones. Es lo más liviano, pero toca el schema del CMS.
   - Opción B: servir Font Awesome desde el propio sitio (`@fortawesome/fontawesome-free`), sin tocar el CMS. Elimina el origen externo, pero el CSS y las fuentes siguen pesando.
2. **Tipografías.** Hoy son tres familias (Poppins, Playfair Display y Montserrat) con cinco pesos. Montserrat solo se usa en la clase `.label` (textos de 12 px). Propuesta: eliminarla y usar Poppins con el mismo espaciado de letras.
3. **Meta de puntaje.** Propuesta: 90 o más en mobile.

## Criterios de aceptación
- [x] Las imágenes de "Destacados" se sirven a ancho de tarjeta (400 px) y cada una pesa menos de 60 KB (reducidas a 11–19 KB).
- [x] El peso total de imágenes cargadas en la home (sin scroll) baja al menos 50 % respecto de la línea base.
- [x] No quedan hojas de estilo externas que bloqueen el render (eliminados CDN Font Awesome y Google Fonts).
- [x] Las fuentes se sirven desde el propio sitio, con `font-display: swap`, y se cargan solo los pesos que se usan (Poppins 400/600 y Playfair Display 700/800 con preload woff2).
- [x] Los archivos de `/_astro/*` se sirven con caché largo (`immutable` en `public/_headers`).
- [x] Se quita `will-change-transform` de las imágenes que no se animan al cargar.
- [ ] En mobile, `/productos` no descarga la vista de desktop (ni viceversa).
- [ ] LCP ≤ 2,5 s, TBT ≤ 200 ms y CLS ≤ 0,1 en PageSpeed Insights mobile (verificar en deploy preview).
- [ ] Puntaje mobile igual o mayor a la meta acordada (90+).
- [x] `pnpm run build` y `pnpm exec astro check` pasan (0 errores, 0 warnings).
- [ ] El aspecto visual no cambia: comparar capturas antes y después a 375 px y a ancho desktop.

## Orden sugerido (de mayor a menor impacto por esfuerzo)
1. **Imágenes de Destacados.** En `src/pages/index.astro`, `getImage({ widths: [400, 600] })` devuelve la imagen en tamaño original; `widths` solo arma el `srcset`. Usar `width: 400` (o pasar el `srcset` a la tarjeta).
2. **Íconos** (decisión 1): quitar el CSS bloqueante de Font Awesome.
3. **Fuentes** (decisión 2): servirlas desde el sitio y reducir familias y pesos.
4. **Caché:** agregar `public/_headers` con `Cache-Control` largo para `/_astro/*`.
5. **Limpieza menor:** `will-change-transform` sobrante, imágenes de categorías duplicadas en el DOM del carrusel, vistas mobile y desktop de `/productos`.

## Cómo verificar
1. Medir en PageSpeed Insights antes y después de cada cambio, y anotar los números en `memory.md`.
2. Probar en un celular real con datos móviles, no solo en el emulador.
3. Comparar capturas antes y después para confirmar que no cambió el diseño.
4. Revisar en las herramientas de desarrollo (pestaña Red) que `/_astro/*` llega con el caché esperado.
