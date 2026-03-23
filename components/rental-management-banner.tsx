import Link from "next/link";
import { KeyRound } from "lucide-react";

export function RentalManagementBanner() {
  return (
    <section className="bg-[#F0F4F8] py-16 lg:py-20 border-t border-[#C8D4E0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex items-start gap-6 lg:max-w-2xl">
          <div className="shrink-0 w-14 h-14 border border-[#FFFFFF]/40 flex items-center justify-center">
            <KeyRound size={24} className="text-[#FFFFFF]" />
          </div>
          <div>
            <p className="text-[#FFFFFF] tracking-[0.4em] uppercase text-xs font-medium mb-2">
              Servicio para propietarios
            </p>
            <h2 className="text-[#1A2240] text-2xl sm:text-3xl font-light leading-tight mb-3">
              ¿Tienes un inmueble y quieres{" "}
              <span className="font-semibold">alquilarlo sin preocupaciones?</span>
            </h2>
            <p className="text-[#1A2240]/60 text-sm sm:text-base leading-relaxed">
              Nos encargamos de todo: inquilinos, contratos, cobros e incidencias. Tú solo cobras a fin de mes.
            </p>
          </div>
        </div>

        <Link
          href="/gestion-alquiler"
          className="shrink-0 inline-flex items-center justify-center px-8 py-4 border border-[#1A2240] text-[#1A2240] text-sm tracking-widest uppercase font-medium hover:bg-[#1A2240] hover:text-[#F0F4F8] transition-all duration-200"
        >
          Saber más
        </Link>
      </div>
    </section>
  );
}
