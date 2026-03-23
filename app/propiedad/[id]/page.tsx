import { notFound } from "next/navigation";
import { NavbarInner } from "@/components/navbar-inner";
import { PropertyPhotoGrid } from "@/components/property-photo-grid";
import { AgentContactCard } from "@/components/agent-contact-card";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { Footer } from "@/components/footer";
import {
  Bed, Bath, Maximize2, Building, MapPin, Check,
  Car, Trees, Layers, Compass, Calendar, Zap,
} from "lucide-react";
import { getPropiedadBySlug, getPropiedadesSimilares } from "@/lib/actions";
import Link from "next/link";
import { config } from "@/lib/config";

const agent = {
  name: config.agencia,
  photo: "/images/agent.jpg",
  title: "Agente Inmobiliario",
  phone: config.telefono,
  whatsapp: config.telefonoHref,
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propiedad = await getPropiedadBySlug(id);
  if (!propiedad) return {};
  return {
    title: `${propiedad.titulo} | ${config.agencia}`,
    description: propiedad.descripcion?.slice(0, 160),
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propiedad = await getPropiedadBySlug(id);
  if (!propiedad) notFound();

  const similares = await getPropiedadesSimilares(propiedad.tipo, propiedad.municipio, propiedad.slug);

  const precio = new Intl.NumberFormat("es-ES", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(propiedad.precio);

  const images = propiedad.imagenes?.map((src, i) => ({ src, alt: `Foto ${i + 1}` })) ?? [];

  return (
    <>
      <NavbarInner />

      <main className="pt-20 bg-[#F0F4F8]">

        {/* ── Hero: fotos + info clave ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-5">
            <Link href="/" className="hover:text-[#1A2240] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/propiedades" className="hover:text-[#1A2240] transition-colors capitalize">
              {propiedad.operacion}
            </Link>
            <span>/</span>
            <span className="text-[#1A2240]">{propiedad.municipio}</span>
          </nav>

          {/* Layout 70 / 30 */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Columna izquierda — fotos (70 %) */}
            <div className="w-full lg:w-[70%] flex-none">
              <PropertyPhotoGrid images={images} />
            </div>

            {/* Columna derecha — info + contacto (30 %) */}
            <div className="flex-1 flex flex-col gap-5">

              {/* Ubicación */}
              <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                <MapPin size={14} className="text-[#2E6DA4] shrink-0" />
                <span>{propiedad.municipio}</span>
                {propiedad.direccion && (
                  <>
                    <span className="text-[#2E6DA4]">·</span>
                    <span className="truncate">{propiedad.direccion}</span>
                  </>
                )}
              </div>

              {/* Título */}
              <h1 className="text-[#1A2240] text-xl lg:text-2xl font-light leading-snug">
                {propiedad.titulo}
              </h1>

              {/* Precio */}
              <p className="text-[#2E6DA4] text-3xl font-semibold">{precio}</p>

              {/* Stats clave */}
              <div className="grid grid-cols-2 gap-2">
                {propiedad.metros_cuadrados && (
                  <Stat icon={<Maximize2 size={15} />} value={`${propiedad.metros_cuadrados} m²`} label="Superficie" />
                )}
                {propiedad.habitaciones != null && (
                  <Stat icon={<Bed size={15} />} value={String(propiedad.habitaciones)} label="Habitaciones" />
                )}
                {propiedad.banos != null && (
                  <Stat icon={<Bath size={15} />} value={String(propiedad.banos)} label="Baños" />
                )}
                {propiedad.planta && (
                  <Stat icon={<Building size={15} />} value={propiedad.planta} label="Planta" />
                )}
                {propiedad.terraza_m2 && (
                  <Stat icon={<Layers size={15} />} value={`${propiedad.terraza_m2} m²`} label="Terraza" />
                )}
                {propiedad.jardin_m2 && (
                  <Stat icon={<Trees size={15} />} value={`${propiedad.jardin_m2} m²`} label="Jardín" />
                )}
                {propiedad.orientacion && (
                  <Stat icon={<Compass size={15} />} value={propiedad.orientacion} label="Orientación" />
                )}
                {propiedad.antiguedad && (
                  <Stat icon={<Calendar size={15} />} value={String(propiedad.antiguedad)} label="Año construcción" />
                )}
              </div>

              {/* Badges */}
              {(propiedad.certificado_energetico || propiedad.garaje || propiedad.trastero || propiedad.ascensor || propiedad.piscina) && (
                <div className="flex flex-wrap gap-1.5">
                  {propiedad.certificado_energetico && (
                    <EnergyBadge cert={propiedad.certificado_energetico} />
                  )}
                  {propiedad.garaje && <Badge icon={<Car size={12} />} label={`Garaje: ${propiedad.garaje}`} />}
                  {propiedad.trastero && <Badge icon={<Layers size={12} />} label="Trastero" />}
                  {propiedad.ascensor && <Badge icon={<Building size={12} />} label="Ascensor" />}
                  {propiedad.piscina && <Badge icon={<Trees size={12} />} label="Piscina" />}
                </div>
              )}

              {/* Contacto sticky */}
              <div className="lg:sticky lg:top-28">
                <AgentContactCard agent={agent} propertyRef={propiedad.id.slice(0, 8).toUpperCase()} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Contenido: descripción + equipamiento + calculadora ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
          <div className="max-w-3xl">

            {propiedad.descripcion && (
              <div className="mb-10">
                <h2 className="text-[#1A2240] text-lg font-medium mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-[#2E6DA4]" />
                  Descripción
                </h2>
                <div className="text-[#4B5563] leading-relaxed whitespace-pre-line">
                  {propiedad.descripcion}
                </div>
              </div>
            )}

            {propiedad.caracteristicas?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-[#1A2240] text-lg font-medium mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-[#2E6DA4]" />
                  Equipamiento
                </h2>
                <div className="flex flex-wrap gap-2">
                  {propiedad.caracteristicas.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#1A2240] text-sm border border-[#C8D4E0]"
                    >
                      <Check size={12} className="text-[#2E6DA4]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <MortgageCalculator precioPropiedadInicial={propiedad.precio} />
          </div>
        </section>

        {/* ── Propiedades similares ── */}
        {similares.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <h2 className="text-[#1A2240] text-2xl font-light mb-8">Propiedades similares</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similares.map((p) => {
                  const img = p.imagenes?.[0] || "/images/prop-1.jpg";
                  const pr = new Intl.NumberFormat("es-ES", {
                    style: "currency", currency: "EUR", maximumFractionDigits: 0,
                  }).format(p.precio);
                  return (
                    <Link
                      key={p.id}
                      href={`/propiedad/${p.slug}`}
                      className="group bg-[#F0F4F8] overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={img}
                          alt={p.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-[#2E6DA4] font-semibold">{pr}</p>
                        <p className="text-[#1A2240] font-medium text-sm mt-1 line-clamp-2">{p.titulo}</p>
                        <p className="text-[#6B7280] text-xs mt-1">{p.municipio}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2.5 border border-[#E4ECF4]">
      <span className="text-[#2E6DA4]">{icon}</span>
      <div>
        <p className="text-[#1A2240] text-sm font-semibold leading-none">{value}</p>
        <p className="text-[#9CA3AF] text-[10px] uppercase tracking-wide mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#1A2240] text-xs border border-[#C8D4E0]">
      <span className="text-[#2E6DA4]">{icon}</span>
      {label}
    </span>
  );
}

const energyColors: Record<string, string> = {
  A: "bg-[#00A651] text-white",
  B: "bg-[#4CB848] text-white",
  C: "bg-[#BFD730] text-[#1A2240]",
  D: "bg-[#FFF200] text-[#1A2240]",
  E: "bg-[#FFB81C] text-[#1A2240]",
  F: "bg-[#F37021] text-white",
  G: "bg-[#ED1C24] text-white",
};

function EnergyBadge({ cert }: { cert: string }) {
  const colorClass = energyColors[cert] ?? "bg-[#C8D4E0] text-[#1A2240]";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold ${colorClass}`}>
      <Zap size={11} />
      {cert}
    </span>
  );
}
