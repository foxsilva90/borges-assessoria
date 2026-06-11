export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#120A04] text-white/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-white mb-3">Borges Assessoria</p>
            <p className="text-sm leading-relaxed mb-4">
              30 anos de experiência em assessoria imobiliária e jurídica
              em Jacarepaguá e região. CRECI 40466.
            </p>
            <p className="text-xs text-white/40">
              Rua Araguaia, 1055 sala 303 — Freguesia, Jacarepaguá, RJ
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
              Navegação
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Imóveis", href: "#imoveis" },
                { label: "Sobre Nós", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Contato", href: "#contato" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#C4933A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
              Contato
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/5521979136060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C4933A] transition-colors"
                >
                  (21) 97913-6060
                </a>
              </li>
              <li>
                <a
                  href="tel:+552196668-4167"
                  className="hover:text-[#C4933A] transition-colors"
                >
                  (21) 96668-4167
                </a>
              </li>
              <li className="pt-2 text-white/40 text-xs">
                Dra. Kátia Terra<br />
                Dra. Fernanda Borges
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {year} Borges Assessoria Imobiliária e Jurídica. Todos os direitos reservados.</p>
          <p>CRECI 40466 · Jacarepaguá, Rio de Janeiro</p>
        </div>
      </div>
    </footer>
  )
}
