import { Award, Heart, Briefcase } from "lucide-react";

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
    <section id="nosotros" className="bg-[#1A2240] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FFFFFF] tracking-[0.4em] uppercase text-xs font-medium mb-4">
            Nuestra propuesta de valor
          </p>
          <h2 className="text-[#F0F4F8] text-3xl sm:text-4xl font-light leading-tight text-balance">
            ¿Por qué elegirnos?
          </h2>
          <div className="mt-5 w-12 h-px bg-[#FFFFFF] mx-auto" />
        </div>

        {/* Feature blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#131929]">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#1A2240] hover:bg-[#131929] transition-colors duration-300 p-10 lg:p-12 flex flex-col items-start group"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 border border-[#FFFFFF]/40 flex items-center justify-center mb-8 group-hover:border-[#FFFFFF] group-hover:bg-[#FFFFFF]/10 transition-all duration-300">
                <Icon size={24} className="text-[#FFFFFF]" />
              </div>

              <h3 className="text-[#F0F4F8] text-xl font-medium mb-4">{title}</h3>
              <p className="text-[#F0F4F8]/60 text-sm leading-relaxed">{description}</p>

              {/* Decorative line */}
              <div className="mt-8 w-8 h-px bg-[#FFFFFF] group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "+500", label: "Propiedades vendidas" },
            { value: "15+", label: "Años de experiencia" },
            { value: "98%", label: "Clientes satisfechos" },
            { value: "3", label: "Oficinas en la Comunitat" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-[#FFFFFF] text-3xl sm:text-4xl font-semibold mb-2">{value}</div>
              <div className="text-[#F0F4F8]/50 text-xs tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
