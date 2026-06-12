"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const active = !isHome || scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        active ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`font-display text-xl font-normal tracking-wide transition-colors ${
            active ? "text-[#1C0F07]" : "text-white"
          }`}
        >
          Borges Assessoria
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Imóveis", href: "#imoveis" },
            { label: "Sobre Nós", href: "#sobre" },
            { label: "Serviços", href: "#servicos" },
            { label: "Contato", href: "#contato" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C4933A] ${
                active ? "text-[#1a1a1a]" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-[#C4933A] text-white text-sm font-medium tracking-widest uppercase px-6 py-2.5 transition-colors hover:bg-[#A67B2E]"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-0.5 transition-all duration-300 ${
                active ? "bg-[#1a1a1a]" : "bg-white"
              } ${menuOpen && i === 0 ? "rotate-45 translate-y-2" : ""} ${
                menuOpen && i === 1 ? "opacity-0" : ""
              } ${menuOpen && i === 2 ? "-rotate-45 -translate-y-2" : ""}`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E0D8] px-6 py-6 flex flex-col gap-5">
          {[
            { label: "Imóveis", href: "#imoveis" },
            { label: "Sobre Nós", href: "#sobre" },
            { label: "Serviços", href: "#servicos" },
            { label: "Contato", href: "#contato" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#1a1a1a] font-medium tracking-wide hover:text-[#C4933A] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="bg-[#C4933A] text-white text-center font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#A67B2E] transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </header>
  )
}
