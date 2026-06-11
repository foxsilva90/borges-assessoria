"use client"

import { useState } from "react"
import Image from "next/image"
import { properties } from "@/data/properties"
import { useScrollReveal } from "@/hooks/useScrollReveal"

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

function PropertyCard({ property, delay }: { property: typeof properties[0]; delay: number }) {
  const [photoIdx, setPhotoIdx] = useState(0)
  const { ref, visible } = useScrollReveal()

  const prev = (e: React.MouseEvent) => {
    e.preventDefault()
    setPhotoIdx((i) => Math.max(0, i - 1))
  }
  const next = (e: React.MouseEvent) => {
    e.preventDefault()
    setPhotoIdx((i) => Math.min(property.photos.length - 1, i + 1))
  }

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Photo carousel */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {property.photos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${property.title} — foto ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              i === photoIdx ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#C4933A] text-white text-xs font-medium tracking-widest uppercase px-3 py-1.5">
            Venda
          </span>
        </div>

        {/* Arrow controls */}
        {photoIdx > 0 && (
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
            aria-label="Foto anterior"
          >
            ‹
          </button>
        )}
        {photoIdx < property.photos.length - 1 && (
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60"
            aria-label="Próxima foto"
          >
            ›
          </button>
        )}

        {/* Dot nav */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {property.photos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setPhotoIdx(i) }}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                i === photoIdx ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 border-t border-[#E5E0D8]">
        <p className="text-xs text-[#C4933A] tracking-[0.2em] uppercase mb-1 font-medium">
          {property.neighborhood}
        </p>
        <h3 className="font-display text-xl text-[#1a1a1a] mb-2">
          {property.title}
        </h3>
        <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Specs */}
        <div className="flex gap-4 text-sm text-[#6B6B6B] mb-5 border-t border-[#E5E0D8] pt-4">
          <span>{property.bedrooms} quartos</span>
          {property.suites > 0 && <span>{property.suites} suítes</span>}
          {property.area > 0 && <span>{property.area} m²</span>}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-display text-2xl text-[#C4933A]">
            {formatPrice(property.price)}
          </p>
          <a
            href={`https://wa.me/5521979136060?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20${encodeURIComponent(property.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1C0F07] text-white text-sm font-medium tracking-widest uppercase px-5 py-2.5 hover:bg-[#C4933A] transition-colors duration-300"
          >
            Tenho Interesse
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Properties() {
  const [filter, setFilter] = useState<"todos" | "apartamento">("todos")
  const header = useScrollReveal()

  const filtered =
    filter === "todos" ? properties : properties.filter((p) => p.type === filter)

  return (
    <section id="imoveis" className="py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-14 transition-all duration-700 ${
            header.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-4">
            Portfólio
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-4">
            Imóveis Selecionados
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
            Curadoria exclusiva em Jacarepaguá com assessoria jurídica inclusa.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 justify-center mb-12">
          {[
            { key: "todos", label: "Todos" },
            { key: "apartamento", label: "Apartamentos" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                filter === tab.key
                  ? "bg-[#1C0F07] text-white"
                  : "border border-[#E5E0D8] bg-white text-[#6B6B6B] hover:border-[#C4933A] hover:text-[#C4933A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
