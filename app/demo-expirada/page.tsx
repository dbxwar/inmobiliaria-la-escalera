import { config } from "@/lib/config";

export default function DemoExpiradaPage() {
  return (
    <main className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-[#1A2240] flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <p className="text-[#FFFFFF] tracking-[0.4em] uppercase text-xs font-medium mb-4">
          Demo privada
        </p>
        <h1 className="text-[#1A2240] text-3xl font-light leading-tight mb-4">
          El acceso a esta<br />
          <span className="font-semibold">demo ha expirado</span>
        </h1>
        <p className="text-[#1A2240]/60 text-base leading-relaxed mb-8">
          Esta demostración fue creada exclusivamente para {config.agencia} y su período de acceso ha concluido.
        </p>
        <a
          href={`mailto:${config.email}`}
          className="inline-block bg-[#1A2240] text-white px-8 py-3 text-sm font-medium hover:bg-[#1A2240]/90 transition-colors"
        >
          Contactar para más información
        </a>
      </div>
    </main>
  );
}
