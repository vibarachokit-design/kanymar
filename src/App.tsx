import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CatalogoPage from '@/pages/CatalogoPage';
import ProductoPage from '@/pages/ProductoPage';
import ContactoPage from '@/pages/ContactoPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename="/kanymar">
        <div className="min-h-screen bg-crema">
          <Navbar />
          <CartDrawer />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/catalogo/:linea" element={<CatalogoPage />} />
              <Route path="/producto/:id" element={<ProductoPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
