import { MapPin, Phone, Instagram, Mail } from 'lucide-react';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-crema pt-[72px]">
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center bg-cafe">
        <div className="text-center px-4">
          <h1 className="font-playfair text-4xl sm:text-5xl font-semibold text-blancoRoto">Contacto</h1>
          <p className="mt-3 text-lg text-blancoRoto/70">Estamos aqui para ayudarte</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-cafe mb-2">Escribenos</h2>
              <p className="text-cafe/70 mb-8">Completa el formulario y te responderemos por WhatsApp.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const f = e.target as HTMLFormElement;
                const fd = new FormData(f);
                const msg = `Hola! Mi nombre es ${fd.get('nombre')}.\nEmail: ${fd.get('email')}\nTelefono: ${fd.get('telefono')}\n\n${fd.get('mensaje')}`;
                window.open(`https://wa.me/56900000000?text=${encodeURIComponent(msg)}`, '_blank');
              }} className="space-y-5">
                <div><label className="block text-sm font-medium text-cafe mb-1.5">Nombre</label><input name="nombre" type="text" required className="w-full px-4 py-3 bg-white border border-arena/30 rounded-lg focus:border-turquesa outline-none" placeholder="Tu nombre" /></div>
                <div><label className="block text-sm font-medium text-cafe mb-1.5">Email</label><input name="email" type="email" required className="w-full px-4 py-3 bg-white border border-arena/30 rounded-lg focus:border-turquesa outline-none" placeholder="tu@email.com" /></div>
                <div><label className="block text-sm font-medium text-cafe mb-1.5">Telefono</label><input name="telefono" type="tel" className="w-full px-4 py-3 bg-white border border-arena/30 rounded-lg focus:border-turquesa outline-none" placeholder="+56 9 XXXX XXXX" /></div>
                <div><label className="block text-sm font-medium text-cafe mb-1.5">Mensaje</label><textarea name="mensaje" required rows={4} className="w-full px-4 py-3 bg-white border border-arena/30 rounded-lg focus:border-turquesa outline-none resize-none" placeholder="En que podemos ayudarte?" /></div>
                <button type="submit" className="w-full py-3.5 bg-turquesa text-white rounded-full font-inter font-medium hover:bg-turquesa/90">Enviar Mensaje por WhatsApp</button>
              </form>
            </div>
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-semibold text-cafe mb-6">Encuentranos</h2>
              <div className="rounded-xl overflow-hidden shadow-sm mb-8">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d142840.7607368158!2d-70.4600!3d-23.1000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96af9652cf3f13cb%3A0x5a6c0c0c0c0c0c0c!2sMejillones%2C%20Antofagasta%2C%20Chile!5e0!3m2!1ses!2s!4v1700000000000!5m2!1ses!2s" width="100%" height="280" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-turquesa/10 flex items-center justify-center"><MapPin size={18} className="text-turquesa" /></div><div><p className="font-medium text-cafe">Direccion</p><p className="text-sm text-grisCalido">Mejillones, Region de Antofagasta, Chile</p></div></div>
                <a href="https://wa.me/56900000000" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group"><div className="w-10 h-10 rounded-full bg-romero/10 flex items-center justify-center"><Phone size={18} className="text-romero" /></div><div><p className="font-medium text-cafe group-hover:text-romero">WhatsApp</p><p className="text-sm text-grisCalido">+56 9 XXXX XXXX</p></div></a>
                <a href="https://instagram.com/kanymar.cl" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group"><div className="w-10 h-10 rounded-full bg-lavanda/10 flex items-center justify-center"><Instagram size={18} className="text-lavanda" /></div><div><p className="font-medium text-cafe group-hover:text-lavanda">Instagram</p><p className="text-sm text-grisCalido">@kanymar.cl</p></div></a>
                <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-algas/10 flex items-center justify-center"><Mail size={18} className="text-algas" /></div><div><p className="font-medium text-cafe">Email</p><p className="text-sm text-grisCalido">hola@kanymar.cl</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
