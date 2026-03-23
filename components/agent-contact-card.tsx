"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/lib/config";

interface Agent {
  name: string;
  photo: string;
  title: string;
  phone: string;
  whatsapp: string;
}

interface AgentContactCardProps {
  agent: Agent;
  propertyRef: string;
}

export function AgentContactCard({ agent, propertyRef }: AgentContactCardProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: `Hola, me interesa la propiedad "${propertyRef}". ¿Podrían darme más información?`,
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, soy ${formData.name}${formData.phone ? ` (${formData.phone})` : ""}.\n${formData.message}`;
    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSent(true);
  };

  return (
    <div className="bg-white shadow-lg sticky top-28">
      {/* Agent Info */}
      <div className="p-6 border-b border-[#EDE8DD]">
        <div className="flex items-center gap-4">
          <img
            src={agent.photo}
            alt={agent.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="text-[#1B2B4B] font-medium">{agent.name}</h4>
            <p className="text-[#6B7280] text-sm">{agent.title}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-5">
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#1B2B4B] text-[#F5F0E8] font-medium tracking-wide hover:bg-[#243656] transition-colors"
          >
            <Phone size={16} />
            Llamar ahora
          </a>
          <a
            href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#25D366] text-[#25D366] font-medium tracking-wide hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <h5 className="text-[#1B2B4B] font-medium mb-4">Solicitar información</h5>

        {sent ? (
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-4 text-center">
            <p className="text-[#1B2B4B] font-medium text-sm">✓ WhatsApp abierto</p>
            <p className="text-[#6B7280] text-xs mt-1">Te responderemos en breve.</p>
            <button onClick={() => setSent(false)} className="text-[#C9A84C] text-xs mt-3 underline">
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-[#F5F0E8] border-0 focus-visible:ring-[#C9A84C] text-[#1B2B4B] placeholder:text-[#6B7280]"
            />
            <Input
              type="tel"
              placeholder="Tu teléfono (opcional)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#F5F0E8] border-0 focus-visible:ring-[#C9A84C] text-[#1B2B4B] placeholder:text-[#6B7280]"
            />
            <Textarea
              placeholder="Mensaje"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="bg-[#F5F0E8] border-0 focus-visible:ring-[#C9A84C] text-[#1B2B4B] placeholder:text-[#6B7280] resize-none"
            />
            <Button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20b558] text-white font-medium tracking-wide py-3 h-auto flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Enviar por WhatsApp
            </Button>
          </div>
        )}

        <p className="text-[#6B7280] text-[11px] mt-4 leading-relaxed">
          Sus datos serán tratados de forma confidencial.
        </p>
      </form>
    </div>
  );
}
