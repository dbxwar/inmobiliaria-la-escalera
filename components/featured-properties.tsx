import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { getPropiedadesDestacadas } from "@/lib/actions";
import { Propiedad } from "@/lib/supabase";

export async function FeaturedProperties() {
  const propiedades = await getPropiedadesDestacadas();

  return (
    <section className="bg-[#F0F4F8] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-3">
              Selección exclusiva
            </p>
            <h2 className="text-[#1A2240] text-3xl sm:text-4xl font-light leading-tight text-balance">
              Propiedades Destacadas
            </h2>
          </div>
          <Link
            href="/propiedades"
            className="text-sm text-[#1A2240] border-b border-[#2E6DA4] pb-0.5 hover:text-[#2E6DA4] transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Ver todas las propiedades →
          </Link>
        </div>

        {propiedades.length === 0 ? (
          <div className="text-center py-16 text-[#6B7280]">
            <p>Próximamente nuevas propiedades disponibles.</p>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-6 px-6 lg:-mx-10 lg:px-10 scrollbar-hide">
            {propiedades.map((prop) => (
              <PropertyCard key={prop.id} propiedad={prop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ propiedad }: { propiedad: Propiedad }) {
  const imagenPrincipal = propiedad.imagenes?.[0] || "/images/prop-1.jpg";
  const precio = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(propiedad.precio);

  return (
    <Link href={`/propiedad/${propiedad.slug}`}>
      <article className="flex-none w-72 sm:w-80 snap-start bg-white group cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-52 overflow-hidden">
          <img
            src={imagenPrincipal}
            alt={propiedad.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#2E6DA4] text-[#1A2240] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 capitalize">
            {propiedad.operacion}
          </span>
          <div className="absolute bottom-0 left-0 right-0 bg-[#1A2240]/80 py-2 px-3">
            <span className="text-[#2E6DA4] font-semibold text-lg">{precio}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-[#1A2240] font-medium text-base leading-snug mb-2 group-hover:text-[#2E6DA4] transition-colors line-clamp-2">
            {propiedad.titulo}
          </h3>
          <div className="flex items-center gap-1 text-[#6B7280] text-xs mb-4">
            <MapPin size={12} className="text-[#2E6DA4]" />
            <span>{propiedad.municipio}</span>
          </div>

          <div className="flex items-center gap-4 border-t border-[#E4ECF4] pt-4">
            {propiedad.habitaciones != null && (
              <Stat icon={<Bed size={13} />} value={propiedad.habitaciones} label="hab" />
            )}
            {propiedad.banos != null && (
              <Stat icon={<Bath size={13} />} value={propiedad.banos} label="baños" />
            )}
            {propiedad.metros_cuadrados != null && (
              <Stat icon={<Maximize2 size={13} />} value={propiedad.metros_cuadrados} label="m²" />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[#1A2240]">
      <span className="text-[#2E6DA4]">{icon}</span>
      <span className="text-sm font-medium">{value}</span>
      <span className="text-[10px] text-[#6B7280] uppercase tracking-wide">{label}</span>
    </div>
  );
}
