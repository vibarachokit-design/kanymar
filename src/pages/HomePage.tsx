import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, Droplets, Wind, Heart, Mail, Phone, Instagram } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductos, lineaBgImages } from '@/data/productos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lineas = [
  { name: 'Algas Marinas', image: lineaBgImages['Algas Marinas'], color: '#4A90B8' },
  { name: 'Lavanda', image: lineaBgImages['Lavanda'], color: '#9B7CB6' },
  { name: 'Cafe Vainilla', image: lineaBgImages['Cafe Vainilla'], color: '#8B6F4E' },
  { name: 'Romero', image: lineaBgImages['Romero'], color: '#5A8A6E' },
];

const testimonios = [
  { quote: 'El jabon de lavanda es pura magia. Mi piel nunca habia estado tan suave.', author: 'Camila R.', detail: 'Antofagasta' },
  { quote: 'Las sales de cafe vainilla son mi ritual de domingo. El aroma es adictivo.', author: 'Daniela S.', detail: 'Santiago' },
  { quote: 'Amo que sean 100% naturales y artesanales. Se nota la diferencia.', author: 'Valentina M.', detail: 'Mejillones' },
];

const ingredientes = [
  { name: 'Aceite de Oliva', image: './assets/ing-oliva.jpg', size: 'large' },
  { name: 'Manteca de Karite', image: './assets/ing-karite.jpg', size: 'medium' },
  { name: 'Aceite Esencial de Lavanda', image: './assets/ing-lavanda.jpg', size: 'medium' },
  { name: 'Aceite de Coco', image: './assets/ing-coco.jpg', size: 'medium' },
  { name: 'Alga Marina', image: './assets/ing-algas.jpg', size: 'large' },
];

