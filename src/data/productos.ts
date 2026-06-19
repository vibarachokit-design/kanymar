import type { Producto } from '@/types';

export const productosDefault: Producto[] = [
  {
    id: 1, slug: 'jabon-lavanda', name: 'Jabon de Lavanda', linea: 'Lavanda', categoria: 'Jabon',
    price: 4990, weight: '100g',
    description: 'Jabon cosmetico solido para higiene corporal, elaborado con aceites naturales y aceite esencial de lavanda que ayuda a relajar cuerpo y mente.',
    ingredients: 'Aceite de oliva, aceite de coco, manteca de karite, aceite esencial de lavanda, petalos de lavanda secos.',
    benefits: 'Relajante natural,Hidrata profundamente,Aroma calmante,Sin quimicos agresivos',
    image: './assets/prod-jabon-lavanda.jpg', destacado: true,
  },
  {
    id: 2, slug: 'sales-lavanda', name: 'Sales de Bano Lavanda', linea: 'Lavanda', categoria: 'Sales de Bano',
    price: 6990, weight: '250g',
    description: 'Sales de bano con aceite esencial de lavanda para un bano relajante que calma los sentidos y suaviza la piel.',
    ingredients: 'Sal marina, sal de Epsom, aceite esencial de lavanda, petalos de lavanda, aceite de jojoba.',
    benefits: 'Relajacion muscular,Exfoliacion suave,Aromaterapia,Suaviza la piel',
    image: './assets/prod-sales-lavanda.jpg', destacado: true,
  },
  {
    id: 3, slug: 'rollon-lavanda', name: 'Roll-on Relajante Lavanda', linea: 'Lavanda', categoria: 'Roll-on',
    price: 3990, weight: '10ml',
    description: 'Aceite esencial de lavanda en practico roll-on para aplicar en puntos de pulso.',
    ingredients: 'Aceite de jojoba, aceite esencial de lavanda, vitamina E.',
    benefits: 'Relajacion instantanea,Facil aplicacion,Portatil,Calma la ansiedad',
    image: './assets/ing-lavanda.jpg', destacado: false,
  },
  {
    id: 4, slug: 'spray-lavanda', name: 'Home Spray Lavanda', linea: 'Lavanda', categoria: 'Home Spray',
    price: 5990, weight: '100ml',
    description: 'Spray aromatico para el hogar con el dulce aroma de lavanda que crea un ambiente de paz y serenidad.',
    ingredients: 'Agua destilada, aceite esencial de lavanda, alcohol vegetal.',
    benefits: 'Aromatiza espacios,Efecto calmante,Natural y seguro,Ideal para dormitorio',
    image: './assets/linea-lavanda.jpg', destacado: false,
  },
  {
    id: 5, slug: 'jabon-cafe', name: 'Jabon de Cafe Vainilla', linea: 'Cafe Vainilla', categoria: 'Jabon',
    price: 4990, weight: '100g',
    description: 'Jabon exfoliante natural con cafe y vainilla. Limpia profundamente mientras hidrata.',
    ingredients: 'Aceite de oliva, aceite de coco, manteca de karite, cafe molido, vainilla.',
    benefits: 'Exfoliacion natural,Efecto energizante,Hidratacion profunda,Aroma adictivo',
    image: './assets/prod-jabon-cafe.jpg', destacado: true,
  },
  {
    id: 6, slug: 'sales-cafe', name: 'Sales de Bano Cafe Vainilla', linea: 'Cafe Vainilla', categoria: 'Sales de Bano',
    price: 6990, weight: '250g',
    description: 'Sales de bano con cafe y vainilla para un bano energizante que despierta los sentidos.',
    ingredients: 'Sal marina, sal de Epsom, cafe molido, aceite esencial de vainilla.',
    benefits: 'Energizante natural,Exfoliacion suave,Mejora la circulacion,Aroma reconfortante',
    image: './assets/prod-sales-cafe.jpg', destacado: true,
  },
  {
    id: 7, slug: 'rollon-cafe', name: 'Roll-on Energizante Cafe', linea: 'Cafe Vainilla', categoria: 'Roll-on',
    price: 3990, weight: '10ml',
    description: 'Aceite energizante de cafe en roll-on para revitalizar tu energia durante el dia.',
    ingredients: 'Aceite de jojoba, aceite esencial de cafe, aceite esencial de vainilla, vitamina E.',
    benefits: 'Energia instantanea,Facil aplicacion,Portatil,Aroma motivador',
    image: './assets/prod-rollon-cafe.jpg', destacado: true,
  },
  {
    id: 8, slug: 'spray-cafe', name: 'Home Spray Cafe Vainilla', linea: 'Cafe Vainilla', categoria: 'Home Spray',
    price: 5990, weight: '100ml',
    description: 'Spray aromatico con aroma de cafe y vainilla que crea un ambiente calido y acogedor.',
    ingredients: 'Agua destilada, aceite esencial de cafe, vainilla, alcohol vegetal.',
    benefits: 'Aromatiza espacios,Ambiente acogedor,Aroma duradero,Ideal para sala de estar',
    image: './assets/linea-cafe.jpg', destacado: false,
  },
  {
    id: 9, slug: 'jabon-algas', name: 'Jabon de Algas Marinas', linea: 'Algas Marinas', categoria: 'Jabon',
    price: 4990, weight: '100g',
    description: 'Jabon revitalizante con algas marinas del norte de Chile. Rico en minerales.',
    ingredients: 'Aceite de oliva, aceite de coco, algas marinas en polvo, eucalipto.',
    benefits: 'Purifica la piel,Rico en minerales,Efecto revitalizante,Hidrata profundamente',
    image: './assets/prod-spray-algas.jpg', destacado: false,
  },
  {
    id: 10, slug: 'sales-algas', name: 'Sales de Bano Algas Marinas', linea: 'Algas Marinas', categoria: 'Sales de Bano',
    price: 6990, weight: '250g',
    description: 'Sales de bano con algas marinas para una experiencia spa que remineraliza la piel.',
    ingredients: 'Sal marina, algas marinas deshidratadas, aceite esencial de eucalipto.',
    benefits: 'Remineralizante,Revitaliza la piel,Experiencia spa,Aroma fresco oceanico',
    image: './assets/linea-algas.jpg', destacado: false,
  },
  {
    id: 11, slug: 'rollon-algas', name: 'Roll-on Fresh Algas', linea: 'Algas Marinas', categoria: 'Roll-on',
    price: 3990, weight: '10ml',
    description: 'Aceite refrescante con extracto de algas marinas para frescura oceanica instantanea.',
    ingredients: 'Aceite de jojoba, extracto de algas marinas, eucalipto, vitamina E.',
    benefits: 'Frescura instantanea,Facil aplicacion,Portatil,Sensacion oceanica',
    image: './assets/ing-algas.jpg', destacado: false,
  },
  {
    id: 12, slug: 'spray-algas', name: 'Home Spray Algas Marinas', linea: 'Algas Marinas', categoria: 'Home Spray',
    price: 5990, weight: '100ml',
    description: 'Spray aromatico que transporta la brisa marina del norte de Chile a tu hogar.',
    ingredients: 'Agua destilada, extracto de algas marinas, eucalipto, alcohol vegetal.',
    benefits: 'Aire fresco marino,Revitaliza espacios,Aroma limpio,Elimina malos olores',
    image: './assets/prod-spray-algas.jpg', destacado: true,
  },
  {
    id: 13, slug: 'jabon-romero', name: 'Jabon de Romero', linea: 'Romero', categoria: 'Jabon',
    price: 4990, weight: '100g',
    description: 'Jabon tonificante con romero fresco que estimula la circulacion.',
    ingredients: 'Aceite de oliva, aceite de coco, romero fresco molido, aceite esencial de romero.',
    benefits: 'Tonificante natural,Estimula circulacion,Limpieza profunda,Aroma herbal fresco',
    image: './assets/prod-jabon-romero.jpg', destacado: true,
  },
  {
    id: 14, slug: 'sales-romero', name: 'Sales de Bano Romero', linea: 'Romero', categoria: 'Sales de Bano',
    price: 6990, weight: '250g',
    description: 'Sales de bano con romero para un bano revitalizante que despierta cuerpo y mente.',
    ingredients: 'Sal marina, romero fresco deshidratado, aceite esencial de romero.',
    benefits: 'Revitalizante,Mejora la concentracion,Alivia el cansancio,Aroma herbal energizante',
    image: './assets/linea-romero.jpg', destacado: false,
  },
  {
    id: 15, slug: 'rollon-romero', name: 'Roll-on Revitalizante Romero', linea: 'Romero', categoria: 'Roll-on',
    price: 3990, weight: '10ml',
    description: 'Aceite revitalizante de romero en roll-on para mejorar la concentracion.',
    ingredients: 'Aceite de jojoba, aceite esencial de romero, menta, vitamina E.',
    benefits: 'Mejora concentracion,Energia mental,Facil aplicacion,Portatil',
    image: './assets/ing-oliva.jpg', destacado: false,
  },
  {
    id: 16, slug: 'spray-romero', name: 'Home Spray Romero', linea: 'Romero', categoria: 'Home Spray',
    price: 5990, weight: '100ml',
    description: 'Spray aromatico con romero que purifica el ambiente y aporta claridad.',
    ingredients: 'Agua destilada, aceite esencial de romero, limon, alcohol vegetal.',
    benefits: 'Purifica el ambiente,Claridad mental,Aroma herbal limpio,Ideal para estudio/oficina',
    image: './assets/linea-romero.jpg', destacado: false,
  },
];

export const lineaColors: Record<string, string> = {
  'Lavanda': '#9B7CB6',
  'Cafe Vainilla': '#8B6F4E',
  'Algas Marinas': '#4A90B8',
  'Romero': '#5A8A6E',
};

export const lineaBgImages: Record<string, string> = {
  'Lavanda': './assets/linea-lavanda.jpg',
  'Cafe Vainilla': './assets/linea-cafe.jpg',
  'Algas Marinas': './assets/linea-algas.jpg',
  'Romero': './assets/linea-romero.jpg',
};

// Load from localStorage or use defaults
export function getProductos(): Producto[] {
  try {
    const saved = localStorage.getItem('kanymar_productos');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return [...productosDefault];
}

export function saveProductos(productos: Producto[]) {
  localStorage.setItem('kanymar_productos', JSON.stringify(productos));
}

export function resetProductos() {
  localStorage.removeItem('kanymar_productos');
}
