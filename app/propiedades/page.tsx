import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { NavbarInner } from "@/components/navbar-inner";
import { Footer } from "@/components/footer";
import { getPropiedadesFiltradas } from "@/lib/actions";
import { Propiedad } from "@/lib/supabase";
import { config } from "@/lib/config";

const tipoLabels: Record<string, string> = {
  piso: "Piso",
  casa: "Casa",
  chalet: "Chalet",
  atico: "Ático",
  local: "Local",
  terreno: "Terreno",
};

const formatPrice = (precio: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(precio);

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ operacion?: string; tipo?: string }>;
}) {
  const { operacion } = await searchParams;
  const title =
    operacion === "venta"
      ? `Propiedades en venta | ${config.agencia}`
      : operacion === "alquiler"
      ? `Propiedades en alquiler | ${config.agencia}`
      : `Todas las propiedades | ${config.agencia}`;
  return { title };
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ operacion?: string; tipo?: string }>;
}) {
  const { operacion, tipo } = await searchParams;
  const propiedades = await getPropiedadesFiltradas(operacion, tipo);

  const heading =
    operacion === "venta"
      ? "Propiedades en venta"
      : operacion === "alquiler"
      ? "Propiedades en alquiler"
      : "Todas las propiedades";

  return (
    <>
      <NavbarInner />
      <main className="pt-20 min-h-screen bg-[#F0F4F8]">
        {/* Header */}
        <div className="bg-[#F0F4F8] py-12 px-6 lg:px-10 border-b border-[#C8D4E0]">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#C9A84C] tracking-[0.4em] uppercase text-xs font-medium mb-3">
              Comunidad Valenciana
            </p>
            <h1 className="text-[#1A2240] text-3xl sm:text-4xl font-light">{heading}</h1>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-[#C8D4E0] bg-white sticky top-20 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">
            <Link
              href="/propiedades"
              className={`px-4 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                !operacion
                  ? "bg-[#1A2240] text-white border-[#1A2240]"
                  : "border-[#C8D4E0] text-[#1A2240] hover:border-[#1A2240]"
              }`}
            >
              Todo
            </Link>
            <Link
              href="/propiedades?operacion=venta"
              className={`px-4 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                operacion === "venta"
                  ? "bg-[#1A2240] text-white border-[#1A2240]"
                  : "border-[#C8D4E0] text-[#1A2240] hover:border-[#1A2240]"
              }`}
            >
              Venta
            </Link>
            <Link
              href="/propiedades?operacion=alquiler"
              className={`px-4 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                operacion === "alquiler"
                  ? "bg-[#1A2240] text-white border-[#1A2240]"
                  : "border-[#C8D4E0] text-[#1A2240] hover:border-[#1A2240]"
              }`}
            >
              Alquiler
            </Link>
            <span className="w-px h-5 bg-[#C8D4E0]" />
            {["piso", "casa", "chalet", "atico", "local", "terreno"].map((t) => (
              <Link
                key={t}
                href={`/propiedades?${operacion ? `operacion=${operacion}&` : ""}tipo=${t}`}
                className={`px-4 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                  tipo === t
                    ? "bg-[#C9A84C] text-[#1A2240] border-[#C9A84C]"
                    : "border-[#C8D4E0] text-[#1A2240] hover:border-[#C9A84C]"
                }`}
              >
                {tipoLabels[t]}
              </Link>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          {propiedades.length === 0 ? (
            <div className="text-center py-24 text-[#6B7280]">
              <p className="text-lg mb-2">No hay propiedades disponibles</p>
              <p className="text-sm">Prueba con otros filtros</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#6B7280] mb-6">
                {propiedades.length} propiedad{propiedades.length !== 1 ? "es" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {propiedades.map((p) => (
                  <PropertyCard key={p.id} propiedad={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function PropertyCard({ propiedad }: { propiedad: Propiedad }) {
  const imagen = propiedad.imagenes?.[0] || "/images/prop-1.jpg";
  return (
    <Link href={`/propiedad/${propiedad.slug}`}>
      <article className="bg-white group cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-52 overflow-hidden">
          <img
            src={imagen}
            alt={propiedad.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#1A2240] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 capitalize">
            {propiedad.operacion}
          </span>
          <div className="absolute bottom-0 left-0 right-0 bg-[#1A2240]/80 py-2 px-3">
            <span className="text-[#C9A84C] font-semibold text-lg">
              {formatPrice(propiedad.precio)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-[#1A2240] font-medium text-sm leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
            {propiedad.titulo}
          </h3>
          <div className="flex items-center gap-1 text-[#6B7280] text-xs mb-3">
            <MapPin size={12} className="text-[#C9A84C]" />
            <span>{propiedad.municipio}</span>
          </div>
          <div className="flex items-center gap-4 border-t border-[#E4ECF4] pt-3">
            {propiedad.habitaciones != null && (
              <span className="flex items-center gap-1 text-xs text-[#1A2240]">
                <Bed size={12} className="text-[#C9A84C]" />
                {propiedad.habitaciones}
              </span>
            )}
            {propiedad.banos != null && (
              <span className="flex items-center gap-1 text-xs text-[#1A2240]">
                <Bath size={12} className="text-[#C9A84C]" />
                {propiedad.banos}
              </span>
            )}
            {propiedad.metros_cuadrados != null && (
              <span className="flex items-center gap-1 text-xs text-[#1A2240]">
                <Maximize2 size={12} className="text-[#C9A84C]" />
                {propiedad.metros_cuadrados} m²
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
