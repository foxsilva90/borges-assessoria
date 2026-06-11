const stats = [
  { value: "30+", label: "Anos de Experiência" },
  { value: "500+", label: "Imóveis Negociados" },
  { value: "CRECI", label: "40466 — Licenciados" },
  { value: "100%", label: "Assessoria Jurídica" },
]

export default function Stats() {
  return (
    <section className="bg-[#F8F5F0] py-16 border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl text-[#C4933A] mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-[#6B6B6B] tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
