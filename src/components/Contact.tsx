"use client"

import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Olá! Meu nome é ${form.name}.%0A%0A${form.message}%0A%0AEmail: ${form.email}`
    window.open(`https://wa.me/5521979136060?text=${msg}`, "_blank")
    setSent(true)
  }

  return (
    <section id="contato" className="py-24 bg-[#1C0F07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#C4933A] mb-4">
              Entre em Contato
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Fale com Nossa
              <br />
              Equipe
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Estamos prontos para ajudar você a encontrar o imóvel ideal ou
              regularizar sua propriedade com total segurança jurídica.
            </p>

            <div className="space-y-6">
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C4933A] mb-2">
                  Endereço
                </p>
                <p className="text-white/80">
                  Rua Araguaia, 1055 sala 303<br />
                  Araguaia Premium Office<br />
                  Freguesia — Jacarepaguá, RJ
                </p>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C4933A] mb-2">
                  WhatsApp
                </p>
                <div className="flex flex-col gap-1">
                  <a
                    href="https://wa.me/5521979136060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#C4933A] transition-colors"
                  >
                    (21) 97913-6060
                  </a>
                  <a
                    href="https://wa.me/5521966684167"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#C4933A] transition-colors"
                  >
                    (21) 96668-4167
                  </a>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C4933A] mb-2">
                  Assessoria Jurídica
                </p>
                <p className="text-white/80">
                  Dra. Kátia Terra — (21) 98166-1870<br />
                  Dra. Fernanda Borges — (21) 97913-6060
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10">
            {sent ? (
              <div className="text-center py-12">
                <p className="font-display text-2xl text-[#1a1a1a] mb-3">Mensagem enviada!</p>
                <p className="text-[#6B6B6B]">
                  Redirecionamos para o WhatsApp. Em breve nossa equipe retornará.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-[#C4933A] font-medium hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nome completo"
                    className="w-full border border-[#E5E0D8] px-4 py-3 text-[#1a1a1a] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C4933A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full border border-[#E5E0D8] px-4 py-3 text-[#1a1a1a] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C4933A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">
                    Como podemos ajudar?
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Descreva o que você procura ou sua dúvida..."
                    className="w-full border border-[#E5E0D8] px-4 py-3 text-[#1a1a1a] placeholder-[#6B6B6B]/50 focus:outline-none focus:border-[#C4933A] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C4933A] text-white font-medium tracking-widest uppercase py-4 hover:bg-[#A67B2E] transition-colors"
                >
                  Enviar via WhatsApp
                </button>
                <p className="text-xs text-[#6B6B6B] text-center">
                  Ou fale pelo WhatsApp:{" "}
                  <a
                    href="https://wa.me/5521966684167"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C4933A] hover:underline"
                  >
                    (21) 96668-4167
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
