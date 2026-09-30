'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './landing.module.css'

// Default is the current contact number; override with NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, with country code).
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '14389796085').replace(/\D/g, '')
const WHATSAPP_MESSAGE = 'Olá Jeferson, gostaria de enviar 12 faturas de uma unidade para o diagnóstico-piloto.'
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
const MAIL_HREF = 'mailto:contato@data-joule.com'

const CTA_LABEL = 'Enviar as faturas pelo WhatsApp'
const CTA_NOTE = 'Diagnóstico-piloto sem custo para 1 a 3 unidades.'

const CHECKS = [
  'Demanda contratada versus registrada e ultrapassagem, em 13 ciclos de faturamento',
  'Energia reativa excedente e UFER (fator de potência)',
  'Enquadramento tarifário Verde ou Azul, calculado com a tarifa homologada da sua distribuidora',
  'Erros de faturamento, cobranças em duplicidade e tributos aplicados indevidamente',
  'ICMS sobre demanda contratada não utilizada (STF, Tema 176 de repercussão geral)',
]

const STEPS = [
  'Você envia 12 faturas consecutivas em PDF',
  'Em 5 dias úteis, relatório técnico de 2 páginas por unidade, assinado por engenheiro',
  'Você decide o encaminhamento: solicitação à distribuidora, ajuste técnico ou medida jurídica. Modelo de ofício incluído.',
]

const BASIS = [
  {
    ref: 'REN ANEEL 1.000/2021',
    text: 'Regras de faturamento do Grupo A: demanda, ultrapassagem, reativo e modalidades tarifárias.',
  },
  {
    ref: 'REH ANEEL vigente',
    text: 'Tarifas homologadas da sua distribuidora, aplicadas ciclo a ciclo — não médias nem valores de tabela genérica.',
  },
  {
    ref: 'STF · Tema 176',
    text: 'Repercussão geral: ICMS não incide sobre demanda contratada e não utilizada.',
  },
  {
    ref: 'CREA-PR · ART',
    text: 'Relatório assinado por engenheiro registrado, com Anotação de Responsabilidade Técnica quando exigida.',
  },
]

const FAQ = [
  {
    q: 'Preciso enviar faturas de todas as unidades?',
    a: 'Não. Uma unidade é suficiente para o diagnóstico-piloto; recomendamos a de maior consumo.',
  },
  {
    q: 'É necessária visita técnica?',
    a: 'Não. A análise é feita integralmente a partir das faturas e, se autorizado, dos dados do portal da distribuidora.',
  },
  {
    q: 'Já tenho consultoria ou estou no mercado livre. A auditoria ainda se aplica?',
    a: 'Sim. Demanda, energia reativa e modalidade tarifária continuam sendo faturadas pela distribuidora, dentro ou fora do mercado livre. A auditoria também funciona como contraprova independente da consultoria atual.',
  },
  {
    q: 'Como são tratados os meus dados?',
    a: 'Uso restrito à análise, conforme a LGPD. Caso não haja continuidade, as faturas são excluídas ao final do diagnóstico.',
  },
]

// Share of the annual peak demand left unused in a typical month (median per segment).
// Source: BDGD/ANEEL 2025 (Copel-DIS), A4 units active with 12 months of measurement and no
// self-generation; months 1–11 (DEM_12 anomalous in the 2025 file). See auditoria-fatura/bdgd_analise.md.
const IDLE_SHARE = [
  { seg: 'Educação', units: 468, share: 0.296 },
  { seg: 'Hospitais', units: 241, share: 0.206 },
  { seg: 'Todas as unidades A4', units: 11780, share: 0.164, ref: true },
  { seg: 'Varejo', units: 1581, share: 0.127 },
  { seg: 'Supermercados', units: 870, share: 0.117 },
  { seg: 'Indústria', units: 3722, share: 0.111 },
]
const CHART = { w: 400, h: 224, left: 118, right: 372, top: 16, rowH: 34, barH: 18 }

