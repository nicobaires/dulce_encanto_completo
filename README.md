# Cocina LoLa — Pastelería Artesanal [web](https://cocina-lola.netlify.app/)

Landing page y catálogo interactivo para pastelería artesanal con navegación por categorías, integración directa con WhatsApp y CMS para autogestión de contenido sin costos de infraestructura. Construida con [Astro 5](https://astro.build) + [Svelte 5](https://svelte.dev) + [Tailwind CSS 3](https://tailwindcss.com).

[![CI](https://github.com/nicobaires/dulce_encanto_completo/actions/workflows/ci.yml/badge.svg)](https://github.com/nicobaires/dulce_encanto_completo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Características

- **Catálogo de productos híbrido**:
  - Catálogo completo en `/productos` con vista optimizada para móviles (Spec 001): en pantallas chicas (<768px) lista primero las categorías con selección rápida táctil y retorno claro. En desktop mantiene la vista completa agrupada.
  - Páginas dinámicas por categoría (`/productos/[slug]`).
  - Fichas individuales por producto (`/productos/[categoria]/[slug]`).
- **Carrusel de categorías en la Home ([`CategoriasCarrusel.svelte`](file:///home/nicobaires/Proyectos/CocinaLola/src/components/CategoriasCarrusel.svelte))**:
  - En celular: *Peek effect* (asomo de la siguiente tarjeta) y swipe táctil nativo centrado con `snap-x`.
  - En desktop: fila horizontal uniforme con flechas de navegación circulares `<` y `>` y puntos indicadores (*dots*). Nunca deja tarjetas huérfanas al crecer el catálogo.
- **Productos destacados en carrusel ([`Destacados.svelte`](file:///home/nicobaires/Proyectos/CocinaLola/src/components/Destacados.svelte))**: carrusel interactivo con soporte de accesibilidad (pausa si la pestaña está oculta o si el usuario prefiere movimiento reducido).
- **Galería interactiva de producto ([`GaleriaProducto.svelte`](file:///home/nicobaires/Proyectos/CocinaLola/src/components/GaleriaProducto.svelte))**: isla reactiva en Svelte 5 con selección fluida de fotos y accesibilidad.
- **Testimonios en carrusel ([`Testimonios.svelte`](file:///home/nicobaires/Proyectos/CocinaLola/src/components/Testimonios.svelte))**: datos tipados desacoplados en `src/data/testimonials.ts` con transiciones suaves.
- **Formulario de contacto reactivo ([`Contacto.svelte`](file:///home/nicobaires/Proyectos/CocinaLola/src/components/Contacto.svelte))**: validación reactiva en vivo, atributos A11y (`aria-label`) y derivación directa a WhatsApp con formato y codificación segura.
- **Lógica de negocio centralizada en `src/lib/`**: funciones puras de formateo de precios (`formatPrice`, `cleanPrice`) y generador de enlaces de WhatsApp (`buildWaLink`).
- **Contenido autogestionable con Decap CMS**: panel visual en `/admin/` sobre archivos locales YAML (arquitectura Git-based, $0 infra).
- **SEO & Schema markup**: `LocalBusiness` en home, `BreadcrumbList` + `ItemList` en categorías y `Product` con ofertas en fichas individuales.
- **Imágenes optimizadas**: 100% procesadas vía `astro:assets` con motor Sharp en formato WebP responsivo (`widths`/`sizes`).
- **Modo oscuro persistente**: soporte con clase `dark` en `<html>`, selector en la barra de navegación y persistencia en `localStorage`.
- **Accesibilidad y rendimiento**: jerarquía semántica con `<h1>` garantizado por página, fuentes Google con `preload` y sitemap automático vía `@astrojs/sitemap`.

---

## Estructura del Proyecto

```
├── .agents/agents/          # Directivas de subagentes especializados (astro, svelte, logica)
├── specs/                   # Especificaciones funcionales y criterios de aceptación (SDD)
├── skills/                  # Guías de patrones de referencia y sintaxis
├── memory.md                # Memoria viva del proyecto (estado, arquitectura, backlog)
├── AGENTS.md                # Manual de ingeniería y directivas para desarrollo con IA
├── tasks.md                 # Checklist de tareas activas
├── tsconfig.json            # Configuración estricta de TypeScript (astro/tsconfigs/strict)
├── public/
│   ├── config.yml           # Configuración de Decap CMS
│   ├── robots.txt           # Reglas para motores de búsqueda (bloquea /admin/)
│   ├── img/img_hero.webp    # Imagen base para Open Graph y Twitter Cards
│   └── scripts/main.js      # Intersection Observer para animaciones fade-in
├── src/
│   ├── assets/images/       # Imágenes del catálogo procesadas por Astro y Sharp
│   ├── components/
│   │   ├── Nav.svelte             # Barra de navegación, modo oscuro y scrollspy (Svelte 5)
│   │   ├── Hero.astro             # Portada de inicio con imagen hero optimizada
│   │   ├── Productos.astro        # Sección de clásicos que monta CategoriasCarrusel
│   │   ├── CategoriasCarrusel.svelte # Carrusel de categorías (swipe móvil + flechas desktop)
│   │   ├── CatalogoMobile.svelte  # Catálogo móvil con categorías primero (Spec 001)
│   │   ├── Destacados.svelte      # Carrusel de productos destacados (Svelte 5)
│   │   ├── ProductCard.astro      # Tarjeta reutilizable de producto
│   │   ├── GaleriaProducto.svelte # Galería interactiva con miniaturas (Svelte 5)
│   │   ├── SobreMi.astro          # Sección "Sobre mí" con enlace suave
│   │   ├── Pedidos.astro          # Guía de compra en 3 pasos con WhatsApp
│   │   ├── Beneficios.astro       # Tarjetas de propuesta de valor
│   │   ├── Testimonios.svelte     # Carrusel de testimonios (Svelte 5)
│   │   ├── Contacto.svelte        # Formulario de contacto reactivo (Svelte 5)
│   │   └── Footer.astro           # Pie de página con enlaces y redes sociales
│   ├── content/
│   │   ├── config.ts              # Schemas de Content Collections con validación Zod
│   │   ├── category/              # Archivos YAML de categorías
│   │   └── product/               # Archivos YAML de productos
│   ├── data/
│   │   ├── siteInfo.ts            # Datos centralizados de la pastelería (contacto, marca)
│   │   └── testimonials.ts        # Datos tipados de testimonios de clientes
│   ├── lib/
│   │   ├── price.ts               # Helpers puros formatPrice y cleanPrice
│   │   └── whatsapp.ts            # Generador y sanitizador puro de enlaces WhatsApp
│   ├── layouts/
│   │   └── Layout.astro           # Layout maestro (HTML, head, metas, fuentes, CDN FA6)
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── index.astro        # Panel administrativo de Decap CMS
│   │   │   └── config.yml.ts      # Endpoint GET que sirve public/config.yml
│   │   ├── productos/
│   │   │   ├── index.astro        # Catálogo general (/productos)
│   │   │   ├── [slug].astro       # Página de categoría (/productos/[categoria])
│   │   │   └── [category]/[slug].astro # Ficha individual de producto
│   │   ├── 404.astro              # Página de error 404 personalizada
│   │   └── index.astro            # Página principal de inicio
│   └── styles/
│       └── globals.css            # Tailwind base, utilidades de scroll y fix de Netlify CMS
├── astro.config.mjs
├── svelte.config.js
├── tailwind.config.cjs
└── package.json
```

---

## Comandos y Scripts

| Comando | Descripción |
|---|---|
| `pnpm run dev` | Inicia el servidor de desarrollo local de Astro |
| `pnpm run dev:cms` | Inicia desarrollo con proxy local de Decap CMS (`decap-server`) |
| `pnpm run build` | Compila el sitio estático para producción en `dist/` |
| `pnpm run preview` | Previsualiza localmente el build generado en `dist/` |
| `pnpm exec astro check` | Valida tipos y diagnóstico de componentes Astro y Svelte |
| `pnpm exec tsc --noEmit` | Chequea el tipado estricto de TypeScript en todo el proyecto |

---

## Gestión de Contenido con Decap CMS

1. **Modo Local**:
   - Ejecutá `pnpm run dev:cms`.
   - Ingresá a `http://localhost:4321/admin/`.
   - Podés crear, modificar y eliminar categorías o productos visualmente.
2. **Imágenes**:
   - Las imágenes subidas por el panel se guardan en `src/assets/images/` y se almacenan automáticamente como rutas relativas `../../assets/images/archivo.webp`.
3. **Producción**:
   - El backend utiliza `git-gateway` conectado a Netlify Identity y GitHub.

---

## Tecnologías Principales

- **[Astro 5](https://astro.build)** — Renderizado estático de alto rendimiento y Content Collections.
- **[Svelte 5](https://svelte.dev)** — Islas de interactividad construidas exclusivamente con **Runas** (`$state`, `$derived`, `$effect`, `$props`).
- **[Tailwind CSS 3](https://tailwindcss.com)** — Diseño responsivo y paleta personalizada de colores.
- **[Font Awesome 6.4](https://fontawesome.com)** — Iconografía completa vía CDN oficial.
- **[Sharp](https://sharp.pixelplumbing.com)** — Procesamiento y conversión automática a WebP.
- **[TypeScript](https://www.typescriptlang.org)** — Tipado estricto y seguro.
- **[pnpm](https://pnpm.io)** — Gestión de dependencias rápida y determinista.

---

## Metodología Spec-Driven Development (SDD)

El repositorio está organizado para el trabajo colaborativo con asistentes de código basados en IA:
* **[`AGENTS.md`](file:///home/nicobaires/Proyectos/CocinaLola/AGENTS.md)**: Manual del proyecto, estándares arquitectónicos y directivas obligatorias.
* **[`.agents/agents/`](file:///home/nicobaires/Proyectos/CocinaLola/.agents/agents/)**: Reglas especializadas por dominio (`astro.md`, `svelte.md`, `logica.md`).
* **[`specs/`](file:///home/nicobaires/Proyectos/CocinaLola/specs/)**: Especificaciones funcionales con criterios de aceptación previos a la implementación.
* **[`memory.md`](file:///home/nicobaires/Proyectos/CocinaLola/memory.md)**: Memoria técnica viva con el estado del sistema, decisiones de arquitectura y backlog.