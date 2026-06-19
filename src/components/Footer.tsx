import { Link } from 'react-router-dom';
import { Instagram, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cafe text-blancoRoto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none"><path d="M50 10 C30 25, 10 45, 10 65 C10 82, 25 92, 50 92 C75 92, 90 82, 90 65 C90 45, 70 25, 50 10Z" fill="#2BA8A8" opacity="0.9"/><path d="M50 20 C38 32, 25 48, 25 62 C25 75, 35 82, 50 82 C65 82, 75 75, 75 62 C75 48, 62 32, 50 20Z" fill="#2BA8A8"/></svg>
              <span className="font-playfair text-lg font-semibold">KANYMAR</span>
            </div>
            <p className="text-sm text-blancoRoto/70 leading-relaxed">Cosmetica Natural inspirada en el mar del norte de Chile.</p>
          </div>
          <div>
            <h4 className="font-inter text-xs font-medium uppercase tracking-[0.15em] mb-4 text-arena">Tienda</h4>
            <ul className="space-y-2.5">
              {['Lavanda', 'Cafe Vainilla', 'Algas Marinas', 'Romero'].map(l => (
                <li key={l}><Link to={`/catalogo/${l}`} className="text-sm text-blancoRoto/70 hover:text-arena transition-colors">Linea {l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-inter text-xs font-medium uppercase tracking-[0.15em] mb-4 text-arena">Empresa</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-blancoRoto/70 hover:text-arena transition-colors">Nuestra Historia</Link></li>
              <li><Link to="/catalogo" className="text-sm text-blancoRoto/70 hover:text-arena transition-colors">Catalogo</Link></li>
              <li><Link to="/contacto" className="text-sm text-blancoRoto/70 hover:text-arena transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-inter text-xs font-medium uppercase tracking-[0.15em] mb-4 text-arena">Legal</h4>
            <ul className="space-y-2.5 mb-6">
              <li><span className="text-sm text-blancoRoto/70">Terminos y Condiciones</span></li>
              <li><span className="text-sm text-blancoRoto/70">Politica de Envio</span></li>
            </ul>
            <div className="flex gap-3">
              <a href="https://instagram.com/kanymar.cl" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blancoRoto/10 hover:bg-turquesa transition-colors"><Instagram size={16} /></a>
              <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blancoRoto/10 hover:bg-romero transition-colors"><Phone size={16} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-blancoRoto/10">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <p className="text-center text-xs text-blancoRoto/50">Hecho con amor en Mejillones, Chile - 2026 Kanymar</p>
        </div>
      </div>
    </footer>
  );
}
