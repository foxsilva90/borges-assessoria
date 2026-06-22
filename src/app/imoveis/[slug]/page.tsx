import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { BedDouble, Ruler, Car, Bath, MapPin, Home, Phone } from "lucide-react"
import { properties } from "@/data/properties"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PropertyDetailGallery from "@/components/PropertyDetailGallery"
import PixelViewContent from "@/components/PixelViewContent"
import WhatsAppCTA from "@/components/WhatsAppCTA"

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const property = properties.find((p) => p.slug === slug)
  if (!property) return {}
  return {
    title: `${property.title} | Borges Assessoria`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.photos[0] ? [property.photos[0]] : [],
    },
  }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = properties.find((p) => p.slug === slug)
  if (!property) notFound()

  return (
    <>
      <Navbar />
      <PixelViewContent
        contentId={property.slug}
        contentName={property.title}
        value={property.price}
      />
      <main className="min-h-screen bg-white pt-20">
        {/* Breadcrumb */}
        <div className="bg-[#F5F0E8] border-b border-[#E5E0D8] py-3">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B6B6B]">
            <Link href="/" className="hover:text-[#C4933A] transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href="/#imoveis" className="hover:text-[#C4933A] transition-colors">
              Imóveis
            </Link>
            <span>/</span>
            <span className="text-[#1a1a1a] font-medium truncate">{property.title}</span>
          </div>
        </div>

        {/* Gallery */}
        <PropertyDetailGallery photos={property.photos} title={property.title} />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left: details */}
            <div className="lg:col-span-2">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-2">
                Venda · Apartamento
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-3 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-[#6B6B6B] mb-8">
                <MapPin size={16} className="shrink-0" />
                <span>{property.address} — {property.neighborhood}</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E5E0D8] mb-8">
                <div className="flex flex-col items-center gap-1 text-center">
                  <BedDouble size={28} strokeWidth={1.2} className="text-[#C4933A]" />
                  <span className="font-semibold text-[#1a1a1a] text-sm">{property.bedrooms} quartos</span>
                  {property.suites > 0 && (
                    <span className="text-xs text-[#6B6B6B]">
                      {property.suites} suíte{property.suites > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Bath size={28} strokeWidth={1.2} className="text-[#C4933A]" />
                  <span className="font-semibold text-[#1a1a1a] text-sm">{property.bathrooms} banheiros</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Ruler size={28} strokeWidth={1.2} className="text-[#C4933A]" />
                  <span className="font-semibold text-[#1a1a1a] text-sm">{property.area} m²</span>
                  <span className="text-xs text-[#6B6B6B]">área útil</span>
                </div>
                {property.parking ? (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Car size={28} strokeWidth={1.2} className="text-[#C4933A]" />
                    <span className="font-semibold text-[#1a1a1a] text-sm">
                      {property.parking} vaga{property.parking > 1 ? "s" : ""}
                    </span>
                    <span className="text-xs text-[#6B6B6B]">garagem</span>
                  </div>
                ) : null}
              </div>

              {/* Description */}
              <section className="mb-8">
                <h2 className="font-display text-2xl text-[#1a1a1a] mb-4">Descrição</h2>
                <p className="text-[#6B6B6B] leading-relaxed text-lg">{property.description}</p>
              </section>

              {/* Highlights */}
              {property.highlights.length > 0 && (
                <section className="mb-8">
                  <h2 className="font-display text-2xl text-[#1a1a1a] mb-4">Destaques</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-[#1a1a1a]">
                        <span className="w-2 h-2 rounded-full bg-[#C4933A] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl text-[#1a1a1a] mb-4">Infraestrutura</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span
                        key={a}
                        className="px-4 py-2 bg-[#F5F0E8] text-[#1a1a1a] text-sm border border-[#E5E0D8]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right: price card */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white border border-[#E5E0D8] rounded-2xl p-8 shadow-lg">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#6B6B6B] mb-1">
                  Valor de venda
                </p>
                <p className="font-display text-3xl text-[#1a1a1a] mb-4">
                  {formatPrice(property.price)}
                </p>

                {(property.condominio || property.iptu) && (
                  <div className="space-y-1 mb-6 text-sm text-[#6B6B6B]">
                    {property.condominio && (
                      <p>Condomínio: <strong className="text-[#1a1a1a]">{formatPrice(property.condominio)}/mês</strong></p>
                    )}
                    {property.iptu && (
                      <p>IPTU: <strong className="text-[#1a1a1a]">{formatPrice(property.iptu)}/ano</strong></p>
                    )}
                  </div>
                )}

                <WhatsAppCTA
                  href={`https://wa.me/5521979136060?text=Olá%2C%20tenho%20interesse%20no%20imóvel%3A%20${encodeURIComponent(property.title)}`}
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#C4933A] text-white font-medium tracking-widest uppercase py-4 rounded-lg hover:bg-[#A67B2E] transition-colors duration-300 mb-3"
                >
                  Tenho Interesse
                </WhatsAppCTA>
                <a
                  href="tel:+5521966684167"
                  className="flex items-center justify-center gap-2 w-full text-center border border-[#1a1a1a] text-[#1a1a1a] font-medium tracking-widest uppercase py-4 rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
                >
                  <Phone size={16} />
                  Ligar Agora
                </a>

                <div className="mt-6 pt-6 border-t border-[#E5E0D8] flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C4933A] rounded-full flex items-center justify-center shrink-0">
                    <Home size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">Borges Assessoria</p>
                    <p className="text-xs text-[#6B6B6B]">CRECI 40466 · 30 anos de experiência</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile sticky CTA bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E0D8] px-4 py-3 flex gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <WhatsAppCTA
          href={`https://wa.me/5521979136060?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20im%C3%B3vel%3A%20${encodeURIComponent(property.title)}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#C4933A] text-white font-medium tracking-widest uppercase py-3 rounded-lg text-sm"
        >
          Tenho Interesse
        </WhatsAppCTA>
        <a
          href="tel:+5521966684167"
          className="flex items-center justify-center gap-2 px-4 border border-[#1a1a1a] text-[#1a1a1a] rounded-lg text-sm font-medium"
        >
          <Phone size={16} />
          Ligar
        </a>
      </div>
    </>
  )
}
