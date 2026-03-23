"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { config } from "@/lib/config";

// ─── Datos oficiales por comunidad autónoma ───────────────────────────────────
// ITP: Impuesto Transmisiones Patrimoniales (2ª mano)
// AJD: Actos Jurídicos Documentados sobre escritura compraventa (obra nueva)
// Fuente: Agencia Tributaria / BOE / webs oficiales CCAA (2024)
const COMUNIDADES: Record<string, { label: string; itp: number; ajd: number }> = {
  andalucia:         { label: "Andalucía",          itp: 7.0,  ajd: 1.2  },
  aragon:            { label: "Aragón",              itp: 8.0,  ajd: 1.5  },
  asturias:          { label: "Asturias",            itp: 8.0,  ajd: 1.2  },
  baleares:          { label: "Baleares",            itp: 8.0,  ajd: 1.2  },
  canarias:          { label: "Canarias",            itp: 6.5,  ajd: 0.75 },
  cantabria:         { label: "Cantabria",           itp: 10.0, ajd: 1.5  },
  "castilla-mancha": { label: "Castilla-La Mancha",  itp: 9.0,  ajd: 1.5  },
  "castilla-leon":   { label: "Castilla y León",     itp: 8.0,  ajd: 1.5  },
  cataluna:          { label: "Cataluña",            itp: 10.0, ajd: 1.5  },
  extremadura:       { label: "Extremadura",         itp: 8.0,  ajd: 1.5  },
  galicia:           { label: "Galicia",             itp: 10.0, ajd: 1.5  },
  rioja:             { label: "La Rioja",            itp: 7.0,  ajd: 1.0  },
  madrid:            { label: "Madrid",              itp: 6.0,  ajd: 0.75 },
  murcia:            { label: "Murcia",              itp: 8.0,  ajd: 1.5  },
  navarra:           { label: "Navarra",             itp: 6.0,  ajd: 0.5  },
  "pais-vasco":      { label: "País Vasco",          itp: 4.0,  ajd: 0.0  },
  valencia:          { label: "Comunitat Valenciana", itp: 10.0, ajd: 1.5  },
};

// Tipos de interés orientativos mercado español (enero 2025)
const RATES = {
  fijo:     { label: "Fijo",     default: 3.0,  hint: "Media mercado ~2.8–3.5 % TAE" },
  variable: { label: "Variable", default: 2.75, hint: "Euríbor 12m (~2.4 %) + diferencial ~0.5 %" },
  mixto:    { label: "Mixto",    default: 2.5,  hint: "Tipo fijo primeros 10 años, luego variable" },
};

// Gastos fijos aproximados
const NOTARIA_REGISTRO_PORCENT = 0.8;  // ~0.8 % del precio
const GESTORIA_FIJA = 400;             // € fijos
const TASACION_FIJA = 450;             // € fijos

