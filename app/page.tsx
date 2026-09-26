'use client'

import { useState } from 'react'
import styles from './landing.module.css'

// Placeholder from the design; override with NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, with country code).
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5541999999999').replace(/\D/g, '')
const WHATSAPP_MESSAGE = 'Olá Jeferson, quero mandar as 12 contas de uma loja para o piloto gratuito.'
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
const MAIL_HREF = 'mailto:contato@datajoule.com.br'

const CHECKS = [
  'Demanda contratada × usada de fato e multas por ultrapassagem (13 meses)',
  'Energia reativa e UFER',
  'Modalidade Verde × Azul: qual sai mais barata na tarifa atual da sua distribuidora',
  'Erros de faturamento, de leitura e cobranças em duplicidade',
  'ICMS pago sobre demanda não utilizada (STF, Tema 176)',
]

const STEPS = [
  'Você manda 12 faturas da loja em PDF',
  'Em 5 dias úteis, relatório de 2 páginas por loja, com o valor a recuperar',
  'Você decide o caminho: pedido à distribuidora, pequeno investimento ou via jurídica. Modelo de ofício já incluído.',
]

const FAQ = [
  {
    q: 'Preciso mandar contas de todas as lojas?',
    a: 'Não. Uma loja basta para o piloto — de preferência a de conta mais alta.',
  },
  {
    q: 'Vocês precisam vir até a loja?',
    a: 'Não. Tudo sai das próprias faturas e, se você autorizar, do portal da distribuidora. Ninguém entra na loja.',
  },
  {
    q: 'E se eu já tiver consultoria ou estiver no mercado livre?',
    a: 'Mesmo no mercado livre, demanda, reativo e modalidade continuam na conta da distribuidora. A auditoria vale do mesmo jeito.',
  },
  {
    q: 'Meus dados ficam seguros?',
    a: 'Sim. As faturas servem só para a análise, conforme a LGPD. Se você não seguir, apagamos tudo.',
  },
]

// Registered demand, kW, ago/2017 → ago/2018 (13 months), anonymised real invoice.
const DEMAND_KW = [312, 298, 340, 388, 402, 459, 431, 376, 351, 226, 264, 305, 333]
const CONTRACTED_KW = 1500
const CHART = { w: 400, h: 240, left: 40, right: 392, top: 31.9, base: 210, barW: 18 }

function DemandChart() {
  const { w, h, left, right, top, base, barW } = CHART
  const y = (kw: number) => base - ((base - top) * kw) / CONTRACTED_KW
  const span = right - left
  const slot = span / DEMAND_KW.length
  const x = (i: number) => left + 4.5 + i * slot
  const peakIdx = DEMAND_KW.indexOf(Math.max(...DEMAND_KW))
  const peakX = x(peakIdx) + barW / 2
  const months = ['ago/17', 'out', 'dez', 'fev', 'abr', 'jun', 'ago/18']

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={styles.chart}
      role="img"
      aria-label="Demanda contratada 1.500 kW versus demanda registrada entre 226 e 459 kW, ago/2017 a ago/2018"
    >
      <text x={left - 4} y={14} textAnchor="end" fontSize="13" fill="#6B665F">kW</text>
      {[500, 1000].map((kw) => (
        <line key={kw} x1={left} x2={right} y1={y(kw)} y2={y(kw)} stroke="#ECE7E0" />
      ))}
      {[0, 500, 1000, 1500].map((kw) => (
        <text key={kw} x={left - 4} y={y(kw) + 3} textAnchor="end" fontSize="13" fill="#6B665F">
          {kw.toLocaleString('pt-BR')}
        </text>
      ))}
      <rect x={left} y={y(CONTRACTED_KW)} width={span} height={y(DEMAND_KW[peakIdx]) - y(CONTRACTED_KW)} fill="#B5561A" opacity="0.08" />
      <text x={left + span / 2} y={98} textAnchor="middle" fontSize="14" fontStyle="italic" fill="#8A4212">
        demanda paga e não usada
      </text>
      <line x1={left} x2={right} y1={y(CONTRACTED_KW)} y2={y(CONTRACTED_KW)} stroke="#B5561A" strokeWidth="2" />
      <text x={right} y={y(CONTRACTED_KW) - 7} textAnchor="end" fontSize="14" fontWeight="600" fill="#B5561A">
        contratado: 1.500 kW
      </text>
      {DEMAND_KW.map((kw, i) => (
        <rect key={i} x={x(i)} y={y(kw)} width={barW} height={base - y(kw)} fill="#2B2926" />
      ))}
      <line x1={peakX} x2={peakX} y1={140} y2={y(DEMAND_KW[peakIdx]) - 2} stroke="#2B2926" strokeWidth="1" />
      <text x={peakX} y={135} textAnchor="middle" fontSize="14" fontWeight="600" fill="#2B2926">
        máximo registrado: 459 kW
      </text>
      <line x1={left} x2={right} y1={base} y2={base} stroke="#B8B1A7" />
      {months.map((m, i) => (
        <text key={m} x={x(i * 2) + barW / 2} y={base + 18} textAnchor="middle" fontSize="13" fill="#6B665F">
          {m}
        </text>
      ))}
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8.2 19.1L4 20z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <path
        d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.5l-.5.6c-.1.1-.2.3 0 .5a6 6 0 0 0 2.9 2.6c.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.4.4a2 2 0 0 1-1.4 2c-.9.3-2.4-.2-3.8-1.1a9 9 0 0 1-3-3.2c-.7-1.2-.8-2.4-.2-3.8z"
        fill="#fff"
      />
    </svg>
  )
}

function CheckIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className={styles.checkIcon}>
      {filled ? (
        <circle cx="11" cy="11" r="9.5" fill="#B5561A" />
      ) : (
        <circle cx="11" cy="11" r="9.5" stroke="#6B665F" strokeWidth="1.5" />
      )}
      <path
        d="M7 11.5l2.6 2.5L15 8.5"
        stroke={filled ? '#fff' : '#6B665F'}
        strokeWidth={filled ? 1.8 : 1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Logo({ size, ink, accent }: { size: number; ink: string; accent: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" style={{ flex: 'none' }}>
      <rect x="4" y="22" width="6" height="10" fill={ink} />
      <rect x="13" y="16" width="6" height="16" fill={ink} />
      <rect x="22" y="12" width="6" height="20" fill={ink} />
      <rect x="2" y="5" width="32" height="3" fill={accent} />
    </svg>
  )
}

function PrimaryCta({ className }: { className?: string }) {
  return (
    <a href={WA_HREF} className={className ?? styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon />
      Mandar as contas pelo WhatsApp
    </a>
  )
}

function CtaBlock({ className }: { className?: string }) {
  return (
    <div className={`${styles.ctaStack} ${className ?? ''}`}>
      <PrimaryCta />
      <a href={MAIL_HREF} className={styles.ctaSecondary}>ou mandar por e-mail</a>
      <p className={styles.ctaNote}>Piloto gratuito para 1 a 3 lojas.</p>
    </div>
  )
}

export default function AuditoriaPage() {
  const [open, setOpen] = useState<number>(0)

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <span className={styles.brand}>
            <Logo size={26} ink="#1A1917" accent="#B5561A" />
            <span className={styles.wordmark}>
              Data<span className={styles.wordmarkAccent}>_</span>Joule
            </span>
          </span>
          <a href={WA_HREF} className={styles.headerLink} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <section className={`${styles.container} ${styles.hero}`} aria-label="Apresentação">
        <div className={styles.heroGrid}>
          <h1 className={styles.h1}>Quanto da conta de luz das suas lojas você paga à toa?</h1>
          <div className={styles.heroCopy}>
            <p className={styles.lede}>
              Auditoria da conta de luz de média tensão (Grupo A) para redes de supermercados. Mande 12 contas de uma
              loja e, em 5 dias úteis, você sabe em reais quanto dá para recuperar — sem visita, sem sensor, sem custo.
            </p>
            <CtaBlock />
          </div>
        </div>
        <div className={styles.byline}>
          <div className={styles.avatar} aria-hidden="true">JB</div>
          <div className={styles.bylineText}>
            <span>
              <strong>Jeferson Bronze</strong> · Engenheiro de energia · CREA-PR 194835/D
            </span>
            <span className={styles.muted}>Bronze Engenharia de Energia · CNPJ 19.824.419/0001-96 · Curitiba/PR</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-label="Caso real">
        <div className={`${styles.container} ${styles.section}`}>
          <p className={styles.eyebrow}>Caso real — cliente da Enel</p>
          <div className={styles.caseRow}>
            <div className={styles.caseStats}>
              <div>
                <div className={styles.statHead}>1.500 kW contratados · 459 kW usados</div>
                <div className={styles.statSub}>demanda contratada × pico real de uso em 13 meses</div>
              </div>
              <div>
                <div className={styles.statBig}>R$ 240 mil/ano</div>
                <div className={styles.statBigSub}>em demanda paga à toa</div>
              </div>
            </div>
            <figure className={`${styles.card} ${styles.figure}`}>
              <DemandChart />
              <figcaption className={styles.figcaption}>
                Dados anonimizados de fatura real, ago/2017–ago/2018, tarifa REH ANEEL vigente.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="verificamos">
        <h2 id="verificamos" className={styles.h2}>O que conferimos em cada fatura</h2>
        <div className={styles.checklist}>
          {CHECKS.map((item) => (
            <div key={item} className={styles.checkItem}>
              <CheckIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className={styles.callout}>
          <CheckIcon filled />
          <div>
            <div className={styles.calloutLabel}>Também</div>
            <span className={styles.calloutText}>
              Segunda opinião isenta sobre as propostas de mercado livre que chegam na sua mesa
            </span>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.howSection}`} aria-labelledby="como-funciona">
        <h2 id="como-funciona" className={styles.h2}>Como funciona</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((text, i) => (
            <div key={i} className={`${styles.card} ${styles.step}`}>
              <div className={styles.stepNum}>{i + 1}</div>
              <p className={styles.stepText}>{text}</p>
            </div>
          ))}
        </div>
        <p className={styles.stepsNote}>Sem visita à loja, sem instalar equipamento, sem mexer nos seus sistemas.</p>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="quanto-custa">
        <div className={`${styles.container} ${styles.section}`}>
          <h2 id="quanto-custa" className={styles.h2}>Quanto custa</h2>
          <div className={styles.priceGrid}>
            <div className={`${styles.card} ${styles.priceCard}`}>
              <div className={styles.priceLabel}>Piloto</div>
              <div className={`${styles.priceValue} ${styles.priceValueAccent}`}>R$ 0</div>
              <p>1 a 3 lojas. Em troca, só a autorização para citar o caso sem identificar a sua rede.</p>
            </div>
            <div className={`${styles.card} ${styles.priceCard}`}>
              <div className={styles.priceLabel}>Depois, se quiser seguir</div>
              <div className={styles.priceValue}>25%</div>
              <p>da economia comprovada nas 12 faturas seguintes — ou uma assinatura mensal por loja, para acompanhar as contas todo mês.</p>
            </div>
          </div>
          <p className={styles.priceNote}>Se não acharmos nada, você fica com a certeza de que a conta está certa. Sem custo.</p>
        </div>
      </section>

      <section className={`${styles.container} ${styles.manifesto}`} aria-labelledby="independente">
        <div className={styles.manifestoInner}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 id="independente" className={styles.manifestoTitle}>Independente de verdade</h2>
          <p className={styles.manifestoText}>
            Não vendemos energia, painel solar nem migração para o mercado livre. Não recebemos comissão de ninguém.
            Quem paga é você — e a resposta é só sua.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-label="Quem somos">
        <div className={`${styles.container} ${styles.section} ${styles.whoRow}`}>
          <div className={styles.photoSlot} role="img" aria-label="Foto de Jeferson Bronze">
            foto de Jeferson
          </div>
          <div className={styles.whoText}>
            <div className={styles.whoName}>Jeferson Bronze</div>
            <div className={styles.whoRole}>Engenheiro de energia · CREA-PR 194835/D</div>
            <div className={styles.whoCompany}>Bronze Engenharia de Energia · CNPJ 19.824.419/0001-96 · Curitiba/PR</div>
            <p className={styles.whoBio}>
              Antes disso, construí e operei um laboratório de resposta à demanda (OpenADR 3.0) ligado aos sinais do ONS
              e da Hydro-Québec. É essa leitura de carga que aplico às suas contas.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="faq">
        <h2 id="faq" className={`${styles.h2} ${styles.faqTitle}`}>Perguntas frequentes</h2>
        <div className={styles.faqList}>
          {FAQ.map((item, i) => {
            const isOpen = open === i
            const panelId = `faq-panel-${i}`
            return (
              <div key={item.q} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqButton}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen((cur) => (cur === i ? -1 : i))}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqSign} aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <p id={panelId} className={styles.faqAnswer}>{item.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.finalCta} aria-label="Chamada final">
        <div className={`${styles.container} ${styles.finalCtaInner}`}>
          <h2 className={styles.finalTitle}>
            Mande 12 contas de uma loja. Em 5 dias úteis, você sabe, em reais, quanto dá para recuperar.
          </h2>
          <CtaBlock className={styles.finalCtaStack} />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div className={styles.footerCol}>
            <span className={styles.brand}>
              <Logo size={24} ink="#FFFFFF" accent="#E8A46C" />
              <span className={`${styles.wordmark} ${styles.footerWordmark}`}>
                Data<span className={styles.footerWordmarkAccent}>_</span>Joule
              </span>
            </span>
            <span>Bronze Engenharia de Energia · CNPJ 19.824.419/0001-96 · Curitiba/PR</span>
          </div>
          <div className={styles.footerCol}>
            <a href={MAIL_HREF} className={styles.footerMail}>contato@datajoule.com.br</a>
            <a href="#" className={styles.footerLink}>Política de privacidade (LGPD)</a>
          </div>
        </div>
      </footer>

      <div className={styles.sticky}>
        <PrimaryCta className={styles.stickyCta} />
      </div>
    </div>
  )
}
