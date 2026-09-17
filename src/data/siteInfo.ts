export const siteInfo = {
  brandName: 'Cocina LoLa',
  siteUrl: 'https://cocina-lola.netlify.app',
  siteDescription: 'Pastelería artesanal en Buenos Aires. Tortas, budines, alfajores y postres caseros hechos con amor.',
  contact: {
    WhatsApp: '+5491123456789',
    email: 'info@cocinalola.com',
    address: 'Buenos Aires, Lanús, Argentina',
    instagram: 'https://instagram.com/cocina.lola',
    facebook: 'https://facebook.com/cocina.lola.1',
  },
} as const;

export type SiteInfo = typeof siteInfo;
