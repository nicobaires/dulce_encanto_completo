# Spec 001 — Catálogo mobile: mostrar categorías

## Problema
En mobile, el catálogo muestra todos los productos juntos en vez de las categorías.
Con pocos productos pasa desapercibido; al crecer el catálogo será inusable.

## Objetivo
En pantallas chicas, el usuario ve primero las categorías y al elegir una, ve sus productos.

## Fuera de alcance
- Rediseño visual del catálogo.
- Cambios al esquema de Decap CMS.
- Versión desktop (no debe cambiar).

## Criterios de aceptación
- [x] A 375px de ancho se listan las categorías, no los productos.
- [x] Al tocar una categoría se muestran solo sus productos.
- [x] Hay una forma clara de volver a las categorías.
- [x] Una categoría nueva cargada desde el CMS aparece sin tocar código.
- [x] Con 50 productos de prueba la interacción sigue fluida.
- [x] En desktop el comportamiento no cambia.
- [x] `pnpm build` pasa sin errores.

## Cómo verificar
1. `pnpm dev` y abrir en modo responsive a 375px.
2. Probar cada criterio a mano.
3. Duplicar productos de prueba hasta ~50 y repetir.
