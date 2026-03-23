export function CtaBanner() {
  return (
    <section
      id="contacto"
      className="relative bg-[#EDE8DD] py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative gold bar */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[#C9A84C]" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #1B2B4B 0px, #1B2B4B 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Text */}
        <div className="lg:max-w-2xl text-center lg:text-left">
          <p className="text-[#C9A84C] tracking-[0.4em] uppercase text-xs font-medium mb-4">
            Vende con nosotros
          </p>
          <h2 className="text-[#1B2B4B] text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-balance mb-5">
            ¿Quieres vender{" "}
            <span className="font-semibold">tu propiedad?</span>
          </h2>
          <p className="text-[#1B2B4B]/60 text-base sm:text-lg leading-relaxed max-w-xl">
            Ponemos tu inmueble en el mercado con la estrategia adecuada y lo
            vendemos al mejor precio. Sin complicaciones, con total transparencia.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1B2B4B] text-[#F5F0E8] text-sm tracking-widest uppercase font-medium hover:bg-[#243656] transition-colors duration-200"
          >
            Solicitar valoración gratuita
          </a>
          <a
            href="tel:+34960000000"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#1B2B4B] text-[#1B2B4B] text-sm tracking-widest uppercase font-medium hover:bg-[#1B2B4B] hover:text-[#F5F0E8] transition-all duration-200"
          >
            Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
