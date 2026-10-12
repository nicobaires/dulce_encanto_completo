# 📋 SPEC: [Nombre de la Funcionalidad / Módulo]
**ID de la Spec:** SPEC-001  
**Autor:** [Tu Nombre] (Product Owner)  
**Estado:** En Planificación / Aprobado para Desarrollo  

## 1. Objetivo y Contexto de Negocio
*Explica de forma sencilla qué problema resuelve esta función y por qué es importante para el usuario final o el negocio.*
- **Problema:** Los clientes de la pastelería ven los productos en la web pero tienen que coordinar manualmente uno por uno por WhatsApp, lo cual ralentiza el proceso de venta.
- **Solución:** Crear un sistema de carrito de compras local para que el usuario agrupe sus productos y envíe un pedido unificado con el detalle y total de la compra por WhatsApp.

## 2. Requerimientos Funcionales (Criterios de Aceptación)
*La lista de cosas exactas que el sistema DEBE hacer. Esto evita que la IA asuma cosas o invente funciones de más.*
- [ ] El usuario debe poder añadir productos al carrito desde la página de catálogo.
- [ ] Debe haber un indicador flotante en la pantalla con el número actual de ítems en el carrito.
- [ ] El carrito debe persistir los datos (si el usuario recarga la página, los productos no deben borrarse).
- [ ] Al hacer clic en "Enviar Pedido", se debe abrir una pestaña de WhatsApp Web con un mensaje formateado con asteriscos para las negritas (ej: `*Pedido de Cocina LoLa:* \n - 1x Tarta de Frutilla (\$15000)`).

## 3. Arquitectura Técnica y Scope de Archivos
*Aquí le dices a la IA exactamente qué herramientas usar de tu stack y qué archivos va a crear o modificar.*
- **Estrategia Global:** Se utilizará la API nativa de `localStorage` para la persistencia del carrito sin base de datos externa.
- **Archivos a Crear:**
  - `src/components/CarritoFlotante.svelte` -> Botón flotante e interfaz del carrito desplegable.
  - `src/stores/carrito.js` o un archivo de estado global usando Runas de Svelte 5 (`$state`) para compartir el carrito entre componentes.
- **Archivos a Modificar:**
  - `src/components/CardProducto.svelte` -> Agregar el botón de "Añadir al carrito" enlazado al estado global.

## 4. Casos Extremos y Restricciones (Edge Cases)
*Los "dolores de cabeza" que anticipas como Senior para que la IA los programe bien desde el primer intento.*
- **Stock Cero:** Si un producto viene del CMS con un precio de `0` o no disponible, el botón de añadir al carrito debe deshabilitarse visualmente y bloquearse lógicamente.
- **Precio Vacío:** Si el carrito está vacío, el botón de "Enviar Pedido" debe estar oculto o deshabilitado para evitar mensajes en blanco a la pastelería.

## 5. Instrucción de Ejecución para el Agente (Prompt de Activación)
> *“Actúa bajo las reglas de `AGENTS.md`. Lee esta especificación completa junto con el skill de Svelte 5. Procesa el desarrollo estrictamente un archivo a la vez. Cuando termines cada componente, solicita permiso de la terminal para realizar un build de prueba (`pnpm run build`) y verificar que TypeScript no arroje errores.”*
