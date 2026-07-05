# Dulce Encanto — Pastelería Artesanal

Landing page para pastelería artesanal con integración de WhatsApp, construida con [Astro](https://astro.build) + Tailwind CSS.

## Características

- Imágenes optimizadas con `<Image />` de `astro:assets` (WebP automático, responsive)
- View Transitions (navegación tipo SPA sin recarga)
- Lightbox en cards de productos
- Menú hamburguesa responsive
- Botón flotante de WhatsApp con rebote
- Sitemap generado automáticamente
- Meta tags OG para redes sociales

## Estructura

```
├── public/
│   ├── img/img_hero.webp       # Imagen para OG meta (ruta fija)
│   └── scripts/main.js         # Lógica client-side
├── src/
│   ├── assets/images/          # Imágenes originales (procesadas por Astro)
│   ├── components/
│   │   ├── Nav.astro           # Navegación con menú hamburguesa
│   │   ├── Hero.astro          # Hero con imagen destacada
│   │   ├── Productos.astro     # Catálogo de productos
│   │   ├── SobreMi.astro       # Sección "Sobre mí"
│   │   ├── Pedidos.astro       # Cómo pedir (3 pasos)
│   │   ├── Beneficios.astro    # Tarjetas de beneficios
│   │   └── Footer.astro        # Footer con año dinámico
│   ├── data/
│   │   └── productos.js        # Datos de productos con imports de imágenes
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal (head, metas, fonts, WhatsApp flotante, lightbox)
│   ├── pages/
│   │   └── index.astro         # Página principal
│   └── styles/
│       └── globals.css         # Tailwind + estilos personalizados
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Inicia servidor de desarrollo |
| `pnpm run build` | Compila el sitio para producción en `dist/` |
| `pnpm run preview` | Previsualiza el build de producción |

## Requisitos

- Node.js 18+
- pnpm
