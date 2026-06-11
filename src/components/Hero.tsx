import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      <Image
        src="/bg/sala-escura.jpg"
        alt="Imóvel de luxo em Jacarepaguá"
        fill
        priority
        className="object-cover scale-105"
        sizes="100vw"
      />

      {/* Gradient overlay — darker at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0F07]/50 via-[#1C0F07]/55 to-[#1C0F07]/80" />

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="hero-badge text-sm font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-6">
          Assessoria Imobiliária e Jurídica — CRECI 40466
        </p>
        <h1 className="hero-title font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
          Encontre o Imóvel
          <br />
          dos Seus Sonhos
          <br />
          com a Borges
        </h1>
        <p className="hero-sub text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          30 anos de experiência em Jacarepaguá. Assessoria jurídica especializada
          para você comprar com total segurança.
        </p>
        <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#imoveis"
            className="bg-[#C4933A] text-white font-medium tracking-widest uppercase px-8 py-4 hover:bg-[#A67B2E] transition-colors duration-300"
          >
            Ver Imóveis
          </a>
          <a
            href="#contato"
            className="border border-white/60 text-white font-medium tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-[#1C0F07] transition-colors duration-300"
          >
            Fale Conosco
          </a>
        </div>
      </div>

    </section>
  )
}
