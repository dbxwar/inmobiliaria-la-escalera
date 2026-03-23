"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const propertyTypes = ["Todos", "piso", "chalet", "casa", "atico", "local", "terreno"];
const propertyTypeLabels: Record<string, string> = {
  Todos: "Todos", piso: "Piso", chalet: "Chalet", casa: "Casa",
  atico: "Ático", local: "Local", terreno: "Terreno",
};

export function HeroSection() {
  const router = useRouter();
  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [propType, setPropType] = useState("Todos");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("operacion", mode === "comprar" ? "venta" : "alquiler");
    if (propType !== "Todos") params.set("tipo", propType);
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/hero-villa.jpg"
        alt="Luxury Mediterranean villa"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B2B4B]/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <p className="text-[#C9A84C] tracking-[0.4em] uppercase text-xs font-medium mb-4">
          Comunitat Valenciana
        </p>

        {/* Headline */}
        <h1 className="text-[#F5F0E8] text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-balance mb-4">
          Encuentra tu propiedad
          <br />
          <span className="text-[#C9A84C] font-semibold">ideal en el Mediterráneo</span>
        </h1>

        <p className="text-[#F5F0E8]/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Más de 15 años ayudando a familias e inversores a encontrar la vivienda perfecta en la costa y el interior valenciano.
        </p>

        {/* Search Card */}
        <div className="bg-[#F5F0E8] shadow-2xl p-5 sm:p-6 max-w-4xl mx-auto">
          {/* Buy / Rent Toggle */}
          <div className="flex gap-0 mb-5 border border-[#DDD8CE] w-fit">
            {(["comprar", "alquilar"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 text-sm tracking-wider uppercase font-medium transition-all duration-200 ${
                  mode === m
                    ? "bg-[#1B2B4B] text-[#F5F0E8]"
                    : "bg-transparent text-[#1B2B4B] hover:bg-[#EDE8DD]"
                }`}
              >
                {m === "comprar" ? "Comprar" : "Alquilar"}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <SelectField
              label="Tipo de propiedad"
              value={propType}
              options={propertyTypes}
              onChange={setPropType}
              renderLabel={(v) => propertyTypeLabels[v] ?? v}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] text-[#1B2B4B] font-semibold tracking-widest uppercase text-sm py-3.5 transition-colors duration-200"
          >
            <Search size={16} />
            Buscar propiedades
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[#F5F0E8] text-xs tracking-widest uppercase">Explorar</span>
        <div className="w-px h-10 bg-[#C9A84C] animate-pulse" />
      </div>
    </section>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  renderLabel,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  renderLabel?: (v: string) => string;
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] text-[#1B2B4B]/50 tracking-widest uppercase mb-1 pl-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-[#EDE8DD] border border-[#DDD8CE] text-[#1B2B4B] text-sm py-2.5 pl-3 pr-8 focus:outline-none focus:border-[#C9A84C] transition-colors"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {renderLabel ? renderLabel(o) : o}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1B2B4B]/50 pointer-events-none" />
      </div>
    </div>
  );
}