export default function HomePage() {
  const { addItem } = useCart();
  const productos = getProductos();
  const destacados = productos.filter(p => p.destacado);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
      gsap.fromTo('.hero-desc', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' });
      sectionsRef.current.forEach(section => {
        if (!section) return;
        const items = section.querySelectorAll('.animate-in');
        gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 80%' } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(./assets/hero-mejillones.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-cafe/50 via-cafe/10 to-transparent" />
        </div>
        <div className="relative h-full flex items-end pb-20 px-[5%]">
          <div className="max-w-xl">
            <h1 className="hero-title font-playfair text-4xl sm:text-5xl lg:text-7xl font-semibold text-blancoRoto leading-tight drop-shadow-lg">Cosmetica Natural del Norte de Chile</h1>
            <p className="hero-desc mt-5 text-base sm:text-lg text-blancoRoto/90 leading-relaxed max-w-[520px]">Inspirada en los paisajes de Mejillones, donde el mar y el desierto se encuentran. Ingredientes nobles, procesos artesanales y bienestar real para tu piel.</p>
            <Link to="./catalogo" className="hero-cta inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-turquesa text-blancoRoto rounded-full font-inter text-sm font-medium hover:scale-[1.03] hover:shadow-lg transition-all">Descubre Nuestros Productos <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <div className="bg-crema border-y border-arena/20 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-grisCalido mx-4">100% Artesanal - Hecho en Mejillones, Chile - Sin Quimicos Agresivos - Inspirado en el Mar del Norte - Envio a Todo Chile -&nbsp;</span>
          ))}
        </div>
      </div>

      <section className="py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {lineas.map(linea => (
            <Link key={linea.name} to={`./catalogo/${linea.name}`} className="group relative h-[320px] sm:h-[400px] overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${linea.image})` }} />
              <div className="absolute inset-0 bg-cafe/40 group-hover:bg-cafe/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-blancoRoto tracking-wide transition-transform group-hover:scale-105" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{linea.name}</h3>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 transition-transform origin-left scale-x-0 group-hover:scale-x-100" style={{ backgroundColor: linea.color }} />
            </Link>
          ))}
        </div>
      </section>

      <section ref={el => { sectionsRef.current[0] = el; }} className="py-20 lg:py-28 bg-crema">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 animate-in">
            <div>
              <span className="font-inter text-[13px] font-medium uppercase tracking-[0.15em] text-turquesa">Nuestros Favoritos</span>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-cafe mt-2">Productos Destacados</h2>
            </div>
            <Link to="./catalogo" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-cafe hover:text-turquesa">Ver todo <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destacados.map((prod, i) => (
              <div key={prod.id} className="animate-in group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow" style={{ animationDelay: `${i * 0.08}s` }}>
                <Link to={`./producto/${prod.slug}`} className="block relative overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-inter font-medium uppercase tracking-wider text-white" style={{ backgroundColor: lineas.find(l => l.name === prod.linea)?.color || '#6B4C3B' }}>{prod.linea}</span>
                </Link>
                <div className="p-5">
                  <Link to={`./producto/${prod.slug}`}><h3 className="font-playfair text-lg font-medium text-cafe hover:text-turquesa">{prod.name}</h3></Link>
                  <p className="text-sm text-grisCalido mt-1">{prod.weight} - Artesanal</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-inter text-lg font-semibold text-cafe">${prod.price.toLocaleString('es-CL')}</span>
                    <button onClick={() => addItem(prod)} className="px-4 py-2 border border-turquesa text-turquesa rounded-full text-sm font-medium hover:bg-turquesa hover:text-white transition-all">Agregar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" ref={el => { sectionsRef.current[1] = el; }} className="bg-crema">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-auto lg:min-h-[600px]">
            <img src="./assets/historia-mejillones.jpg" alt="Atardecer en Mejillones" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex items-center px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
            <div className="max-w-lg">
              <span className="animate-in font-inter text-[13px] font-medium uppercase tracking-[0.15em] text-turquesa">Desde el Corazon del Norte</span>
              <h2 className="animate-in font-playfair text-3xl sm:text-4xl font-semibold text-cafe mt-3 leading-tight">Nacida del Mar y la Resiliencia</h2>
              <p className="animate-in mt-6 text-base text-cafe/80 leading-[1.8]">Kanymar nace desde la experiencia, la resiliencia y el amor por lo natural. En los paisajes de Mejillones, donde el mar y el desierto se encuentran, nuestra marca rescata lo esencial: ingredientes nobles seleccionados cuidadosamente, procesos artesanales que respetan la naturaleza, y bienestar real para la piel.</p>
              <p className="animate-in mt-4 text-base text-cafe/80 leading-[1.8]">Cada producto es elaborado a mano en pequenos lotes, usando aceites esenciales puros, manteca de karite, aceite de oliva y coco - todo sin quimicos agresivos ni tested en animales.</p>
              <Link to="./catalogo" className="animate-in inline-flex items-center gap-2 mt-8 px-7 py-3 border border-cafe text-cafe rounded-full font-inter text-sm font-medium hover:bg-cafe hover:text-blancoRoto transition-all">Conoce Nuestros Productos <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={el => { sectionsRef.current[2] = el; }} className="py-20 lg:py-28 bg-blancoRoto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-in">
            <span className="font-inter text-[13px] font-medium uppercase tracking-[0.15em] text-turquesa">Naturaleza Pura</span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-cafe mt-2">Lo Que Toca Tu Piel</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ingredientes.map((ing, i) => (
              <div key={ing.name} className={`animate-in group relative overflow-hidden rounded-lg ${ing.size === 'large' ? 'col-span-2' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`relative ${ing.size === 'large' ? 'h-64 md:h-80' : 'h-52 md:h-64'}`}>
                  <img src={ing.image} alt={ing.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cafe/70 via-cafe/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5"><h3 className="font-playfair text-lg sm:text-xl font-medium text-blancoRoto">{ing.name}</h3></div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {[{icon:Leaf, t:'100% Natural'}, {icon:Droplets, t:'Sin Quimicos'}, {icon:Wind, t:'Artesanal'}, {icon:Heart, t:'Cruelty Free'}].map((f, i) => (
              <div key={i} className="animate-in flex flex-col items-center text-center" style={{animationDelay:`${i*0.1}s`}}><f.icon size={28} className="text-turquesa mb-3" /><span className="font-inter text-sm font-medium text-cafe">{f.t}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section ref={el => { sectionsRef.current[3] = el; }} className="py-20 lg:py-28 bg-turquesa/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-in">
            <span className="font-inter text-[13px] font-medium uppercase tracking-[0.15em] text-turquesa">Testimonios</span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-semibold text-cafe mt-2">Lo Que Dicen Nuestras Clientas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t, i) => (
              <div key={i} className="animate-in bg-white rounded-lg p-8 shadow-sm" style={{animationDelay:`${i*0.15}s`}}>
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#C9A96E" stroke="#C9A96E" />)}</div>
                <p className="font-cormorant italic text-lg text-cafe/80 leading-relaxed mb-6">"{t.quote}"</p>
                <div><p className="font-inter text-sm font-medium text-cafe">{t.author}</p><p className="text-xs text-grisCalido">{t.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={el => { sectionsRef.current[4] = el; }} className="py-20 lg:py-28 bg-crema">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="animate-in">
              <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-cafe">Unete a la Familia Kanymar</h3>
              <p className="mt-4 text-base text-cafe/70 leading-relaxed">Recibe consejos de skincare natural, lanzamientos exclusivos y un 10% de descuento en tu primera compra.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="tu@email.com" className="flex-1 px-4 py-3 bg-transparent border-b-2 border-cafe/30 focus:border-turquesa outline-none text-cafe placeholder:text-grisCalido" />
                <button className="px-6 py-3 bg-turquesa text-white rounded-full font-inter text-sm font-medium hover:bg-turquesa/90 shrink-0">Suscribirme</button>
              </div>
            </div>
            <div className="animate-in lg:pl-10">
              <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-cafe">Hablamos?</h3>
              <p className="mt-4 text-base text-cafe/70 leading-relaxed">Estamos en Mejillones, Chile. Escribenos por WhatsApp o Instagram.</p>
              <div className="mt-8 space-y-4">
                <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cafe hover:text-romero"><Phone size={18} /><span className="text-sm">+56 9 XXXX XXXX</span></a>
                <a href="https://instagram.com/kanymar.cl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cafe hover:text-turquesa"><Instagram size={18} /><span className="text-sm">@kanymar.cl</span></a>
                <div className="flex items-center gap-3 text-cafe"><Mail size={18} /><span className="text-sm">hola@kanymar.cl</span></div>
              </div>
              <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 px-7 py-3 border border-romero text-romero rounded-full font-inter text-sm font-medium hover:bg-romero hover:text-white transition-all">Ir a WhatsApp <ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
