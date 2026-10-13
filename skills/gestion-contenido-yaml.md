# 🛠️ SKILL: Gestión y Formateo de Contenido YAML (Astro Collections)

## 1. Propósito
Este procedimiento operativo le enseña al agente cómo estructurar, validar y dar de alta nuevas categorías o productos dentro de las Content Collections de Astro, garantizando la compatibilidad absoluta con los esquemas de TypeScript (`src/content/config.ts`) y la interfaz de Decap CMS.

## 2. Estructura de Carpetas de Datos
Cada tipo de contenido debe guardarse estrictamente en archivos planos con extensión `.yaml` (no `.yml`) en los siguientes directorios:
- **Categorías:** `src/content/category/[slug].yaml`
- **Productos:** `src/content/product/[slug].yaml`

## 3. Especificación Técnica de los Esquemas

### A. Plantilla Base para Categorías (`src/content/category/`)
Cuando el usuario solicite crear una nueva categoría, genera el archivo usando este formato exacto:
```yaml
id: "nombre-de-la-categoria" # Minúsculas, separado por guiones
titulo: "Nombre Visual de la Categoría"
imagen: "../../assets/images/cat-nombre.webp" # Ruta relativa mandatoria
icono: "fa-solid fa-cake-candles" # Subset de Font Awesome permitido
descripcion: "Breve descripción comercial de la categoría para SEO."
```

### B. Plantilla Base para Productos (`src/content/product/`)
Cuando se dé de alta un producto, el archivo debe estructurarse de la siguiente manera, asegurando la consistencia de tipos:
```yaml
id: "nombre-del-producto"
titulo: "Nombre del Pastel o Producto"
categoria: "id-de-la-categoria-padre" # Debe coincidir con el ID de una categoría existente
precio: 15000 # Solo números enteros, sin signos de peso ni puntos de miles
descripcion: "Descripción detallada de los ingredientes y el tamaño."
destacado: false # Booleano (true/false) para el carrusel de la homepage
imagenPrincipal: "../../assets/images/prod-principal.webp"
galeria:
  - "../../assets/images/prod-galeria-1.webp"
  - "../../assets/images/prod-galeria-2.webp"
```

## 4. Reglas Críticas contra Errores de Formato
1. **Rutas de Imágenes:** Está estrictamente prohibido usar rutas absolutas de tipo `/img/` o `/public/`. Todas las imágenes del CMS y de los archivos manuales deben apuntar de forma relativa a `../../assets/images/` para permitir que `astro:assets` las procese con Sharp.
2. **Sintaxis de Listas:** Para el campo `galeria`, utiliza siempre el formato de guion (`-`) con dos espacios de sangría. Nunca generes arrays en una sola línea (formato JSON `[...]`).
3. **Caracteres Especiales:** Si un título o descripción incluye comillas dobles (`"`), dos puntos (`:`) o acentos que puedan romper el parseo del archivo, envuelve todo el bloque de texto entre comillas dobles externas.

## 5. Criterios de Aceptación del Procedimiento
Antes de dar la tarea por finalizada, el agente debe verificar mentalmente:
- [ ] ¿El archivo tiene la extensión `.yaml`?
- [ ] ¿La categoría asignada al producto coincide exactamente con el ID de una categoría real?
- [ ] ¿Los campos booleanos y numéricos están libres de comillas?
