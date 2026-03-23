import { Phone, Mail, Instagram, Facebook, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";
import { config } from "@/lib/config";

const links = {
  Propiedades: ["Villas", "Apartamentos", "Fincas", "Áticos", "Obra Nueva"],
  Servicios: ["Compra", "Alquiler", "Valoración", "Gestión de Alquiler", "Inversión"],
  Empresa: ["Sobre Nosotros", "Nuestro Equipo", "Noticias", "Contacto"],
};

export function Footer() {
  return (
    <footer className="bg-[#1A2240] text-[#F0F4F8]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Image src={config.logo} alt={config.agencia} width={160} height={56} className="h-14 w-auto" />
            </div>
            <p className="text-[#F0F4F8]/50 text-sm leading-relaxed max-w-xs mb-6">
              Tu inmobiliaria de confianza en la Comunitat Valenciana. Lujo, transparencia y
              resultados desde 2009.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a href={`tel:${config.telefonoHref}`} className="flex items-center gap-2.5 text-[#F0F4F8]/70 hover:text-[#C9A84C] text-sm transition-colors">
                <Phone size={14} className="text-[#C9A84C]" />
                {config.telefono}
              </a>
              <a href={`mailto:${config.email}`} className="flex items-center gap-2.5 text-[#F0F4F8]/70 hover:text-[#C9A84C] text-sm transition-colors">
                <Mail size={14} className="text-[#C9A84C]" />
                {config.email}
              </a>
              <div className="flex items-center gap-2.5 text-[#F0F4F8]/70 text-sm">
                <MapPin size={14} className="text-[#C9A84C] shrink-0" />
                {config.direccion}
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
                      className="text-[#F0F4F8]/60 hover:text-[#F0F4F8] text-sm transition-colors"
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
      <div className="border-t border-[#131929]" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#F0F4F8]/40 text-xs">
          © {config.anio} {config.agencia}. Todos los derechos reservados.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {([config.redes.instagram, config.redes.facebook, config.redes.linkedin] as const).map((href, i) => {
            const Icon = [Instagram, Facebook, Linkedin][i];
            return (
            <a
              key={i}
              href={href}
              className="w-8 h-8 border border-[#131929] flex items-center justify-center text-[#F0F4F8]/50 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200"
              aria-label="Red social"
            >
              <Icon size={14} />
            </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-[#F0F4F8]/40 text-xs">
          <a href="#" className="hover:text-[#F0F4F8] transition-colors">Privacidad</a>
          <a href="#" className="hover:text-[#F0F4F8] transition-colors">Aviso Legal</a>
          <a href="#" className="hover:text-[#F0F4F8] transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
