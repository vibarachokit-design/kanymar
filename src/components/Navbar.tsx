import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Settings, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAdmin } from '@/hooks/useAdmin';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { isAdmin, logout } = useAdmin();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showSolid = scrolled || isAdminPage;

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/catalogo', label: 'Catalogo' },
    { to: '/#nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showSolid ? 'bg-crema/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 C30 25, 10 45, 10 65 C10 82, 25 92, 50 92 C75 92, 90 82, 90 65 C90 45, 70 25, 50 10Z" fill="#2BA8A8" opacity="0.9"/>
                <path d="M50 20 C38 32, 25 48, 25 62 C25 75, 35 82, 50 82 C65 82, 75 75, 75 62 C75 48, 62 32, 50 20Z" fill="#2BA8A8"/>
                <path d="M50 35 C44 42, 38 52, 38 62 C38 70, 43 75, 50 75 C57 75, 62 70, 62 62 C62 52, 56 42, 50 35Z" fill="#F7F3EC" opacity="0.3"/>
              </svg>
              <div className="flex flex-col">
                <span className={`font-playfair text-xl font-semibold tracking-wide transition-colors ${showSolid ? 'text-cafe' : 'text-blancoRoto'}`}>KANYMAR</span>
                <span className={`text-[9px] uppercase tracking-[0.2em] transition-colors -mt-1 ${showSolid ? 'text-grisCalido' : 'text-blancoRoto/70'}`}>Cosmetica Natural</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`font-inter text-[13px] font-medium uppercase tracking-[0.1em] transition-colors hover:text-turquesa ${showSolid ? 'text-cafe' : 'text-blancoRoto'}`}>{link.label}</Link>
              ))}
              {isAdmin && (
                <Link to="/admin" className={`font-inter text-[13px] font-medium uppercase tracking-[0.1em] transition-colors hover:text-turquesa flex items-center gap-1 ${showSolid ? 'text-cafe' : 'text-blancoRoto'} ${isAdminPage ? 'text-turquesa' : ''}`}>
                  <Settings size={13} /> Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={openCart} className={`relative p-2 transition-colors ${showSolid ? 'text-cafe' : 'text-blancoRoto'}`} aria-label="Carrito">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-turquesa text-[10px] font-semibold text-white">{totalItems}</span>}
              </button>
              {isAdmin && (
                <button onClick={logout} className={`hidden md:flex p-2 transition-colors ${showSolid ? 'text-cafe' : 'text-blancoRoto'} hover:text-turquesa`} title="Salir">
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 transition-colors ${showSolid ? 'text-cafe' : 'text-blancoRoto'}`} aria-label="Menu">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-crema">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(link => <Link key={link.to} to={link.to} className="font-playfair text-3xl text-cafe hover:text-turquesa transition-colors">{link.label}</Link>)}
            {isAdmin && <Link to="/admin" className="font-playfair text-3xl text-turquesa flex items-center gap-2"><Settings size={24} /> Admin</Link>}
            {isAdmin && <button onClick={logout} className="font-playfair text-3xl text-cafe hover:text-turquesa flex items-center gap-2"><LogOut size={24} /> Salir</button>}
          </div>
        </div>
      )}
    </>
  );
}
