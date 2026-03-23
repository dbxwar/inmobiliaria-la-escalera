import { NavbarInner } from "@/components/navbar-inner";
import { Footer } from "@/components/footer";
import { RentalContactModal } from "@/components/rental-contact-modal";
import { config } from "@/lib/config";
import { Search, FileText, CreditCard, Wrench, Shield, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Gestión de Alquiler | ${config.agencia}`,
  description:
    "Alquila tu propiedad sin preocupaciones. Nos encargamos de todo: búsqueda de inquilinos, contratos, cobros e incidencias.",
};

const services = [
  {
    icon: Search,
    title: "Búsqueda de inquilinos",
    description:
      "Publicamos tu inmueble, filtramos candidatos y realizamos el estudio de solvencia para encontrar al inquilino ideal.",
  },
  {
    icon: FileText,
    title: "Contrato y gestión legal",
    description:
      "Redactamos el contrato de arrendamiento conforme a la LAU vigente y gestionamos el depósito de la fianza.",
  },
  {
    icon: CreditCard,
    title: "Cobro de rentas",
    description:
      "Gestionamos el cobro mensual y te transferimos la renta puntualmente. Control total de pagos e impagos.",
  },
  {
    icon: Wrench,
    title: "Coordinación de incidencias",
    description:
      "Atendemos las llamadas del inquilino y coordinamos con los servicios técnicos necesarios para solucionar cualquier avería.",
  },
  {
    icon: Shield,
    title: "Protección ante impagos",
    description:
      "Ofrecemos asesoramiento y seguimiento en caso de morosidad para proteger tus intereses en todo momento.",
  },
  {
    icon: TrendingUp,
    title: "Informes periódicos",
    description:
      "Recibirás informes regulares del estado de tu inmueble y la situación de los pagos para que estés siempre informado.",
  },
];

const steps = [
  {
    number: "01",
    title: "Visita y valoración",
    description: "Visitamos tu propiedad, la valoramos y te proponemos el precio de alquiler óptimo para el mercado actual.",
  },
  {
    number: "02",
    title: "Captación del inquilino",
    description: "Publicamos el inmueble, organizamos las visitas y seleccionamos el candidato más solvente y adecuado.",
  },
  {
    number: "03",
    title: "Firma del contrato",
    description: "Formalizamos el contrato, gestionamos la fianza y entregamos las llaves con todo en regla.",
  },
  {
    number: "04",
    title: "Gestión continua",
    description: "A partir de aquí nos ocupamos de todo. Tú solo recibes la renta cada mes en tu cuenta.",
  },
];

export default function GestionAlquilerPage() {
  return (
    <main className="min-h-screen bg-[#F0F4F8]">
      <NavbarInner />

      {/* Hero */}
      <section className="bg-[#1A2240] pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-5">
            Servicio para propietarios
          </p>
          <h1 className="text-[#F0F4F8] text-4xl sm:text-5xl lg:text-6xl font-light leading-tight max-w-3xl mb-6">
            Gestión integral{" "}
            <span className="font-semibold">de tu alquiler</span>
          </h1>
          <p className="text-[#F0F4F8]/60 text-lg leading-relaxed max-w-2xl mb-10">
            Nos encargamos de todo el proceso: desde encontrar el inquilino perfecto hasta gestionar cada incidencia del día a día. Tú solo cobras a fin de mes.
          </p>
          <RentalContactModal />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-4">
              Todo incluido
            </p>
            <h2 className="text-[#1A2240] text-3xl sm:text-4xl font-light">
              ¿Qué incluye el servicio?
            </h2>
            <div className="mt-5 w-12 h-px bg-[#2E6DA4] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C8D4E0]">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-[#F0F4F8] hover:bg-white transition-colors duration-300 p-8 lg:p-10 flex flex-col group"
              >
                <div className="w-12 h-12 border border-[#2E6DA4]/40 flex items-center justify-center mb-6 group-hover:border-[#2E6DA4] group-hover:bg-[#2E6DA4]/10 transition-all duration-300">
                  <Icon size={20} className="text-[#2E6DA4]" />
                </div>
                <h3 className="text-[#1A2240] text-lg font-medium mb-3">{title}</h3>
                <p className="text-[#1A2240]/60 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#1A2240] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-4">
              Sin complicaciones
            </p>
            <h2 className="text-[#F0F4F8] text-3xl sm:text-4xl font-light">
              ¿Cómo funciona?
            </h2>
            <div className="mt-5 w-12 h-px bg-[#2E6DA4] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="flex flex-col">
                <div className="text-[#2E6DA4] text-4xl font-semibold mb-4">{number}</div>
                <div className="w-8 h-px bg-[#2E6DA4] mb-5" />
                <h3 className="text-[#F0F4F8] text-lg font-medium mb-3">{title}</h3>
                <p className="text-[#F0F4F8]/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#E4ECF4]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-4">
            Sin compromiso
          </p>
          <h2 className="text-[#1A2240] text-3xl sm:text-4xl font-light leading-tight mb-5">
            ¿Listo para alquilar{" "}
            <span className="font-semibold">sin preocupaciones?</span>
          </h2>
          <p className="text-[#1A2240]/60 text-base leading-relaxed mb-8">
            Contáctanos hoy y te explicamos cómo podemos gestionar tu propiedad. Primera consulta totalmente gratuita.
          </p>
          <RentalContactModal />
        </div>
      </section>

      <Footer />
    </main>
  );
}
