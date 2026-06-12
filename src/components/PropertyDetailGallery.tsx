"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

interface Props {
  photos: string[]
  title: string
}

export default function PropertyDetailGallery({ photos, title }: Props) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setCurrent((i) => Math.max(0, i - 1))
  const next = () => setCurrent((i) => Math.min(photos.length - 1, i + 1))

  return (
    <>
      <div className="bg-[#1a1a1a]">
        {/* Main photo */}
        <div
          className="relative h-[55vh] min-h-[320px] max-h-[640px] group cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          {photos.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${title} — foto ${i + 1}`}
              fill
              className={`object-cover transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
              priority={i === 0}
              quality={90}
              sizes="100vw"
            />
          ))}

          {/* Expand hint */}
          <div className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Expand size={18} />
          </div>

          {/* Arrows */}
          {current > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/50 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {current < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/50 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              aria-label="Próxima foto"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {current + 1} / {photos.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 px-4 pb-4 pt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className={`shrink-0 relative w-20 h-14 rounded overflow-hidden transition-all duration-200 ${
                i === current ? "ring-2 ring-[#C4933A] opacity-100" : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Foto ${i + 1}`}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-white/10 rounded-full p-2"
            onClick={() => setLightbox(false)}
            aria-label="Fechar"
          >
            <X size={24} />
          </button>

          {current > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full hover:bg-white/20"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          <div
            className="relative w-full max-w-5xl mx-16 aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[current]}
              alt={`${title} — foto ${current + 1}`}
              fill
              className="object-contain"
              quality={95}
              sizes="100vw"
            />
          </div>

          {current < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 text-white flex items-center justify-center rounded-full hover:bg-white/20"
              aria-label="Próxima foto"
            >
              <ChevronRight size={26} />
            </button>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {current + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  )
}
