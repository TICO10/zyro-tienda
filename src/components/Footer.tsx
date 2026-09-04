import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-300 pt-12 pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Columna 1: Contacto e Información */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-wider">CONTACTO</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-neutral-400 shrink-0" />
              <a href="tel:+573000000000" className="hover:text-white transition-colors">
                +57 301 000 0000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-neutral-400 shrink-0" />
              <a href="mailto:soporte@zyrobrand.com" className="hover:text-white transition-colors">
                soporte@zyrobrand.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <span>Colegio Bilingüe Maximino Poitiers, Bogota, Colombia</span>
            </li>
          </ul>
        </div>

        {/* Columna 2: Redes Sociales */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-wider">SÍGUENOS</h3>
          <p className="text-sm text-neutral-400">
            Descubre nuestras últimas colecciones y lanzamientos exclusivos en Instagram.
          </p>
          <a
            href="https://www.instagram.com/zyro_studioscol?igsi=aWZheWcxbXA5d3Ay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg border border-neutral-700 transition-colors text-sm font-medium"
          >
            <InstagramIcon className="w-5 h-5 text-pink-500" />
            @zyro_studioscol
          </a>
        </div>

        {/* Columna 3: Ubicación (Mapa) */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-wider">UBICACIÓN</h3>
          <div className="w-full h-40 rounded-lg overflow-hidden border border-neutral-800">
            <iframe
              title="Ubicación de la tienda"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.105794397421!2d-74.09392162432366!3d4.751648041212342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f84599b54beab%3A0x906419dde3f23d89!2sColegio%20Biling%C3%BCe%20Maximino%20Poitiers!5e0!3m2!1ses-419!2sco!4v1788481738136!5m2!1ses-419!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Derechos de autor */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-neutral-800 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} ZYRO BRAND. Todos los derechos reservados.
      </div>
    </footer>
  );
};