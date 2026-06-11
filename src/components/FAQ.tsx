"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Como funciona o processo de compra de um imóvel com a Borges Assessoria?",
    a: "Nosso processo começa com uma consulta gratuita para entender suas necessidades. Apresentamos imóveis selecionados, acompanhamos visitas, negociamos as melhores condições e nossa equipe jurídica analisa toda a documentação até a assinatura do contrato e entrega das chaves.",
  },
  {
    q: "Quais documentos são necessários para comprar um imóvel?",
    a: "Os documentos principais são: RG, CPF, comprovante de renda, comprovante de residência e certidão de estado civil. Para compras com financiamento, o banco pode solicitar documentos adicionais. Nossa equipe orienta você em cada etapa.",
  },
  {
    q: "O que é a assessoria jurídica que vocês oferecem?",
    a: "Contamos com advogadas especializadas em direito imobiliário — Dra. Kátia Terra e Dra. Fernanda Borges — que analisam a matrícula do imóvel, certidões negativas, contratos e toda a documentação para garantir uma transação sem riscos.",
  },
  {
    q: "Vocês trabalham com imóveis para locação?",
    a: "Nosso foco principal é compra e venda, mas também assessoramos em processos de locação e regularização de imóveis. Entre em contato para verificarmos como podemos ajudar no seu caso.",
  },
  {
    q: "O que é legalização de imóveis e quando preciso desse serviço?",
    a: "A legalização é necessária quando o imóvel tem pendências documentais — como escritura irregular, inventário em aberto, ou obra não averbada. Regularizamos a situação para que você possa vender, financiar ou transferir o imóvel sem problemas.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-[#F8F5F0]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-4">
            Dúvidas Frequentes
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a]">
            Tire Suas Dúvidas
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#E5E0D8] bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-[#1a1a1a] pr-4">{faq.q}</span>
                <span
                  className={`text-[#C4933A] text-xl flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#6B6B6B] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#contato"
            className="text-[#C4933A] font-medium hover:underline"
          >
            Ainda tem dúvidas? Fale Conosco →
          </a>
        </div>
      </div>
    </section>
  )
}
