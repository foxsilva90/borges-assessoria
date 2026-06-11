"use client"

import { useState } from "react"
import Image from "next/image"
import { properties } from "@/data/properties"

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function Properties() {
  const [filter, setFilter] = useState<"todos" | "apartamento">("todos")

  const filtered =
    filter === "todos" ? properties : properties.filter((p) => p.type === filter)

  return (
    <section id="imoveis" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-4">
            Portfólio
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-4">
            Imóveis Selecionados
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
            Curadoria exclusiva de imóveis em Jacarepaguá com assessoria jurídica inclusa.
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
              className={`px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors ${
                filter === tab.key
                  ? "bg-[#C4933A] text-white"
                  : "border border-[#E5E0D8] text-[#6B6B6B] hover:border-[#C4933A] hover:text-[#C4933A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map((property) => (
            <article
              key={property.id}
              className="group border border-[#E5E0D8] overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={property.photos[0]}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C4933A] text-white text-xs font-medium tracking-widest uppercase px-3 py-1.5">
                    Venda
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="text-xs text-[#6B6B6B] tracking-wide uppercase mb-1">
                  {property.neighborhood}
                </p>
                <h3 className="font-display text-xl text-[#1a1a1a] mb-3">
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
                    className="bg-[#1C0F07] text-white text-sm font-medium tracking-widest uppercase px-5 py-2.5 hover:bg-[#C4933A] transition-colors"
                  >
                    Tenho Interesse
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
