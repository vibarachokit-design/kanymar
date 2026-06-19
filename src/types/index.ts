export interface Producto {
  id: number;
  slug: string;
  name: string;
  linea: string;
  categoria: string;
  price: number;
  weight: string;
  description: string;
  ingredients: string;
  benefits: string;
  image: string;
  destacado: boolean;
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}
