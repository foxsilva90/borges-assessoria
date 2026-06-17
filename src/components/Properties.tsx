"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Home, BedDouble, Ruler, Car, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [liked, setLiked] = useState(false)
  const { ref, visible } = useScrollReveal()
  const router = useRouter()

  const touchStartX = useRef(0)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)
  const wasDragged = useRef(false)

  const total = property.photos.length

  const goNext = () => setPhotoIdx((i) => Math.min(total - 1, i + 1))
  const goPrev = () => setPhotoIdx((i) => Math.max(0, i - 1))

  const handleSwipeEnd = (startX: number, endX: number) => {
    const diff = startX - endX
    if (Math.abs(diff) > 40) {
      wasDragged.current = true
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (wasDragged.current) { wasDragged.current = false; return }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const third = rect.width / 3
    if (x < third) goPrev()
    else if (x > third * 2) goNext()
    else router.push(`/imoveis/${property.slug}`)
  }

  const icons = [
    {
      icon: <Home size={36} strokeWidth={1.2} />,
      line1: "Apartamento",
      line2: null as string | null,
    },
    {
      icon: <BedDouble size={36} strokeWidth={1.2} />,
      line1: `${property.bedrooms} quartos`,
      line2: property.suites > 0 ? `sendo ${property.suites} suítes` : null,
    },
    {
      icon: <Ruler size={36} strokeWidth={1.2} />,
      line1: `${property.area} m²`,
      line2: "área útil",
    },
    property.parking
      ? {
          icon: <Car size={36} strokeWidth={1.2} />,
          line1: `${property.parking} vaga${property.parking > 1 ? "s" : ""}`,
          line2: "na garagem",
        }
      : null,
  ].filter(Boolean) as { icon: React.ReactNode; line1: string; line2: string | null }[]

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Photo carousel */}
      <div
        className="relative aspect-[16/10] overflow-hidden group select-none cursor-pointer"
        onClick={handlePhotoClick}
        onTouchStart={(e) => { e.stopPropagation(); touchStartX.current = e.touches[0].clientX }}
        onTouchMove={(e) => { e.stopPropagation() }}
        onTouchEnd={(e) => { e.stopPropagation(); handleSwipeEnd(touchStartX.current, e.changedTouches[0].clientX) }}
        onMouseDown={(e) => { e.preventDefault(); dragStartX.current = e.clientX; isDragging.current = true }}
        onMouseMove={(e) => { if (isDragging.current && Math.abs(dragStartX.current - e.clientX) > 8) wasDragged.current = true }}
        onMouseUp={(e) => { if (isDragging.current) { handleSwipeEnd(dragStartX.current, e.clientX); isDragging.current = false } }}
        onMouseLeave={() => { isDragging.current = false }}
      >
        {/* Left zone hint */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3 z-[2] flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {photoIdx > 0 && <ChevronLeft size={20} className="text-white/60 drop-shadow" />}
        </div>
        {/* Right zone hint */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 z-[2] flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {photoIdx < total - 1 && <ChevronRight size={20} className="text-white/60 drop-shadow" />}
        </div>

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

        {/* Heart */}
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
          aria-label="Favoritar"
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {property.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setPhotoIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === photoIdx ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Price + name + icons — clickable link to detail page */}
      <Link href={`/imoveis/${property.slug}`} className="block hover:bg-[#FDFAF6] transition-colors duration-200">
        <div className="px-6 pt-6 pb-4 text-center">
          <p className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="mx-6 border-t border-[#E5E0D8]" />

        <div className="px-6 py-5 text-center">
          <p className="text-sm font-bold text-[#C4933A] uppercase tracking-[0.15em] mb-1.5">
            {property.title}
          </p>
          <p className="text-sm text-[#6B6B6B]">
            {property.address} — {property.neighborhood}
          </p>
        </div>

        <div
          className="grid border-t border-[#E5E0D8] divide-x divide-[#E5E0D8]"
          style={{ gridTemplateColumns: `repeat(${icons.length}, 1fr)` }}
        >
          {icons.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 py-5 px-2 text-center">
              <span className="text-[#6B6B6B]">{item.icon}</span>
              <span className="text-xs font-semibold text-[#1a1a1a] leading-tight">{item.line1}</span>
              {item.line2 && (
                <span className="text-xs text-[#6B6B6B] leading-tight">{item.line2}</span>
              )}
            </div>
          ))}
        </div>
      </Link>

      {/* CTA */}
      <div className="p-5">
        <a
          href={`https://wa.me/5521979136060?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20${encodeURIComponent(property.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#1C0F07] text-white text-sm font-medium tracking-widest uppercase py-3 rounded-lg hover:bg-[#C4933A] transition-colors duration-300"
        >
          Tenho Interesse
        </a>
      </div>
    </article>
  )
}

export default function Properties() {
  const [filter, setFilter] = useState<"todos" | "apartamento">("todos")
  const header = useScrollReveal()
  const scrollRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)

  const filtered =
    filter === "todos" ? properties : properties.filter((p) => p.type === filter)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const tick = () => {
      if (isPausedRef.current) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        const card = el.querySelector<HTMLElement>("div")
        const cardW = card ? card.offsetWidth + 16 : 300
        el.scrollBy({ left: cardW, behavior: "smooth" })
      }
    }

    const id = setInterval(tick, 3500)
    return () => clearInterval(id)
  }, [filtered])

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

        {/* Filter */}
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

        {/* Mobile: horizontal auto-scroll */}
        <div
          ref={scrollRef}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onTouchStart={() => { isPausedRef.current = true }}
          onTouchEnd={() => { setTimeout(() => { isPausedRef.current = false }, 1200) }}
          onMouseDown={() => { isPausedRef.current = true }}
          onMouseUp={() => { setTimeout(() => { isPausedRef.current = false }, 1200) }}
        >
          {filtered.map((property) => (
            <div key={property.id} className="snap-center shrink-0 w-[83vw]">
              <PropertyCard property={property} delay={0} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
