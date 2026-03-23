"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { config } from "@/lib/config";

const navLinks = [
  { label: "Comprar", href: "/propiedades?operacion=venta" },
  { label: "Alquilar", href: "/propiedades?operacion=alquiler" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Gestión de Alquiler", href: "/gestion-alquiler" },
  { label: "Sobre Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1A2240]/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/">
          <Image src={config.logo} alt={config.agencia} width={140} height={50} className="h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#F0F4F8]/80 hover:text-[#FFFFFF] text-sm tracking-wide transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/#contacto"
          className="hidden md:inline-flex items-center px-5 py-2 border border-[#FFFFFF] text-[#FFFFFF] text-sm tracking-wider uppercase hover:bg-[#FFFFFF] hover:text-[#1A2240] transition-all duration-200"
        >
          Contactar
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#F0F4F8] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A2240] px-6 pb-6 flex flex-col gap-5">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#F0F4F8]/80 hover:text-[#FFFFFF] text-sm tracking-wide transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
