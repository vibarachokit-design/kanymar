import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCart();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-cafe/30 backdrop-blur-sm transition-opacity" onClick={closeCart} />
      <div className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[420px] bg-blancoRoto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-arena/20">
          <h2 className="font-playfair text-2xl font-semibold text-cafe">Tu Carrito</h2>
          <button onClick={closeCart} className="p-2 text-cafe hover:text-turquesa transition-colors"><X size={22} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <ShoppingBag size={48} className="text-arena/50 mb-4" />
              <p className="font-playfair text-lg text-cafe mb-2">Tu carrito esta vacio</p>
              <button onClick={closeCart} className="px-6 py-2.5 bg-turquesa text-white rounded-full text-sm font-medium hover:bg-turquesa/90">Ver Productos</button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.producto.id} className="flex gap-4 p-3 bg-white rounded-lg shadow-sm">
                  <Link to={`/producto/${item.producto.slug}`} onClick={closeCart} className="shrink-0">
                    <img src={item.producto.image} alt={item.producto.name} className="w-16 h-16 object-cover rounded-md" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/producto/${item.producto.slug}`} onClick={closeCart} className="font-playfair text-sm font-medium text-cafe hover:text-turquesa line-clamp-1">{item.producto.name}</Link>
                    <p className="text-xs text-grisCalido mt-0.5">{item.producto.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)} className="w-6 h-6 flex items-center justify-center rounded-full border border-arena/30"><Minus size={12} /></button>
                        <span className="text-sm font-medium text-cafe w-4 text-center">{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)} className="w-6 h-6 flex items-center justify-center rounded-full border border-arena/30"><Plus size={12} /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-cafe">${(item.producto.price * item.cantidad).toLocaleString('es-CL')}</span>
                        <button onClick={() => removeItem(item.producto.id)} className="p-1 text-grisCalido hover:text-red-400"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-arena/20 px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-grisCalido">Subtotal</span>
              <span className="font-playfair text-lg font-semibold text-cafe">${subtotal.toLocaleString('es-CL')}</span>
            </div>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Hola! Me gustaria comprar:\n${items.map(i => `- ${i.cantidad}x ${i.producto.name} ($${(i.producto.price * i.cantidad).toLocaleString('es-CL')})`).join('\n')}\n\nTotal: $${subtotal.toLocaleString('es-CL')}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3.5 bg-turquesa text-white text-center rounded-full font-medium hover:bg-turquesa/90">Finalizar Compra por WhatsApp</a>
            <button onClick={closeCart} className="block w-full text-center mt-3 text-sm text-cafe hover:text-turquesa">Seguir Comprando</button>
          </div>
        )}
      </div>
    </>
  );
}
