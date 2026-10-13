# Guía Lógica de negocio — CocinaLola

> Complementa a [AGENTS.md](../../AGENTS.md), que prevalece en caso de conflicto. Leer al tocar lógica de negocio: filtros, transformación de datos, mensajes de WhatsApp y, cuando exista, combos de lunch.

## Dónde va la lógica
Funciones puras en **`src/lib/`** (carpeta a crear si no existe), un archivo por tema. Los componentes Svelte y las páginas Astro las importan; no contienen reglas de negocio propias.

## Alcance actual
- Filtrado y agrupación de productos por categoría.
- Transformación de los YAML de contenido en estructuras útiles para la UI.
- Armado del mensaje de WhatsApp a partir del formulario de contacto.
- Normalización de slugs, nombres de categorías y textos.

## Alcance futuro (solo si se agrega)
- **Combos de lunch:** catering para eventos, con combos por cantidad de unidades de distintos productos (no menú semanal individual). Antes de implementarlo, definir con el Product Owner qué entra en un combo, las cantidades permitidas y cómo se informa el precio.
- Precios, promociones y resumen de pedido. Hoy el sitio no tiene carrito ni checkout.

## Reglas
- **Funciones puras y deterministas:** misma entrada, misma salida, sin efectos secundarios.
- **Entrada → cálculo → salida**, con tipos TypeScript explícitos.
- **Sin DOM ni lógica de UI** en esta capa.
- **Sin cálculos ocultos:** todo cálculo que afecte lo que ve o envía el usuario vive en una función con nombre claro.
- **Casos borde manejados:** cantidades nulas o negativas, categorías inexistentes, precios faltantes, textos vacíos, datos inconsistentes.
- **Composición simple** antes que funciones gigantes.
- Las decisiones de negocio que afecten la experiencia del usuario se registran en `memory.md`.

## Tests
Si el proyecto tiene un runner de tests (por ejemplo Vitest), cada función de `src/lib/` lleva su archivo `.test.ts` con casos válidos, inválidos y borde. Es la capa donde los tests dan más valor por menos esfuerzo.

## Antes de entregar
1. La lógica no depende de ningún componente ni de la renderización.
2. Entradas, salidas y casos borde definidos.
3. `pnpm run build` pasa.
4. Si hace falta cambiar un schema de contenido, frenar y pedir confirmación (ver `astro.md` y AGENTS.md).