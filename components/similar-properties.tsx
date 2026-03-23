import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import Link from "next/link";

const similarProperties = [
  {
    id: 2,
    photo: "/images/prop-2.jpg",
    price: "680.000",
    title: "Ático Panorámico Frente al Mar",
    location: "Benidorm, Alicante",
    beds: 3,
    baths: 2,
    sqm: 180,
  },
  {
    id: 3,
    photo: "/images/prop-3.jpg",
    price: "895.000",
    title: "Finca Tradicional entre Naranjos",
    location: "Gandía, Valencia",
    beds: 6,
    baths: 3,
    sqm: 650,
  },
  {
    id: 4,
    photo: "/images/prop-4.jpg",
    price: "430.000",
    title: "Casa Adosada con Vistas al Mar",
    location: "Dénia, Alicante",
    beds: 4,
    baths: 3,
    sqm: 240,
  },
];

export function SimilarProperties() {
  return (
    <section className="py-16 lg:py-20 bg-[#E4ECF4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#C9A84C] tracking-[0.4em] uppercase text-xs font-medium mb-2">
              Te puede interesar
            </p>
            <h2 className="text-[#1A2240] text-2xl sm:text-3xl font-light">
              Propiedades Similares
            </h2>
          </div>
          <Link
            href="#"
            className="hidden sm:inline text-sm text-[#1A2240] border-b border-[#C9A84C] pb-0.5 hover:text-[#C9A84C] transition-colors"
          >
            Ver más propiedades
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProperties.map((prop) => (
            <Link
              href={`/propiedad/${prop.id}`}
              key={prop.id}
              className="bg-white group cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={prop.photo}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1A2240]/80 py-2 px-3">
                  <span className="text-[#C9A84C] font-semibold text-lg">
                    {prop.price}€
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[#1A2240] font-medium text-base leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                  {prop.title}
                </h3>
                <div className="flex items-center gap-1 text-[#6B7280] text-xs mb-4">
                  <MapPin size={12} className="text-[#C9A84C]" />
                  <span>{prop.location}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 border-t border-[#E4ECF4] pt-4">
                  <Stat icon={<Bed size={13} />} value={prop.beds} label="hab" />
                  <Stat icon={<Bath size={13} />} value={prop.baths} label="baños" />
                  <Stat icon={<Maximize2 size={13} />} value={prop.sqm} label="m²" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="#"
            className="text-sm text-[#1A2240] border-b border-[#C9A84C] pb-0.5 hover:text-[#C9A84C] transition-colors"
          >
            Ver más propiedades
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[#1A2240]">
      <span className="text-[#C9A84C]">{icon}</span>
      <span className="text-sm font-medium">{value}</span>
      <span className="text-[10px] text-[#6B7280] uppercase tracking-wide">{label}</span>
    </div>
  );
}