function formatEur(n: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function calcCuotaMensual(principal: number, tasaAnual: number, años: number) {
  if (tasaAnual === 0) return principal / (años * 12);
  const r = tasaAnual / 100 / 12;
  const n = años * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

interface Props {
  precioPropiedadInicial?: number;
}

export function MortgageCalculator({ precioPropiedadInicial }: Props) {
  const [precio, setPrecio] = useState(precioPropiedadInicial ?? 200000);
  const [entradaPct, setEntradaPct] = useState(20);
  const [anos, setAnos] = useState(25);
  const [tipoInteres, setTipoInteres] = useState<keyof typeof RATES>("fijo");
  const [tasa, setTasa] = useState(RATES.fijo.default);
  const [comunidad, setComunidad] = useState("valencia");
  const [esObra, setEsObra] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const entrada = (precio * entradaPct) / 100;
  const prestamo = precio - entrada;

  const { itp, ajd } = COMUNIDADES[comunidad];

  // Impuestos
  const impuestos = esObra
    ? { nombre: "IVA (obra nueva)", pct: 10, importe: precio * 0.1 }
    : { nombre: `ITP (${itp} %)`, pct: itp, importe: precio * (itp / 100) };

  const ajdImporte = esObra ? precio * (ajd / 100) : 0;
  const notariaRegistro = precio * (NOTARIA_REGISTRO_PORCENT / 100);
  const totalGastos = impuestos.importe + ajdImporte + notariaRegistro + GESTORIA_FIJA + TASACION_FIJA;
  const totalDesembolso = entrada + totalGastos;
  const totalCompra = precio + totalGastos;

  const cuotaMensual = calcCuotaMensual(prestamo, tasa, anos);
  const totalPagado = cuotaMensual * anos * 12;
  const totalIntereses = totalPagado - prestamo;

  const handleTipoChange = (t: keyof typeof RATES) => {
    setTipoInteres(t);
    setTasa(RATES[t].default);
  };

  return (
    <div className="bg-white border border-[#C8D4E0] p-6">
      <h2 className="text-[#1A2240] text-lg font-medium mb-1 flex items-center gap-2">
        <span className="w-8 h-[2px] bg-[#FFFFFF]" />
        Calculadora de hipoteca
      </h2>
      <p className="text-xs text-[#6B7280] mb-6 ml-10">Estimación orientativa. Consulta con tu banco.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Precio */}
        <div>
          <label className="block text-xs font-medium text-[#1A2240] mb-1">Precio de compra</label>
          <div className="relative">
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="w-full border border-[#C8D4E0] px-3 py-2 text-sm pr-8 focus:outline-none focus:border-[#1A2240]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm">€</span>
          </div>
        </div>

        {/* Comunidad */}
        <div>
          <label className="block text-xs font-medium text-[#1A2240] mb-1">Comunidad autónoma</label>
          <select
            value={comunidad}
            onChange={(e) => setComunidad(e.target.value)}
            className="w-full border border-[#C8D4E0] px-3 py-2 text-sm focus:outline-none focus:border-[#1A2240] bg-white"
          >
            {Object.entries(COMUNIDADES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Entrada */}
        <div className="sm:col-span-2">
          <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-[#1A2240]">Entrada</label>
            <span className="text-xs text-[#6B7280]">{entradaPct} % — {formatEur(entrada)}</span>
          </div>
          <input
            type="range"
            min={5} max={60} step={1}
            value={entradaPct}
            onChange={(e) => setEntradaPct(Number(e.target.value))}
            className="w-full accent-[#FFFFFF]"
          />
          <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-0.5">
            <span>5 %</span>
            <span className="text-[#FFFFFF] font-medium">Mínimo recomendado: 20 %</span>
            <span>60 %</span>
          </div>
        </div>

        {/* Plazo */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-[#1A2240]">Plazo</label>
            <span className="text-xs text-[#6B7280]">{anos} años</span>
          </div>
          <input
            type="range"
            min={5} max={30} step={5}
            value={anos}
            onChange={(e) => setAnos(Number(e.target.value))}
            className="w-full accent-[#FFFFFF]"
          />
          <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-0.5">
            <span>5</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
          </div>
        </div>

        {/* Tipo interés */}
        <div>
          <label className="block text-xs font-medium text-[#1A2240] mb-1">Tipo de interés</label>
          <div className="flex gap-1 mb-2">
            {(Object.keys(RATES) as (keyof typeof RATES)[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTipoChange(t)}
                className={`flex-1 py-1.5 text-xs border transition-colors ${
                  tipoInteres === t
                    ? "bg-[#1A2240] text-white border-[#1A2240]"
                    : "border-[#C8D4E0] text-[#1A2240] hover:border-[#1A2240]"
                }`}
              >
                {RATES[t].label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step={0.05}
              min={0.5}
              max={10}
              value={tasa}
              onChange={(e) => setTasa(Number(e.target.value))}
              className="w-24 border border-[#C8D4E0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#1A2240]"
            />
            <span className="text-sm text-[#6B7280]">% TIN</span>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-1">{RATES[tipoInteres].hint}</p>
        </div>

        {/* Tipo inmueble */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#1A2240] mb-2">Tipo de inmueble</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEsObra(false)}
              className={`px-4 py-1.5 text-xs border transition-colors ${
                !esObra ? "bg-[#1A2240] text-white border-[#1A2240]" : "border-[#C8D4E0] text-[#1A2240] hover:border-[#1A2240]"
              }`}
            >
              Segunda mano (ITP {itp} %)
            </button>
            <button
              type="button"
              onClick={() => setEsObra(true)}
              className={`px-4 py-1.5 text-xs border transition-colors ${
                esObra ? "bg-[#1A2240] text-white border-[#1A2240]" : "border-[#C8D4E0] text-[#1A2240] hover:border-[#1A2240]"
              }`}
            >
              Obra nueva (IVA 10 % + AJD {ajd} %)
            </button>
          </div>
        </div>
      </div>

      {/* Resultado principal */}
      <div className="mt-6 bg-[#1A2240] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-[#FFFFFF] text-xs tracking-widest uppercase mb-1">Cuota mensual estimada</p>
          <p className="text-[#F0F4F8] text-4xl font-semibold">{formatEur(cuotaMensual)}<span className="text-lg font-light">/mes</span></p>
          <p className="text-[#F0F4F8]/50 text-xs mt-1">Préstamo {formatEur(prestamo)} · {anos} años · {tasa} % TIN</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-[#F0F4F8]/60 text-xs mb-1">Total intereses</p>
          <p className="text-[#FFFFFF] text-xl font-semibold">{formatEur(totalIntereses)}</p>
          <p className="text-[#F0F4F8]/60 text-xs mt-1">Total devuelto: {formatEur(totalPagado)}</p>
        </div>
      </div>

      {/* Desglose gastos */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-sm text-[#1A2240] font-medium py-3 border-b border-[#C8D4E0] hover:text-[#FFFFFF] transition-colors"
        >
          <span>Desglose de gastos e impuestos</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <div className="pt-4 space-y-2 text-sm">
            <Row label="Precio de la vivienda" value={formatEur(precio)} bold />
            <Row label={`Entrada (${entradaPct} %)`} value={`− ${formatEur(entrada)}`} />
            <Row label="Importe financiado" value={formatEur(prestamo)} />

            <div className="border-t border-[#C8D4E0] pt-3 mt-3">
              <p className="text-xs font-semibold text-[#1A2240] uppercase tracking-wide mb-2">Impuestos y gastos</p>
              <Row label={impuestos.nombre} value={formatEur(impuestos.importe)} sub />
              {esObra && ajd > 0 && (
                <Row label={`AJD escritura compraventa (${ajd} %)`} value={formatEur(ajdImporte)} sub />
              )}
              <Row label={`Notaría y registro (~${NOTARIA_REGISTRO_PORCENT} %)`} value={formatEur(notariaRegistro)} sub />
              <Row label="Gestoría (estimado)" value={formatEur(GESTORIA_FIJA)} sub />
              <Row label="Tasación bancaria (estimado)" value={formatEur(TASACION_FIJA)} sub />
            </div>

            <div className="border-t border-[#C8D4E0] pt-3 mt-3 space-y-2">
              <Row label="Total gastos e impuestos" value={formatEur(totalGastos)} />
              <Row label={`Desembolso inicial (entrada + gastos)`} value={formatEur(totalDesembolso)} bold accent />
              <Row label="Coste total de la operación" value={formatEur(totalCompra + totalIntereses)} bold />
            </div>

            <div className="mt-4 flex gap-2 p-3 bg-[#F0F4F8] text-xs text-[#6B7280]">
              <Info size={14} className="shrink-0 text-[#FFFFFF] mt-0.5" />
              <p>
                Cálculo orientativo. Los tipos impositivos son los generales vigentes en 2024 para cada comunidad autónoma.
                Pueden existir reducciones para jóvenes, familia numerosa, VPO u otras bonificaciones autonómicas.
                El AJD sobre la escritura de hipoteca corre a cargo del banco desde noviembre de 2018 (Ley 5/2019).
              </p>
            </div>
          </div>
        )}
      {/* CTA financiación */}
      <div className="mt-5 bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-[#1B2B4B] text-sm flex-1">
          <span className="font-semibold">¿Necesitas financiación?</span> Te ayudamos a conseguir la mejor hipoteca para tu situación.
        </p>
        <a
          href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hola, he calculado una hipoteca de ${formatEur(cuotaMensual)}/mes y me gustaría hablar sobre opciones de financiación.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 hover:bg-[#20b558] transition-colors whitespace-nowrap"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Hablar sobre hipoteca
        </a>
      </div>
    </div>
  );
}

function Row({
  label, value, bold, sub, accent,
}: {
  label: string; value: string; bold?: boolean; sub?: boolean; accent?: boolean;
}) {
  return (
    <div className={`flex justify-between ${sub ? "text-[#6B7280]" : "text-[#1A2240]"}`}>
      <span className={`${sub ? "pl-3 text-xs" : ""} ${bold ? "font-semibold" : ""}`}>{label}</span>
      <span className={`${bold ? "font-semibold" : ""} ${accent ? "text-[#FFFFFF]" : ""}`}>{value}</span>
    </div>
  );
}
