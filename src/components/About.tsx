"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/useScrollReveal"

export default function About() {
  const left = useScrollReveal()
  const right = useScrollReveal()

  return (
    <section id="sobre" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* Image mosaic */}
          <div
            ref={left.ref}
            className={`relative transition-all duration-1000 ${left.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/imoveis/apt-02/foto5.jpg"
                alt="Imóvel Borges Assessoria"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Accent image — overlapping bottom-right */}
            <div className="absolute -bottom-8 -right-6 w-[58%] aspect-[4/3] border-4 border-white shadow-2xl overflow-hidden">
              <Image
                src="/imoveis/apt-01/foto3.jpg"
                alt="Detalhe imóvel"
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>

            {/* Gold badge */}
            <div className="absolute top-6 -left-4 bg-[#C4933A] text-white px-6 py-5 shadow-lg">
              <p className="font-display text-2xl leading-none">30 Anos</p>
              <p className="text-xs tracking-widest uppercase mt-1 text-white/80">de Experiência</p>
            </div>
          </div>

          {/* Text */}
          <div
            ref={right.ref}
            className={`transition-all duration-1000 delay-200 ${right.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-4">
              Quem Somos
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-6 leading-tight">
              Assessoria Imobiliária
              <br />
              com Expertise Jurídica
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-relaxed mb-6">
              A Borges Assessoria atua há 30 anos no mercado imobiliário de Jacarepaguá,
              oferecendo um serviço diferenciado que une expertise imobiliária com
              assessoria jurídica especializada.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Nossa equipe de advogadas garante segurança jurídica em cada transação —
              da análise documental à assinatura do contrato. Você compra, vende ou
              regulariza seu imóvel com total tranquilidade.
            </p>

            {/* Team */}
            <div className="border-t border-[#E5E0D8] pt-8 mb-8">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#6B6B6B] mb-4">
                Assessoria Jurídica
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="font-medium text-[#1a1a1a]">Dra. Kátia Terra</p>
                  <p className="text-sm text-[#6B6B6B]">Advogada Imobiliária</p>
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a]">Dra. Fernanda Borges</p>
                  <p className="text-sm text-[#6B6B6B]">Advogada Imobiliária</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#imoveis"
                className="bg-[#C4933A] text-white font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#A67B2E] transition-colors duration-300 text-center"
              >
                Ver Imóveis
              </a>
              <a
                href="#servicos"
                className="border border-[#1a1a1a] text-[#1a1a1a] font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300 text-center"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
