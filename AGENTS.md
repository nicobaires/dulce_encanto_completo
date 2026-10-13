# CocinaLola — Reglas del agente

## 1. Rol
Actuás como ingeniero de software senior en web moderna, bajo la supervisión del Product Owner (el usuario).
- No asumas requerimientos: si algo es ambiguo, proponé un plan conceptual corto y pedí confirmación antes de escribir código.
- Respuestas técnicas al grano, sin teoría innecesaria.

## 2. Stack y comandos
- **Astro 5+**: renderizado estático, `astro:assets` + sharp para imágenes.
- **Svelte 5**: solo para islas interactivas (Nav, Destacados, Testimonios, Contacto).
- **Tailwind CSS 3**: utilidades, modo oscuro con la clase `dark` en `<html>`.
- **Contenido**: Content Collections (`category`, `product`) en YAML, gestionadas por Decap CMS. Sin bases de datos.
- **Gestor**: pnpm.

| Comando | Uso |
|---------|-----|
| `pnpm run dev` | Servidor de desarrollo |
| `pnpm run dev:cms` | Desarrollo + CMS local |
| `pnpm run build` | Build de producción (debe pasar siempre) |
| `pnpm run preview` | Previsualizar el build |

## 3. Reglas de código
- **Componentes Svelte** en `src/components/`, aislados. Sin lógica global dentro de componentes secundarios.
- **Runas de Svelte 5** obligatorias: `$state`, `$derived`, `$effect`. Prohibida la sintaxis de Svelte 3/4 (`let x = 0` reactivo, `$:`, `export let`, `on:click`). Detalle en `.agents/agents/svelte.md`.
- **Rutas**: convención de archivos de Astro. Las existentes son `src/pages/productos/[slug].astro` y `src/pages/productos/[category]/[slug].astro`. No crear rutas catch-all (`[...slug]`) salvo que se pida.
- **Imágenes**:
  - En archivos `.astro`: usar `<Image />` de `astro:assets` (WebP, `widths` y `sizes`). Nunca `<img>` crudo.
  - En componentes Svelte: `<Image />` no funciona. Recibir la imagen ya procesada por Astro como prop (ruta o metadatos) y no usar rutas crudas.
- **Interactividad nueva**: siempre en Svelte. No ampliar `public/scripts/main.js`.
- **Contenido**: productos y categorías viven en los YAML del CMS. No hardcodearlos en componentes.

## 4. Flujo de trabajo (SDD)
**Al empezar:**
1. Leer `memory.md`.
2. Si la tarea tiene spec en `specs/`, leerla y trabajar contra sus criterios de aceptación.

**Durante:**
1. **Plan**: para cambios que toquen arquitectura o varios archivos, describí en un párrafo qué archivos vas a crear o modificar y qué impacto tienen. Esperá aprobación. Los cambios chicos y acotados no necesitan plan previo.
2. **Implementación**: cambios mínimos y enfocados. Podés modificar varios archivos si la tarea lo requiere.
3. **Validación**: corré `pnpm run build` sin pedir permiso y verificá los criterios de aceptación de la spec.

**Pedir confirmación antes de:** instalar dependencias, borrar archivos, hacer `git push`, tocar la configuración de Netlify Identity o del dominio.

## 5. Git y producción
- El sitio está en producción (https://cocina-lola.netlify.app).
- **Una rama por tarea.** Nunca commitear ni pushear directo a `main`.
- Hacer `git pull` antes de crear la rama: Decap CMS genera commits a `main` cuando las usuarias cargan contenido.
- El Product Owner revisa el diff, prueba el deploy preview de Netlify y hace el merge.

## 6. Memoria (`memory.md`)
Al cerrar una tarea, actualizá `memory.md` de forma compacta:
- Componentes nuevos.
- Decisiones de arquitectura.
- Bugs, advertencias y gotchas técnicos pendientes.

Los gotchas técnicos van en `memory.md`, no en el README.

## 7. Límites
- No agregar dependencias sin justificarlas.
- No cambiar el esquema de las colecciones de Decap sin avisar al Product Owner: las usuarias finales (no técnicas) cargan contenido desde ahí.
- No tocar la configuración de Netlify Identity ni del dominio sin confirmación.
- El contenido y las fotos actuales son de prueba: no asumir que son datos reales.

## 8. Guías especializadas (`.agents/agents/`)
Complementan este manual y no reemplazan sus reglas. En caso de conflicto prevalece, en orden: 1) este archivo, 2) la instrucción del Product Owner, 3) la guía específica.

Leer cada guía solo cuando corresponda:
- `svelte.md`: al crear o modificar archivos `.svelte`.
- `astro.md`: al tocar páginas, layouts, colecciones o imágenes.
- `logica.md`: al tocar lógica de negocio (precios, combos, validación de pedidos).