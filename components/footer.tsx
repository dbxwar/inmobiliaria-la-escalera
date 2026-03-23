import { Phone, Mail, Instagram, Facebook, Linkedin, MapPin } from "lucide-react";

const links = {
  Propiedades: ["Villas", "Apartamentos", "Fincas", "Áticos", "Obra Nueva"],
  Servicios: ["Compra", "Alquiler", "Valoración", "Gestión de Alquiler", "Inversión"],
  Empresa: ["Sobre Nosotros", "Nuestro Equipo", "Noticias", "Contacto"],
};

export function Footer() {
  return (
    <footer className="bg-[#1B2B4B] text-[#F5F0E8]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span className="text-[#F5F0E8] font-semibold tracking-[0.25em] uppercase text-base block">
                Valencia
              </span>
              <span className="text-[#C9A84C] font-light tracking-[0.4em] uppercase text-xs block">
                Estates
              </span>
            </div>
            <p className="text-[#F5F0E8]/50 text-sm leading-relaxed max-w-xs mb-6">
              Tu inmobiliaria de confianza en la Comunitat Valenciana. Lujo, transparencia y
              resultados desde 2009.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a href="tel:+34960000000" className="flex items-center gap-2.5 text-[#F5F0E8]/70 hover:text-[#C9A84C] text-sm transition-colors">
                <Phone size={14} className="text-[#C9A84C]" />
                +34 960 000 000
              </a>
              <a href="mailto:info@valenciaestates.es" className="flex items-center gap-2.5 text-[#F5F0E8]/70 hover:text-[#C9A84C] text-sm transition-colors">
                <Mail size={14} className="text-[#C9A84C]" />
                info@valenciaestates.es
              </a>
              <div className="flex items-center gap-2.5 text-[#F5F0E8]/70 text-sm">
                <MapPin size={14} className="text-[#C9A84C] shrink-0" />
                Calle del Mar, 15 — 46001 Valencia
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium mb-5">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#F5F0E8]/60 hover:text-[#F5F0E8] text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#243656]" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#F5F0E8]/40 text-xs">
          © 2025 Valencia Estates. Todos los derechos reservados.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[Instagram, Facebook, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-8 h-8 border border-[#243656] flex items-center justify-center text-[#F5F0E8]/50 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200"
              aria-label="Red social"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[#F5F0E8]/40 text-xs">
          <a href="#" className="hover:text-[#F5F0E8] transition-colors">Privacidad</a>
          <a href="#" className="hover:text-[#F5F0E8] transition-colors">Aviso Legal</a>
          <a href="#" className="hover:text-[#F5F0E8] transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
