import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Política de Privacidade | Borges Assessoria Imobiliária",
  description:
    "Saiba como a Borges Assessoria Imobiliária e Jurídica coleta, usa e protege seus dados pessoais.",
}

export default function PoliticaDePrivacidade() {
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
              Política de Privacidade
            </h1>
            <p className="text-sm text-[#666] mt-2">
              Última atualização: 15 de junho de 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral max-w-none text-[#333] leading-relaxed space-y-10">

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                1. Quem somos
              </h2>
              <p>
                A <strong>Borges Assessoria Imobiliária e Jurídica</strong>, inscrita no CRECI sob o nº 40466,
                com sede na Rua Araguaia, 1055, sala 303 — Araguaia Premium Office, Freguesia, Jacarepaguá,
                Rio de Janeiro — RJ, é responsável pelo tratamento dos dados pessoais coletados neste site.
              </p>
              <p className="mt-3">
                Dúvidas sobre esta política podem ser enviadas para:{" "}
                <a href="mailto:contato@primeborgesimoveis.com" className="text-[#C4933A] hover:underline">
                  contato@primeborgesimoveis.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                2. Quais dados coletamos
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Dados de contato:</strong> nome, e-mail e telefone informados voluntariamente
                  ao preencher nosso formulário de contato.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas acessadas
                  e tempo de permanência — coletados automaticamente por cookies e ferramentas de análise.
                </li>
                <li>
                  <strong>Dados de redes sociais:</strong> caso nos contate via WhatsApp ou Facebook,
                  os dados compartilhados nessas plataformas seguem as políticas de privacidade delas.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                3. Como usamos seus dados
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Responder às suas mensagens e solicitações de atendimento.</li>
                <li>Enviar informações sobre imóveis disponíveis quando solicitado.</li>
                <li>Melhorar a experiência de navegação no site.</li>
                <li>Veicular anúncios relevantes em plataformas como Meta (Facebook/Instagram).</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                4. Base legal (LGPD)
              </h2>
              <p>
                O tratamento de dados realizado por nós baseia-se nas seguintes hipóteses previstas
                na Lei Geral de Proteção de Dados (Lei nº 13.709/2018):
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>
                  <strong>Consentimento</strong> — para envio de comunicações de marketing.
                </li>
                <li>
                  <strong>Execução de contrato</strong> — para atendimento de solicitações e prestação
                  dos serviços contratados.
                </li>
                <li>
                  <strong>Legítimo interesse</strong> — para melhoria do site e análises de desempenho.
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal</strong> — quando exigido por lei.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                5. Compartilhamento de dados
              </h2>
              <p>
                Não vendemos nem alugamos seus dados pessoais a terceiros. Podemos compartilhá-los
                somente com:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>
                  <strong>Prestadores de serviço</strong> que operam em nosso nome (hospedagem, e-mail
                  marketing, análise de dados), sob obrigação de confidencialidade.
                </li>
                <li>
                  <strong>Plataformas de anúncio</strong> (Meta Ads) para exibição de publicidade
                  segmentada, mediante seu consentimento.
                </li>
                <li>
                  <strong>Autoridades públicas</strong> quando exigido por lei ou decisão judicial.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                6. Cookies
              </h2>
              <p>
                Utilizamos cookies para melhorar sua experiência de navegação e analisar o desempenho
                do site. Você pode gerenciar ou desativar cookies nas configurações do seu navegador,
                mas isso pode afetar algumas funcionalidades do site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                7. Por quanto tempo guardamos seus dados
              </h2>
              <p>
                Mantemos seus dados pelo tempo necessário para a finalidade que motivou a coleta
                ou enquanto houver relação contratual. Após esse período, os dados são excluídos
                ou anonimizados, salvo obrigação legal de retenção.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                8. Seus direitos
              </h2>
              <p>Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Confirmar se tratamos seus dados pessoais.</li>
                <li>Acessar os dados que temos sobre você.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a exclusão dos dados tratados com base em consentimento.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
                <li>Opor-se a tratamentos realizados com base em legítimo interesse.</li>
              </ul>
              <p className="mt-3">
                Para exercer seus direitos, entre em contato:{" "}
                <a href="mailto:contato@primeborgesimoveis.com" className="text-[#C4933A] hover:underline">
                  contato@primeborgesimoveis.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                9. Segurança
              </h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
                contra acesso não autorizado, alteração, divulgação ou destruição. Nosso site
                usa conexão segura (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-[#1C0F07] italic font-normal mb-3">
                10. Alterações nesta política
              </h2>
              <p>
                Esta política pode ser atualizada periodicamente. A data de "última atualização"
                no topo indica quando houve a revisão mais recente. Recomendamos verificar
                esta página regularmente.
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
