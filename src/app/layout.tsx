import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DM_Serif_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const META_PIXEL_ID = "993889716691067"

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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  )
}
