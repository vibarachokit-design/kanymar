import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Plus, Minus, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductos, lineaColors } from '@/data/productos';

export default function ProductoPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showIngredients, setShowIngredients] = useState(false);
  const producto = getProductos().find(p => p.slug === id);

  useEffect(() => { setQuantity(1); setShowIngredients(false); window.scrollTo(0, 0); }, [id]);

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="text-center">
          <h2 className="font-playfair text-2xl text-cafe mb-4">Producto no encontrado</h2>
          <Link to="./catalogo" className="text-turquesa hover:underline">Volver al catalogo</Link>
        </div>
      </div>
    );
  }

  const beneficios = producto.benefits.split(',');

  return (
    <div className="min-h-screen bg-crema pt-[72px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex items-center gap-2 text-sm text-grisCalido mb-8">
          <Link to="./" className="hover:text-turquesa">Inicio</Link>
          <ChevronRight size={14} />
          <Link to={`./catalogo/${producto.linea}`} className="hover:text-turquesa">{producto.linea}</Link>
          <ChevronRight size={14} />
          <span className="text-cafe">{producto.name}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative bg-white rounded-xl overflow-hidden shadow-sm">
            <img src={producto.image} alt={producto.name} className="w-full h-[400px] lg:h-[500px] object-cover" />
            <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[12px] font-inter font-medium uppercase tracking-wider text-white" style={{ backgroundColor: lineaColors[producto.linea] || '#6B4C3B' }}>{producto.linea}</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-playfair text-3xl lg:text-4xl font-semibold text-cafe leading-tight">{producto.name}</h1>
            <p className="font-playfair text-2xl font-semibold text-turquesa mt-3">${producto.price.toLocaleString('es-CL')}</p>
            <p className="mt-6 text-base text-cafe/75 leading-[1.8]">{producto.description}</p>
            <div className="mt-8 space-y-3">
              {beneficios.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-romero/10 flex items-center justify-center"><Check size={12} className="text-romero" /></div>
                  <span className="text-sm text-cafe/80">{feat.trim()}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-arena/20 pt-6">
              <button onClick={() => setShowIngredients(!showIngredients)} className="flex items-center justify-between w-full text-left">
                <span className="font-playfair text-lg font-medium text-cafe">Ingredientes</span>
                <span className="text-turquesa text-xl transition-transform" style={{ transform: showIngredients ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {showIngredients && <p className="mt-3 text-sm text-cafe/70 leading-relaxed">{producto.ingredients}</p>}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 border border-arena/30 rounded-full px-4 py-2.5">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-arena/10"><Minus size={16} /></button>
                <span className="w-8 text-center font-medium text-cafe">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-arena/10"><Plus size={16} /></button>
              </div>
              <button onClick={() => { for (let i = 0; i < quantity; i++) addItem(producto); }} className="flex-1 py-3 bg-turquesa text-white rounded-full font-inter font-medium hover:bg-turquesa/90">Agregar al Carrito</button>
            </div>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Hola! Me interesa comprar ${quantity}x ${producto.name} - Total: $${(producto.price * quantity).toLocaleString('es-CL')}`)}`} target="_blank" rel="noopener noreferrer" className="mt-3 block w-full py-3 bg-cafe text-white rounded-full font-inter font-medium text-center hover:bg-cafe/90">Comprar Ahora por WhatsApp</a>
            <Link to="./catalogo" className="inline-flex items-center gap-2 mt-8 text-sm text-grisCalido hover:text-turquesa"><ArrowLeft size={16} /> Volver al catalogo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
