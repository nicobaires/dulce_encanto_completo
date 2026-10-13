# Guía Astro — CocinaLola

> Complementa a [AGENTS.md](../../AGENTS.md), que prevalece en caso de conflicto. Leer al tocar páginas, layouts, colecciones, imágenes o SEO.

## Alcance
Rutas, layouts, composición de páginas, Content Collections, optimización de imágenes (`astro:assets`), SEO y metadatos.

## Dónde vive cada cosa
| Qué | Dónde |
|-----|-------|
| Schemas de colecciones (`category`, `product`) | `src/content/config.ts` |
| Contenido (YAML) | `src/content/category/`, `src/content/product/` |
| Marca, URL y datos de contacto | `src/data/siteInfo.ts` |
| Head, metas, fuentes, JSON-LD, botón de WhatsApp | `src/layouts/Layout.astro` |
| Rutas del catálogo | `src/pages/productos/index.astro` (listado completo), `[slug].astro` (categoría), `[category]/[slug].astro` (producto) |
| Config del CMS | `public/config.yml`, servida por `src/pages/admin/config.yml.ts` |

Los datos fluyen de las colecciones (`getCollection`) o de `siteInfo.ts` hacia los componentes. No duplicar datos de marca o contacto en componentes.

## Gotchas del CMS (no romper)
- Las colecciones de Decap usan `extension: yaml`. Por defecto Decap espera `.yml`.
- `public_folder` es `../../assets/images`, para que las rutas funcionen con `astro:assets`. No usar `/img/`.
- Las imágenes subidas se guardan en `src/assets/images/` y se referencian como `../../assets/images/archivo.webp`.
- Cambiar un schema en `config.ts` exige cambiar `public/config.yml` en el mismo commit, y avisar al Product Owner (ver AGENTS.md).

## Reglas
- **Salida estática.** Sin SSR ni adaptadores salvo que se pida.
- **Una responsabilidad por página**, consistente con su layout.
- **Interactividad con estado de cliente** → componente Svelte, no scripts sueltos en la página.
- **Lógica de negocio** (cálculos, armado de mensajes, transformaciones de datos) → `src/lib/`, no en layouts ni páginas. Ver `logica.md`.
- **Problemas de render, SEO o rutas** → resolverlos en Astro antes que en el cliente.
- **Identidad visual:** paleta `rose` de Tailwind, secciones con fondos rosa y blanco intercalados, footer `#3b302d`. No introducir otra paleta.

## Antes de entregar
1. `pnpm run build` pasa sin errores.
2. Sin enlaces ni imágenes rotas en las rutas tocadas.
3. Si cambió una ruta o un schema: README y `memory.md` actualizados.