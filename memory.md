# 🧠 MEMORIA DEL PROYECTO: Cocina Lola

> Mantener corto y conciso. Podar lo que ya no aplique al final de cada sesión o hito.

## 1. Estado Actual del Sistema
- **Despliegue & Auth:** Sitio en producción en Netlify; login de Netlify Identity / Git Gateway funcionando para el CMS en `/admin/`.
- **Contenido del Catálogo:** Contenido y fotos de prueba. Categoría "Pan" ya agregada. Content Collections configuradas en `src/content/config.ts` para Categorías y Productos usando archivos `.yaml`.
- **Navegación & UI:** `Nav.svelte` responsivo con menú hamburguesa, modo oscuro persistente en `localStorage` y scrollspy activo.
- **Estructura Base:** `Layout.astro` configurado con fuentes autoalojadas (`@fontsource/poppins`, `@fontsource/playfair-display`), preload woff2 crítico y meta tags Open Graph. Cero peticiones bloqueantes externas.

## 2. Decisiones Arquitectónicas y de Negocio
- **Prioridad de Entrega:** No sobre-pulir el frontend indefinidamente; hay usuarias reales esperando el sitio funcional.
- **Flujo de Conversión / Pedidos:** El formulario arma el mensaje y abre WhatsApp directamente (Netlify Forms como respaldo). Centralizado en `src/lib/whatsapp.ts`.
- **Lógica de Dominio y Precios:** Centralizada en funciones puras en `src/lib/price.ts` (`formatPrice`, `cleanPrice`), sin duplicación en componentes.
- **Alcance de Rubros:** Expansión prevista hacia panificados, prepizzas, pastas caseras y lunch/viandas ("Lunch" = catering para eventos con combos por cantidad de unidades, no menú semanal).
- **Servidor de Contenidos ($0 Infra):** Arquitectura Git-based (Decap CMS) sobre archivos locales YAML para mantener el proyecto 100% serverless y sin costos fijos.
- **Optimización de Imágenes:** Prohibido el uso de `<img>` HTML plano. Todas las imágenes del catálogo se procesan obligatoriamente mediante `<Image />` de `astro:assets` con motor Sharp en formato WebP responsivo. En `Destacados.svelte`, las imágenes se procesan con `getImage({ width: 400, format: 'webp', quality: 75 })` reduciendo el peso de ~200 KB a ~15 KB.
- **Iconografía SVG Propia:** Eliminado por completo el CDN de Font Awesome y Google Fonts de `Layout.astro`. Creado mapa de paths SVG vectoriales en `src/lib/icons.ts` y componentes `Icon.astro` e `Icon.svelte`. En Decap CMS (`public/config.yml`), el campo `icon` de categoría pasó a ser un widget `select` con opciones controladas para asegurar compatibilidad total con el mapa SVG.
- **Caché Inmutable:** Configurado `public/_headers` con `Cache-Control: public, max-age=31536000, immutable` para todos los assets estáticos con hash bajo `/_astro/*`.
- **Tipografía Autoalojada:** Eliminada la fuente Montserrat (reemplazada por Poppins 600 con espaciado en `.label`). Poppins (400, 600) y Playfair Display (700, 800) autoalojadas localmente con `@fontsource` y preload de los woff2 necesarios.
- **Estrategia de Hidratación:** `Nav.svelte` se hidrata de forma uniforme con `client:idle` en todas las páginas para no penalizar el render de primer plano.
- **Desacoplamiento de Datos:** Testimonios extraídos a módulo estructurado `src/data/testimonials.ts`.
- **Carrusel de Categorías en Home:** `CategoriasCarrusel.svelte` en `src/components/` (Svelte 5). Resuelve definitivamente el `.slice(0, 5)` de `Productos.astro`: en mobile aplica swipe táctil con efecto asomo (*peek effect*) y snap; en desktop mantiene 4-5 tarjetas fijas y flechas de navegación circulares para ver el resto, evitando tarjetas huérfanas o desbordes al crecer el catálogo.
- **Accesibilidad & SEO:** H1 garantizado en páginas de categorías, `aria-label` en inputs de `Contacto.svelte`, y badges informativos para productos no disponibles.

## 3. Base de Conocimiento Acumulada (Gotchas & Hacks)
- **Netlify Identity vs View Transitions:** Las View Transitions de Astro se desactivaron temporalmente porque generaban un conflicto de doble iframe con el widget de Netlify Identity. Listener `astro:before-swap` purgado.
- **Reset de Estilos en CMS:** Se aplicó `all: revert` en `globals.css` para evitar que las clases utilitarias de Tailwind CSS rompan la interfaz visual del CMS en `/admin/`.
- **Rutas de Imágenes en CMS:** Parámetro `public_folder` en `config.yml` configurado relativo a `../../assets/images` para compatibilidad nativa con el procesador de Astro (no usar rutas absolutas tipo `/img/`).

- **Catálogo Mobile (Spec 001):** Componente reactivo `CatalogoMobile.svelte` en `src/components/` con Svelte 5 (`$state`). En pantallas <768px muestra categorías primero con navegación fluida y regreso claro; desktop se mantiene intacto.

## 4. Próximos Pasos (Backlog Prioritario)
1. [x] **Catálogo mobile (Spec 001):** Categorías primero en móviles implementado con éxito.
2. [x] **Optimización de rendimiento mobile (Spec 003):** Imágenes Destacados a WebP liviano, fuentes autoalojadas con preload woff2, iconos SVG propios en sustitución del CDN Font Awesome, headers de caché y remoción de `will-change`.
3. [ ] **Carrito de compras local:** Carrito persistente con resumen consolidado para WhatsApp (ver `specs/carrito.md`).
4. [ ] **Configuración final de producción:** Dominio propio, datos de contacto reales y Netlify Forms de respaldo.
5. [ ] **Banner de Promociones:** Componente reactivo opcional en la Homepage.

## 5. Subagentes Especializados
- **Carpeta creada:** `.agents/agents/` con reglas para subagentes `svelte`, `astro` y `logica`.
- **Propósito:** separar responsabilidades para interfaz, arquitectura y lógica de negocio sin mezclar capas.
- **Estándar aplicado:** `Svelte 5` con runas, `Astro 5` con content collections y `Image`, y lógica pura fuera de la capa visual.
