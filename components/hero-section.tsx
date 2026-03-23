"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const locations = ["Toda la Comunitat", "Valencia Ciudad", "Alicante", "Benidorm", "Jávea", "Dénia", "Gandía", "Castellón", "Torrevieja"];
const propertyTypes = ["Todos", "Villa", "Apartamento", "Finca", "Ático", "Casa Adosada", "Local Comercial"];
const priceRanges = ["Cualquier precio", "Hasta 200.000€", "200.000€ – 500.000€", "500.000€ – 1.000.000€", "Más de 1.000.000€"];

export function HeroSection() {
  const [mode, setMode] = useState<"comprar" | "alquilar">("comprar");
  const [location, setLocation] = useState(locations[0]);
  const [propType, setPropType] = useState(propertyTypes[0]);
  const [price, setPrice] = useState(priceRanges[0]);

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/hero-villa.jpg"
        alt="Luxury Mediterranean villa"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1A2240]/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-4">
          Comunitat Valenciana
        </p>

        {/* Headline */}
        <h1 className="text-[#F0F4F8] text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-balance mb-4">
          Encuentra tu propiedad
          <br />
          <span className="text-[#2E6DA4] font-semibold">ideal en el Mediterráneo</span>
        </h1>

        <p className="text-[#F0F4F8]/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Más de 15 años ayudando a familias e inversores a encontrar la vivienda perfecta en la costa y el interior valenciano.
        </p>

        {/* Search Card */}
        <div className="bg-[#F0F4F8] shadow-2xl p-5 sm:p-6 max-w-4xl mx-auto">
          {/* Buy / Rent Toggle */}
          <div className="flex gap-0 mb-5 border border-[#C8D4E0] w-fit">
            {(["comprar", "alquilar"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 text-sm tracking-wider uppercase font-medium transition-all duration-200 ${
                  mode === m
                    ? "bg-[#1A2240] text-[#F0F4F8]"
                    : "bg-transparent text-[#1A2240] hover:bg-[#E4ECF4]"
                }`}
              >
                {m === "comprar" ? "Comprar" : "Alquilar"}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <SelectField label="Localización" value={location} options={locations} onChange={setLocation} />
            <SelectField label="Tipo de propiedad" value={propType} options={propertyTypes} onChange={setPropType} />
            <SelectField label="Rango de precio" value={price} options={priceRanges} onChange={setPrice} />
          </div>

          {/* Search Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-[#2E6DA4] hover:bg-[#b8943d] text-[#1A2240] font-semibold tracking-widest uppercase text-sm py-3.5 transition-colors duration-200">
            <Search size={16} />
            Buscar propiedades
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[#F0F4F8] text-xs tracking-widest uppercase">Explorar</span>
        <div className="w-px h-10 bg-[#2E6DA4] animate-pulse" />
      </div>
    </section>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] text-[#1A2240]/50 tracking-widest uppercase mb-1 pl-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-[#E4ECF4] border border-[#C8D4E0] text-[#1A2240] text-sm py-2.5 pl-3 pr-8 focus:outline-none focus:border-[#2E6DA4] transition-colors"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1A2240]/50 pointer-events-none" />
      </div>
    </div>
  );
}