function IdleShareChart() {
  const { w, h, left, right, top, rowH, barH } = CHART
  const span = right - left
  const max = 0.35
  const x = (v: number) => left + (span * v) / max
  const pct = (v: number) => `${Math.round(v * 100)}%`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={styles.chart}
      role="img"
      aria-label="Parcela da demanda de pico sem uso em um mês típico, por segmento, Paraná 2025: educação 30%, hospitais 21%, todas as unidades 16%, varejo 13%, supermercados 12%, indústria 11%"
    >
      {[0.1, 0.2, 0.3].map((v) => (
        <line key={v} x1={x(v)} x2={x(v)} y1={top - 4} y2={top + rowH * IDLE_SHARE.length} stroke="#ECE7E0" />
      ))}
      {IDLE_SHARE.map((d, i) => {
        const y = top + i * rowH
        const fill = d.ref ? '#B5561A' : '#2B2926'
        return (
          <g key={d.seg}>
            <title>{`${d.seg}: ${pct(d.share)} da demanda de pico sem uso (${d.units.toLocaleString('pt-BR')} unidades)`}</title>
            <text x={left - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize="12" fontWeight={d.ref ? 600 : 400} fill="#1A1917">
              {d.seg}
            </text>
            <rect x={left} y={y} width={Math.max(x(d.share) - left, 4)} height={barH} rx="3" fill={fill} />
            <text x={x(d.share) + 6} y={y + barH / 2 + 4} fontSize="12" fontWeight="600" fill="#1A1917">
              {pct(d.share)}
            </text>
          </g>
        )
      })}
      <line x1={left} x2={left} y1={top - 4} y2={top + rowH * IDLE_SHARE.length} stroke="#B8B1A7" />
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

function PrimaryCta({ className, tabIndex }: { className?: string; tabIndex?: number }) {
  return (
    <a href={WA_HREF} className={className ?? styles.ctaPrimary} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>
      <WhatsAppIcon />
      {CTA_LABEL}
    </a>
  )
}

function CtaBlock({ className, anchorRef }: { className?: string; anchorRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={anchorRef} className={`${styles.ctaStack} ${className ?? ''}`}>
      <PrimaryCta />
      <a href={MAIL_HREF} className={styles.ctaSecondary}>ou enviar por e-mail</a>
      <p className={styles.ctaNote}>{CTA_NOTE}</p>
    </div>
  )
}

export default function LandingPage() {
  const [open, setOpen] = useState<number>(0)
  const [ctaOnScreen, setCtaOnScreen] = useState(true)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const finalCtaRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  // Show the sticky WhatsApp bar only while none of the in-page CTAs (or the footer) is visible,
  // so it never stacks under the hero button on small screens.
  useEffect(() => {
    const targets = [heroCtaRef.current, finalCtaRef.current, footerRef.current].filter(
      (el): el is HTMLElement => el !== null,
    )
    if (!targets.length || typeof IntersectionObserver === 'undefined') return
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target)
        else visible.delete(e.target)
      }
      setCtaOnScreen(visible.size > 0)
    })
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

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
          <h1 className={styles.h1}>Sua conta de energia pode estar correta e, ainda assim, custar mais do que deveria.</h1>
          <div className={styles.heroCopy}>
            <p className={styles.lede}>
              Identificamos demanda contratada em excesso, energia reativa, modalidade tarifária inadequada e erros de
              faturamento em consumidores de média tensão — indústrias, supermercados, hospitais, shoppings e redes de
              varejo. Envie 12 faturas de uma unidade; em 5 dias úteis você recebe o valor recuperável, sem visita
              técnica, sem equipamentos e sem custo.
            </p>
            <CtaBlock anchorRef={heroCtaRef} />
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

      <section className={styles.sectionAlt} aria-label="Dados públicos do Paraná">
        <div className={`${styles.container} ${styles.section}`}>
          <p className={styles.eyebrow}>Dados públicos — 11.780 unidades de média tensão no Paraná (BDGD/ANEEL 2025)</p>
          <div className={styles.caseRow}>
            <div className={styles.caseStats}>
              <div>
                <div className={styles.statHead}>16% da demanda de pico fica sem uso em um mês típico</div>
                <div className={styles.statSub}>
                  mediana das unidades A4 da Copel com 12 meses de medição — mesmo com o contrato certo, o kW do mês de pico é pago o ano inteiro
                </div>
              </div>
              <div>
                <div className={styles.statBig}>R$ 122 mi/ano</div>
                <div className={styles.statBigSub}>pagos em demanda ociosa no estado, à tarifa da Copel, antes de qualquer análise de contrato</div>
              </div>
            </div>
            <figure className={`${styles.card} ${styles.figure}`}>
              <IdleShareChart />
              <figcaption className={styles.figcaption}>
                Mediana por segmento; sobra = 1 − demanda média mensal ÷ pico anual. BDGD/ANEEL ano-base 2025, Copel-DIS:
                unidades A4 ativas, 12 meses de medição, sem geração própria, janeiro a novembro. Tarifa TUSD demanda A4
                Verde R$ 20,78/kW (REH 3.472/2025), sem impostos.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="escopo">
        <h2 id="escopo" className={styles.h2}>Escopo da auditoria</h2>
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
            <div className={styles.calloutLabel}>Sob demanda</div>
            <span className={styles.calloutText}>
              Parecer técnico independente sobre propostas de migração ao mercado livre de energia
            </span>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.howSection}`} aria-labelledby="como-conduzimos">
        <h2 id="como-conduzimos" className={styles.h2}>Como conduzimos a auditoria</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((text, i) => (
            <div key={i} className={`${styles.card} ${styles.step}`}>
              <div className={styles.stepNum}>{i + 1}</div>
              <p className={styles.stepText}>{text}</p>
            </div>
          ))}
        </div>
        <p className={styles.stepsNote}>
          Sem visita técnica, sem instalação de equipamentos e sem integração com seus sistemas.
        </p>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="investimento">
        <div className={`${styles.container} ${styles.section}`}>
          <h2 id="investimento" className={styles.h2}>Investimento</h2>
          <div className={styles.priceGrid}>
            <div className={`${styles.card} ${styles.priceCard}`}>
              <div className={styles.priceLabel}>Diagnóstico-piloto</div>
              <div className={`${styles.priceValue} ${styles.priceValueAccent}`}>R$ 0</div>
              <p>Até 3 unidades, sem custo. Em contrapartida, autorização para divulgar o caso de forma anonimizada.</p>
            </div>
            <div className={`${styles.card} ${styles.priceCard}`}>
              <div className={styles.priceLabel}>Continuidade, a seu critério</div>
              <div className={styles.priceValue}>25%</div>
              <p>
                da economia comprovada nas 12 faturas seguintes, ou assinatura mensal por unidade para monitoramento
                contínuo das faturas.
              </p>
            </div>
          </div>
          <p className={styles.priceNote}>
            Se não houver valor a recuperar, você recebe a confirmação técnica de que o faturamento está correto — sem
            cobrança.
          </p>
        </div>
      </section>

      <section className={`${styles.container} ${styles.manifesto}`} aria-labelledby="independencia">
        <div className={styles.manifestoInner}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 id="independencia" className={styles.manifestoTitle}>Independência como método</h2>
          <p className={styles.manifestoText}>
            Não comercializamos energia, sistemas fotovoltaicos nem migração ao mercado livre. Não recebemos comissão de
            comercializadoras, integradoras ou fabricantes. Nossa única remuneração vem do cliente — por isso o parecer
            é técnico, e responde apenas a você.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="base-tecnica">
        <div className={`${styles.container} ${styles.section}`}>
          <h2 id="base-tecnica" className={`${styles.h2} ${styles.basisTitle}`}>Base técnica e regulatória</h2>
          <p className={styles.basisLede}>
            Cada apontamento do relatório cita a norma, a tarifa homologada ou a decisão judicial que o fundamenta.
          </p>
          <div className={styles.basisGrid}>
            {BASIS.map((item) => (
              <div key={item.ref} className={`${styles.card} ${styles.basisCard}`}>
                <span className={styles.basisRef}>{item.ref}</span>
                <span className={styles.basisText}>{item.text}</span>
              </div>
            ))}
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
            Envie 12 faturas de uma unidade. Em 5 dias úteis, você sabe exatamente quanto pode recuperar.
          </h2>
          <CtaBlock className={styles.finalCtaStack} anchorRef={finalCtaRef} />
        </div>
      </section>

      <footer ref={footerRef} className={styles.footer}>
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
            <a href={MAIL_HREF} className={styles.footerMail}>contato@data-joule.com</a>
            <Link href="/privacidade" className={styles.footerLink}>Política de privacidade (LGPD)</Link>
          </div>
        </div>
      </footer>

      <div className={`${styles.sticky} ${ctaOnScreen ? styles.stickyHidden : ''}`} aria-hidden={ctaOnScreen}>
        <PrimaryCta className={styles.stickyCta} tabIndex={ctaOnScreen ? -1 : undefined} />
      </div>
    </div>
  )
}
