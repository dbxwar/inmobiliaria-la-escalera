import { ValuationModal } from "@/components/valuation-modal";
import { config } from "@/lib/config";

export function CtaBanner() {
  return (
    <section
      id="contacto"
      className="relative bg-[#E4ECF4] py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative gold bar */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[#2E6DA4]" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #1A2240 0px, #1A2240 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text */}
        <div className="lg:max-w-2xl text-center lg:text-left">
          <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-4">
            Vende con nosotros
          </p>
          <h2 className="text-[#1A2240] text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-balance mb-5">
            ¿Quieres vender{" "}
            <span className="font-semibold">tu propiedad?</span>
          </h2>
          <p className="text-[#1A2240]/60 text-base sm:text-lg leading-relaxed max-w-xl">
            Ponemos tu inmueble en el mercado con la estrategia adecuada y lo
            vendemos al mejor precio. Sin complicaciones, con total transparencia.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <ValuationModal />
          <a
            href={`tel:${config.telefonoHref}`}
            className="inline-flex items-center justify-center px-8 py-4 border border-[#1A2240] text-[#1A2240] text-sm tracking-widest uppercase font-medium hover:bg-[#1A2240] hover:text-[#F0F4F8] transition-all duration-200"
          >
            Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
