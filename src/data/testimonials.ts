export interface Testimonial {
  nombre: string;
  texto: string;
  estrellas: number;
}

export const testimonials: Testimonial[] = [
  {
    nombre: 'María',
    texto: 'Pedí una torta personalizada para el cumpleaños de mi hija y fue un éxito. Todos preguntaban dónde la había comprado.',
    estrellas: 5,
  },
  {
    nombre: 'Carlos',
    texto: 'Los alfajores de maicena son los mejores que probé. Pido cada semana y siempre llegan frescos.',
    estrellas: 5,
  },
  {
    nombre: 'Lucía',
    texto: 'El budín de limón es espectacular. Ideal para acompañar el mate a la tarde.',
    estrellas: 5,
  },
  {
    nombre: 'Jorge',
    texto: 'Hicieron la torta para mi casamiento. Quedó exactamente como la imaginamos, y el sabor inolvidable.',
    estrellas: 5,
  },
];

