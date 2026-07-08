# Dulce Encanto — Pastelería Artesanal

Landing page para pastelería artesanal con catálogo de productos por categoría, integración de WhatsApp y CMS para gestión de contenido. Construida con [Astro](https://astro.build) + [Svelte 5](https://svelte.dev) + Tailwind CSS.

## Características

- Catálogo de productos organizado por categorías con páginas dinámicas (`/productos/[slug]`)
- Páginas individuales por producto (`/productos/[categoria]/[slug]`)
- Productos destacados en la homepage (`destacado: true`)
- Galería múltiple de imágenes por producto
- Sección de testimonios en carrusel animado (Svelte 5)
- Formulario de contacto reactivo con validación en vivo y envío por WhatsApp (Svelte 5)
- Contenido gestionable desde **Decap CMS** (admin visual en `/admin/`) o editando archivos YAML directamente
- Schema markup JSON-LD: LocalBusiness (homepage), BreadcrumbList + Product ItemList (categorías), Product individual
- Imágenes optimizadas con `<Image />` de `astro:assets` (WebP automático, responsive)
- View Transitions (navegación tipo SPA sin recarga) con dark mode persistente gracias a `astro:before-swap`
- Animaciones fade-in con Intersection Observer, stagger entre elementos y direcciones (up, left, right)
- Menú hamburguesa responsive + modo oscuro con toggle gestionados desde Svelte 5 (con persistencia en localStorage)
- Botón flotante de WhatsApp con rebote
- Footer color chocolate (#3b302d)
- Página 404 personalizada
- Sitemap generado automáticamente con `@astrojs/sitemap`
- Meta tags OG para redes sociales
- Componentes interactivos con **Svelte 5** (reactividad con `$state`, `$derived`, transiciones con `fade`, `{#key}` para animaciones, formularios con validación reactiva)
- Navegación con scrollspy activo y smooth scroll manejados desde Svelte

## Estructura

```
├── public/
│   ├── config.yml                # Configuración de Decap CMS
│   └── scripts/main.js           # Lógica client-side (lightbox, fade-in, botones WhatsApp)
├── src/
│   ├── assets/images/            # Imágenes originales (procesadas por Astro)
│   ├── components/
│   │   ├── Nav.svelte            # Navegación con menú, dark mode, scrollspy (Svelte 5)
│   │   ├── Hero.astro            # Hero con imagen destacada
│   │   ├── Productos.astro       # Grilla de categorías en homepage
│   │   ├── Destacados.astro      # Productos destacados (destacado: true)
│   │   ├── ProductCard.astro     # Card de producto reutilizable (link a página individual)
│   │   ├── SobreMi.astro         # Sección "Sobre mí"
│   │   ├── Pedidos.astro         # Cómo pedir (3 pasos)
│   │   ├── Beneficios.astro      # Tarjetas de beneficios
│   │   ├── Testimonios.svelte    # Carrusel de testimonios con transiciones (Svelte 5)
│   │   ├── Contacto.svelte       # Formulario reactivo con validación + WhatsApp (Svelte 5)
│   │   └── Footer.astro          # Footer color chocolate
│   ├── content/
│   │   ├── config.ts             # Schemas de Content Collections (category, product)
│   │   ├── category/             # Archivos YAML de categorías
│   │   └── product/              # Archivos YAML de productos
│   ├── layouts/
│   │   └── Layout.astro          # Layout principal (head, metas, fonts, WhatsApp, lightbox, schema)
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── index.astro       # Entry point de Decap CMS
│   │   │   └── config.yml.ts     # Endpoint GET que sirve public/config.yml
│   │   ├── productos/
│   │   │   ├── [category]/
│   │   │   │   └── [slug].astro  # Página individual de producto (con galería)
│   │   │   └── [slug].astro      # Página dinámica por categoría
│   │   ├── 404.astro             # Página no encontrada
│   │   └── index.astro           # Página principal
│   └── styles/
│       └── globals.css           # Tailwind + estilos personalizados (fade-in, fade-in-left, fade-in-right)
├── astro.config.mjs
├── svelte.config.js               # Preprocesador Vite para Svelte
├── tailwind.config.cjs           # darkMode: 'class', paleta rose custom
└── package.json
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Inicia servidor de desarrollo |
| `pnpm run dev:cms` | Inicia servidor de desarrollo + decap-server |
| `pnpm run build` | Compila el sitio para producción en `dist/` |
| `pnpm run preview` | Previsualiza el build de producción |

## CMS Local

1. Ejecutá `pnpm run dev:cms`
2. Accedé a `http://localhost:4321/admin/`
3. Las colecciones **Categorías** y **Productos** se gestionan desde la UI
4. Las imágenes subidas se guardan en `src/assets/images/` y la ruta se almacena como `../../assets/images/archivo.webp` en los YAML

> **Importante:** Las colecciones usan `extension: yaml` para coincidir con la extensión `.yaml` de los archivos. Por defecto Decap CMS espera `.yml`.

> **Importante:** El `public_folder` está configurado como `../../assets/images` para que las rutas sean compatibles con `astro:assets`. No usar `/img/`.

Para producción, cambiar `backend.name` de `proxy` a `git-gateway` en `public/config.yml`.

## Productos destacados

Para marcar un producto como destacado en la homepage, editá el YAML y poné `destacado: true`, o desde el CMS activá el checkbox "Destacado".

## Galería de imágenes

Cada producto puede tener múltiples imágenes. Desde el CMS, después de seleccionar la imagen principal, usá el campo **Galería** para agregar más fotos. En la página del producto se muestran como miniaturas clickeables.

## Modo oscuro

Usá el ícono de luna/sol en la navegación para alternar entre modo claro y oscuro. La preferencia se guarda automáticamente en localStorage. La clase `dark` se aplica al `<html>` desde un script inline en el Layout para evitar el flash blanco durante ViewTransitions, y el toggle en `Nav.svelte` sincroniza el estado con `$state`.

## Tecnologías

- **Astro 5** — Framework de contenido estático
- **Svelte 5** — Componentes reactivos interactivos (`$state`, `$derived`, etc.)
- **@astrojs/svelte 7** — Integración oficial de Svelte para Astro
- **Tailwind CSS 3** — Estilos utilitarios con `darkMode: 'class'`
- **Decap CMS 3** — CMS visual (ex Netlify CMS)
- **TypeScript** — Tipado estricto
- **pnpm** — Gestor de paquetes

## Requisitos

- Node.js 18+
- pnpm
