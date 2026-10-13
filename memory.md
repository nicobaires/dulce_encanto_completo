# 🧠 MEMORIA DEL PROYECTO: Cocina Lola

> Mantener corto y conciso. Podar lo que ya no aplique al final de cada sesión o hito.

## 1. Estado Actual del Sistema
- **Despliegue & Auth:** Sitio en producción en Netlify; login de Netlify Identity / Git Gateway funcionando para el CMS en `/admin/`.
- **Contenido del Catálogo:** Contenido y fotos de prueba. Categoría "Pan" ya agregada. Content Collections configuradas en `src/content/config.ts` para Categorías y Productos usando archivos `.yaml`.
- **Navegación & UI:** `Nav.svelte` responsivo con menú hamburguesa, modo oscuro persistente en `localStorage` y scrollspy activo.
- **Estructura Base:** `Layout.astro` configurado con fuentes optimizadas (preload) y meta tags Open Graph.

## 2. Decisiones Arquitectónicas y de Negocio
- **Prioridad de Entrega:** No sobre-pulir el frontend indefinidamente; hay usuarias reales esperando el sitio funcional.
- **Flujo de Conversión / Pedidos:** El formulario arma el mensaje y abre WhatsApp directamente (Netlify Forms como respaldo).
- **Alcance de Rubros:** Expansión prevista hacia panificados, prepizzas, pastas caseras y lunch/viandas ("Lunch" = catering para eventos con combos por cantidad de unidades, no menú semanal).
- **Servidor de Contenidos ($0 Infra):** Arquitectura Git-based (Decap CMS) sobre archivos locales YAML para mantener el proyecto 100% serverless y sin costos fijos.
- **Optimización de Imágenes:** Prohibido el uso de `<img>` HTML plano. Todas las imágenes del catálogo se procesan obligatoriamente mediante `<Image />` de `astro:assets` con motor Sharp en formato WebP responsivo.
- **Reactividad Aislada (Svelte 5):** Carruseles (destacados y testimonios) y formulario de contacto aislados en componentes `.svelte` independientes usando exclusivamente Runas de Svelte 5 (`$state`, `$derived`, `$effect`).

## 3. Base de Conocimiento Acumulada (Gotchas & Hacks)
- **Netlify Identity vs View Transitions:** Las View Transitions de Astro se desactivaron temporalmente porque generaban un conflicto de doble iframe con el widget de Netlify Identity.
- **Reset de Estilos en CMS:** Se aplicó `all: revert` en `globals.css` para evitar que las clases utilitarias de Tailwind CSS rompan la interfaz visual del CMS en `/admin/`.
- **Rutas de Imágenes en CMS:** Parámetro `public_folder` en `config.yml` configurado relativo a `../../assets/images` para compatibilidad nativa con el procesador de Astro (no usar rutas absolutas tipo `/img/`).

## 4. Próximos Pasos (Backlog Prioritario)
1. [ ] **Bug catálogo mobile:** En celulares muestra todos los productos en vez de agrupar por categorías (ver `specs/spec.md`).
2. [ ] **Optimización de rendimiento:** Mejorar velocidad y fluidez en dispositivos móviles.
3. [ ] **Carrito de compras local:** Carrito persistente con resumen consolidado para WhatsApp (ver `specs/carrito.md`).
4. [ ] **Configuración final de producción:** Dominio propio, datos de contacto reales y Netlify Forms de respaldo.
5. [ ] **Banner de Promociones:** Componente reactivo opcional en la Homepage.
6. [ ] **SEO / Schema:** Marcado JSON-LD con Schema `Product` en fichas dinámicas.

## 5. Subagentes Especializados
- **Carpeta creada:** `.agents/agents/` con reglas para subagentes `svelte`, `astro` y `logica`.
- **Propósito:** separar responsabilidades para interfaz, arquitectura y lógica de negocio sin mezclar capas.
- **Estándar aplicado:** `Svelte 5` con runas, `Astro 5` con content collections y `Image`, y lógica pura fuera de la capa visual.
