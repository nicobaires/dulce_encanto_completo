import { siteInfo } from '../data/siteInfo';

/**
 * Genera enlaces normalizados a WhatsApp Web / App.
 * Limpia el prefijo '+' o caracteres no numéricos y codifica el mensaje.
 * Conforme a .agents/agents/logica.md.
 */
export function buildWaLink(message?: string): string {
  const cleanPhone = siteInfo.contact.WhatsApp.replace(/\D/g, '');
  if (!message || message.trim() === '') {
    return `https://wa.me/${cleanPhone}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

