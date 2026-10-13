/**
 * Helpers puros para formateo y limpieza de precios.
 * Conforme a .agents/agents/logica.md.
 */

export function formatPrice(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return '';
  const str = String(value);
  const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return '';
  return '$' + num.toLocaleString('es-AR');
}

export function cleanPrice(price: string | undefined | null): string | undefined {
  if (!price) return undefined;
  const cleaned = price.replace(/[^0-9]/g, '');
  return cleaned || undefined;
}

