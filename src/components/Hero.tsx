import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/imoveis/apt-01/01.jpg"
        alt="Imóvel de luxo em Jacarepaguá"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1C0F07]/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-6">
          Assessoria Imobiliária e Jurídica — CRECI 40466
        </p>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
          Encontre o Imóvel
          <br />
          dos Seus Sonhos
          <br />
          com a Borges
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          30 anos de experiência em Jacarepaguá. Assessoria jurídica especializada
          para você comprar com total segurança.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#imoveis"
            className="bg-[#C4933A] text-white font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#A67B2E] transition-colors"
          >
            Ver Imóveis
          </a>
          <a
            href="#contato"
            className="border border-white/60 text-white font-medium tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Rolar</span>
        <div className="w-px h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
