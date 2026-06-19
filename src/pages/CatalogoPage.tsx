import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductos, lineaColors } from '@/data/productos';
import gsap from 'gsap';

gsap.registerPlugin();

const lineas = ['Todos', 'Lavanda', 'Cafe Vainilla', 'Algas Marinas', 'Romero'];

export default function CatalogoPage() {
  const { linea } = useParams<{ linea?: string }>();
  const [activeFilter, setActiveFilter] = useState(linea || 'Todos');
  const { addItem } = useCart();
  const gridRef = useRef<HTMLDivElement>(null);
  const productos = getProductos();

  useEffect(() => { if (linea && lineas.includes(linea)) setActiveFilter(linea); }, [linea]);

  const filtered = activeFilter === 'Todos' ? productos : productos.filter(p => p.linea === activeFilter);

  return (
    <>
      <section className="relative h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(./assets/header-catalogo.jpg)' }}><div className="absolute inset-0 bg-cafe/50" /></div>
        <div className="relative text-center px-4">
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-semibold text-blancoRoto">Nuestro Catalogo</h1>
          <p className="mt-4 text-lg text-blancoRoto/80 max-w-xl mx-auto">Cosmetica natural artesanal, elaborada a mano en Mejillones</p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-crema">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {lineas.map(l => (
              <button key={l} onClick={() => setActiveFilter(l)} className={`px-5 py-2 rounded-full font-inter text-[13px] font-medium uppercase tracking-wider transition-all ${activeFilter === l ? 'text-white shadow-md' : 'border border-grisCalido/30 text-grisCalido hover:border-cafe hover:text-cafe'}`} style={activeFilter === l ? { backgroundColor: lineaColors[l] || '#6B4C3B' } : {}}>{l}</button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(prod => (
              <div key={prod.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <Link to={`./producto/${prod.slug}`} className="block relative overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-inter font-medium uppercase tracking-wider text-white" style={{ backgroundColor: lineaColors[prod.linea] || '#6B4C3B' }}>{prod.linea}</span>
                  <button onClick={(e) => { e.preventDefault(); addItem(prod); }} className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-cafe opacity-0 group-hover:opacity-100 hover:bg-turquesa hover:text-white shadow-sm"><Plus size={18} /></button>
                </Link>
                <div className="p-5">
                  <Link to={`./producto/${prod.slug}`}><h3 className="font-playfair text-base font-medium text-cafe hover:text-turquesa">{prod.name}</h3></Link>
                  <p className="text-xs text-grisCalido mt-1">{prod.weight} - Artesanal</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-inter text-base font-semibold text-cafe">${prod.price.toLocaleString('es-CL')}</span>
                    <button onClick={() => addItem(prod)} className="px-3 py-1.5 border border-turquesa text-turquesa rounded-full text-xs font-medium hover:bg-turquesa hover:text-white">Anadir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && <div className="text-center py-20"><p className="font-playfair text-xl text-cafe">No hay productos</p></div>}
        </div>
      </section>
    </>
  );
}
