import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DM_Serif_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Borges Assessoria Imobiliária | Taquara, Jacarepaguá - RJ",
  description:
    "30 anos de experiência em compra, venda e legalização de imóveis em Jacarepaguá e região. CRECI 40466. Assessoria jurídica especializada.",
  keywords: "imobiliária Jacarepaguá, apartamentos Taquara, imóveis Jacarepaguá, assessoria imobiliária RJ",
  openGraph: {
    title: "Borges Assessoria Imobiliária",
    description: "30 anos de experiência. CRECI 40466. Taquara, Jacarepaguá - RJ",
    type: "website",
    locale: "pt_BR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  )
}
