const services = [
  {
    title: "Compra e Venda",
    description:
      "Intermediamos negociações com segurança jurídica em cada etapa — avaliação, proposta, contrato e registro.",
    icon: "🏠",
  },
  {
    title: "Legalização de Imóveis",
    description:
      "Regularizamos imóveis com pendências documentais, inventários e escrituras. Solução completa para sua tranquilidade.",
    icon: "📋",
  },
  {
    title: "Assessoria Jurídica",
    description:
      "Nossas advogadas analisam toda a documentação, identificam riscos e garantem uma transação segura do início ao fim.",
    icon: "⚖️",
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-24 bg-[#1C0F07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-4">
            O que fazemos
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Nossos Serviços
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Experiência imobiliária aliada à segurança jurídica em cada negociação.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="border border-white/10 p-8 hover:border-[#C4933A] transition-colors group"
            >
              <div className="text-3xl mb-6">{service.icon}</div>
              <h3 className="font-display text-2xl text-white mb-4 group-hover:text-[#C4933A] transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
