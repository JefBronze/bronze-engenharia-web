import type { Metadata } from 'next'
import { Fragment_Mono, Source_Sans_3, Source_Serif_4 } from 'next/font/google'
import styles from './auditoria.module.css'

// Fonts are self-hosted through next/font: the site's CSP only allows
// font-src 'self', so a Google Fonts <link> would be blocked.
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

const TITLE = 'Data Joule — Auditoria de fatura de energia Grupo A'
const DESCRIPTION =
  'Auditoria de fatura Grupo A para redes de supermercados. Mande 12 contas de uma loja; em 5 dias úteis devolvemos quanto dá para recuperar — sem visita, sem sensor, sem custo.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://data-joule.com.br/auditoria' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://data-joule.com.br/auditoria',
    siteName: 'Data Joule',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
}

export default function AuditoriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="pt-BR" className={`${sans.variable} ${serif.variable} ${mono.variable} ${styles.root}`}>
      {children}
    </div>
  )
}
