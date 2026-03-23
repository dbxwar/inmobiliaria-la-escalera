"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { config } from "@/lib/config";

export function ValuationModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", direccion: "", mensaje: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hola, me gustaría solicitar una valoración gratuita.

Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Dirección: ${form.direccion}${form.mensaje ? `\nMensaje: ${form.mensaje}` : ""}`;

    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    setOpen(false);
    setForm({ nombre: "", telefono: "", direccion: "", mensaje: "" });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center px-8 py-4 bg-[#1A2240] text-[#F0F4F8] text-sm tracking-widest uppercase font-medium hover:bg-[#131929] transition-colors duration-200"
      >
        Solicitar valoración gratuita
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

          {/* Modal */}
          <div className="relative bg-[#F0F4F8] w-full max-w-md p-8 shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#1A2240]/50 hover:text-[#1A2240] transition-colors"
            >
              <X size={20} />
            </button>

            <p className="text-[#2E6DA4] tracking-[0.4em] uppercase text-xs font-medium mb-2">
              Valoración gratuita
            </p>
            <h3 className="text-[#1A2240] text-2xl font-semibold mb-6">
              Cuéntanos sobre tu propiedad
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A2240] mb-1">Nombre *</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                  className="w-full border border-[#C8D4E0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A2240] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2240] mb-1">Teléfono *</label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  type="tel"
                  placeholder="+34 600 000 000"
                  className="w-full border border-[#C8D4E0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A2240] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2240] mb-1">Dirección de la propiedad *</label>
                <input
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                  placeholder="Calle, número, municipio"
                  className="w-full border border-[#C8D4E0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A2240] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A2240] mb-1">Mensaje <span className="text-[#1A2240]/40 font-normal">(opcional)</span></label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Información adicional sobre la propiedad..."
                  className="w-full border border-[#C8D4E0] bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#1A2240] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-[#1A2240] text-[#F0F4F8] py-3 text-sm tracking-widest uppercase font-medium hover:bg-[#131929] transition-colors duration-200"
              >
                Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
