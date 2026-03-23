import { Award, Heart, Briefcase } from "lucide-react";
import { config } from "@/lib/config";

const features = [
  {
    icon: Award,
    title: "Experiencia local",
    description:
      "Más de 15 años en el mercado inmobiliario valenciano. Conocemos cada rincón de la costa y el interior para ofrecerte el asesoramiento más preciso y honesto.",
  },
  {
    icon: Heart,
    title: "Atención personalizada",
    description:
      "Cada cliente es único. Te acompañamos en todo el proceso, desde la primera visita hasta la firma notarial, con un trato cercano y completamente a medida.",
  },
  {
    icon: Briefcase,
    title: "Gestión integral",
    description:
      "Gestionamos trámites legales, fiscales e hipotecarios. Nos coordinamos con notarios, abogados y bancos para que tú solo tengas que preocuparte de disfrutar.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="nosotros" className="bg-[#F0F4F8] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] tracking-[0.4em] uppercase text-xs font-medium mb-4">
            Nuestra propuesta de valor
          </p>
          <h2 className="text-[#1A2240] text-3xl sm:text-4xl font-light leading-tight text-balance">
            ¿Por qué elegirnos?
          </h2>
          <div className="mt-5 w-12 h-px bg-[#C9A84C] mx-auto" />
        </div>

        {/* Feature blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C8D4E0]">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#F0F4F8] hover:bg-white transition-colors duration-300 p-10 lg:p-12 flex flex-col items-start group"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 border border-[#C9A84C]/40 flex items-center justify-center mb-8 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-all duration-300">
                <Icon size={24} className="text-[#C9A84C]" />
              </div>

              <h3 className="text-[#1A2240] text-xl font-medium mb-4">{title}</h3>
              <p className="text-[#1A2240]/60 text-sm leading-relaxed">{description}</p>

              {/* Decorative line */}
              <div className="mt-8 w-8 h-px bg-[#C9A84C] group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "+500", label: "Propiedades vendidas" },
            { value: "15+", label: "Años de experiencia" },
            { value: "98%", label: "Clientes satisfechos" },
            { value: "3", label: "Oficinas en la provincia" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-[#C9A84C] text-3xl sm:text-4xl font-semibold mb-2">{value}</div>
              <div className="text-[#1A2240]/50 text-xs tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent("Hola, me gustaría hablar con un asesor sobre una propiedad.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#1A2240] px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Hablar con un asesor
          </a>
        </div>
      </div>
    </section>
  );
}
