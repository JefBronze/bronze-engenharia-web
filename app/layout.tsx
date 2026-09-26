import type { Metadata, Viewport } from 'next'
import { Fragment_Mono, Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Fonts are self-hosted through next/font: the CSP only allows font-src 'self',
// so a Google Fonts <link> would be blocked.
const sans = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--dj-font-sans',
  display: 'swap',
})

const serif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--dj-font-serif',
  display: 'swap',
})

const mono = Fragment_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--dj-font-mono',
  display: 'swap',
})

const SITE_URL = 'https://data-joule.com'
const TITLE = 'Data Joule — Auditoria de fatura de energia Grupo A'
const DESCRIPTION =
  'Auditoria de fatura Grupo A para redes de supermercados. Mande 12 contas de uma loja; em 5 dias úteis devolvemos quanto dá para recuperar — sem visita, sem sensor, sem custo.'

export const viewport: Viewport = {
  themeColor: '#FBFAF8',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'auditoria de fatura de energia',
    'Grupo A',
    'demanda contratada',
    'energia reativa',
    'UFER',
    'tarifa verde',
    'tarifa azul',
    'supermercados',
    'Curitiba',
  ],
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Data Joule',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
