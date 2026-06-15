import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Termos de Serviço | Borges Assessoria Imobiliária",
  description:
    "Leia os termos e condições de uso do site da Borges Assessoria Imobiliária e Jurídica.",
}

export default function TermosDeServico() {
  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 border-b border-[#E5E0D8] pb-8">
            <p className="text-xs tracking-[4px] uppercase text-[#C4933A] mb-4">
              Borges Assessoria
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-[#1C0F07] italic font-normal mb-4">
              Termos de Serviço
            </h1>
            <p className="text-sm text-[#666] mt-2">
              Última atualização: 15 de junho de 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral max-w-none text-[#333] leading-relaxed space-y-10">

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                1. Aceitação dos termos
              </h2>
              <p>
                Ao acessar e utilizar o site{" "}
                <strong>primeborgesimoveis.com</strong>, você concorda com estes Termos de Serviço
                e com nossa{" "}
                <a href="/politica-de-privacidade" className="text-[#C4933A] hover:underline">
                  Política de Privacidade
                </a>
                . Se não concordar com qualquer disposição, por favor, não utilize este site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                2. Sobre a empresa
              </h2>
              <p>
                A <strong>Borges Assessoria Imobiliária e Jurídica</strong>, CRECI 40466, é uma
                empresa especializada em compra, venda e legalização de imóveis, com 30 anos de
                atuação em Jacarepaguá e região (Rio de Janeiro - RJ). Os serviços de assessoria
                jurídica são prestados pelas advogadas Dra. Kátia Terra e Dra. Fernanda Borges.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                3. Uso do site
              </h2>
              <p>Este site é destinado a:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Apresentar imóveis disponíveis para venda.</li>
                <li>Fornecer informações sobre serviços imobiliários e jurídicos.</li>
                <li>Facilitar o contato entre clientes e a equipe da Borges Assessoria.</li>
              </ul>
              <p className="mt-3">É proibido:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Usar o site para fins ilegais ou não autorizados.</li>
                <li>Reproduzir, distribuir ou modificar conteúdo sem autorização prévia.</li>
                <li>Tentar comprometer a segurança ou integridade do site.</li>
                <li>Enviar spam ou comunicações não solicitadas por meio dos formulários.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                4. Informações sobre imóveis
              </h2>
              <p>
                As informações sobre imóveis (preços, características, disponibilidade) são fornecidas
                como referência e podem ser alteradas sem aviso prévio. Fotos e descrições são
                meramente ilustrativas. Confirme todos os detalhes diretamente com nossa equipe
                antes de tomar qualquer decisão de compra.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                5. Assessoria jurídica
              </h2>
              <p>
                O conteúdo deste site tem caráter informativo e não constitui parecer jurídico
                ou consultoria legal. Para orientação específica ao seu caso, contate diretamente
                nossa equipe de advogadas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                6. Propriedade intelectual
              </h2>
              <p>
                Todo o conteúdo deste site — textos, imagens, logotipo, layout e código — é de
                propriedade da Borges Assessoria Imobiliária e Jurídica ou de seus licenciantes,
                protegido pela legislação brasileira de direitos autorais. Reprodução parcial
                ou total sem autorização é proibida.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                7. Links externos
              </h2>
              <p>
                Este site pode conter links para sites de terceiros (WhatsApp, redes sociais, etc.).
                Não nos responsabilizamos pelo conteúdo, políticas ou práticas desses sites.
                O acesso a links externos é por conta e risco do usuário.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                8. Limitação de responsabilidade
              </h2>
              <p>
                A Borges Assessoria não se responsabiliza por danos diretos ou indiretos
                decorrentes do uso ou impossibilidade de uso deste site, incluindo interrupções,
                erros ou omissões no conteúdo, exceto nos casos previstos pela legislação
                brasileira de defesa do consumidor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                9. Alterações nos termos
              </h2>
              <p>
                Reservamo-nos o direito de alterar estes Termos de Serviço a qualquer momento.
                A data de "última atualização" no topo desta página indica a revisão mais recente.
                O uso continuado do site após alterações implica aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                10. Lei aplicável e foro
              </h2>
              <p>
                Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca
                do Rio de Janeiro — RJ para dirimir quaisquer controvérsias decorrentes deste
                instrumento, com renúncia a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                11. Contato
              </h2>
              <p>
                Borges Assessoria Imobiliária e Jurídica<br />
                Rua Araguaia, 1055 sala 303 — Freguesia, Jacarepaguá, RJ<br />
                CRECI 40466<br />
                <a href="tel:+5521979136060" className="text-[#C4933A] hover:underline">
                  (21) 97913-6060
                </a>
                {" "}·{" "}
                <a href="mailto:contato@primeborgesimoveis.com" className="text-[#C4933A] hover:underline">
                  contato@primeborgesimoveis.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
