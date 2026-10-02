'use client'

import { useMemo, useState } from 'react'
import styles from './landing.module.css'
import { COPEL_A4, brl, evaluatePost, kw, type PostResult } from './lib/demand'

type Mode = 'verde' | 'azul'

function parseKw(s: string): number | null {
  const v = Number(s.replace(/\./g, '').replace(',', '.'))
  return Number.isFinite(v) && v > 0 ? v : null
}

function Field({ id, label, hint, value, onChange }: {
  id: string; label: string; hint: string; value: string; onChange: (v: string) => void
}) {
  return (
    <label className={styles.calcField} htmlFor={id}>
      <span className={styles.calcLabel}>{label}</span>
      <span className={styles.calcInputWrap}>
        <input
          id={id}
          className={styles.calcInput}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ''))}
        />
        <span className={styles.calcUnit}>kW</span>
      </span>
      <span className={styles.calcHint}>{hint}</span>
    </label>
  )
}

function PostLine({ title, r }: { title?: string; r: PostResult }) {
  return (
    <div className={styles.calcPost}>
      {title && <div className={styles.calcPostTitle}>{title}</div>}
      {r.status === 'over' && (
        <p className={styles.calcPostText}>
          Contrato de {kw(r.contracted)} para um pico de {kw(r.peak)}: <strong>{kw(r.idleKw)} pagos e não usados</strong>.
          Um contrato de cerca de {kw(r.recommendedKw)} economizaria <strong>{brl(r.idleCostYear)} por ano</strong>.
        </p>
      )}
      {r.status === 'ok' && (
        <p className={styles.calcPostText}>
          Contrato de {kw(r.contracted)} para um pico de {kw(r.peak)}: dimensionamento adequado nesta estimativa.
        </p>
      )}
      {r.status === 'overrun' && (
        <p className={styles.calcPostText}>
          Pico de {kw(r.peak)} acima do contrato de {kw(r.contracted)}: <strong>multa de ultrapassagem</strong> de cerca de{' '}
          <strong>{brl(r.overrunCostMonth)}</strong> em cada mês em que isso acontece. Vale rever o contrato para cerca de{' '}
          {kw(r.recommendedKw)}.
        </p>
      )}
    </div>
  )
}

export default function DemandCalculator({ whatsappNumber }: { whatsappNumber: string }) {
  const [mode, setMode] = useState<Mode>('verde')
  const [vals, setVals] = useState({ cont: '', peak: '', contP: '', peakP: '', contFP: '', peakFP: '' })
  const set = (k: keyof typeof vals) => (v: string) => setVals((s) => ({ ...s, [k]: v }))

  const result = useMemo(() => {
    if (mode === 'verde') {
      const c = parseKw(vals.cont), p = parseKw(vals.peak)
      if (c === null || p === null) return null
      const r = evaluatePost(c, p, COPEL_A4.verde.na)
      return { posts: [{ r }], yearly: r.idleCostYear, overrun: r.status === 'overrun' }
    }
    const cP = parseKw(vals.contP), pP = parseKw(vals.peakP), cF = parseKw(vals.contFP), pF = parseKw(vals.peakFP)
    if (cP === null || pP === null || cF === null || pF === null) return null
    const rP = evaluatePost(cP, pP, COPEL_A4.azul.ponta)
    const rF = evaluatePost(cF, pF, COPEL_A4.azul.foraPonta)
    return {
      posts: [{ title: 'Ponta', r: rP }, { title: 'Fora de ponta', r: rF }],
      yearly: rP.idleCostYear + rF.idleCostYear,
      overrun: rP.status === 'overrun' || rF.status === 'overrun',
    }
  }, [mode, vals])

  const waText = useMemo(() => {
    const base = 'Olá Jeferson, fiz a simulação no site (Copel A4'
    if (mode === 'verde') {
      return `${base} Verde): demanda contratada ${vals.cont || '?'} kW, maior demanda registrada ${vals.peak || '?'} kW. Quero o diagnóstico completo.`
    }
    return `${base} Azul): contratada ponta ${vals.contP || '?'} kW / fora ponta ${vals.contFP || '?'} kW; registrada ponta ${vals.peakP || '?'} kW / fora ponta ${vals.peakFP || '?'} kW. Quero o diagnóstico completo.`
  }, [mode, vals])
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`

  return (
    <div className={`${styles.card} ${styles.calc}`}>
      <div className={styles.calcTabs} role="tablist" aria-label="Modalidade tarifária">
        {(['verde', 'azul'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            className={`${styles.calcTab} ${mode === m ? styles.calcTabActive : ''}`}
            onClick={() => setMode(m)}
          >
            {m === 'verde' ? 'Verde' : 'Azul'}
          </button>
        ))}
      </div>

      <div className={styles.calcGrid}>
        {mode === 'verde' ? (
          <>
            <Field id="cont" label="Demanda contratada" hint="Na conta: “Demanda contratada”" value={vals.cont} onChange={set('cont')} />
            <Field id="peak" label="Maior demanda registrada em 12 meses" hint="No histórico da conta: o maior valor de demanda medida" value={vals.peak} onChange={set('peak')} />
          </>
        ) : (
          <>
            <Field id="contP" label="Contratada na ponta" hint="Demanda contratada ponta" value={vals.contP} onChange={set('contP')} />
            <Field id="peakP" label="Maior registrada na ponta (12 meses)" hint="Histórico: demanda medida ponta" value={vals.peakP} onChange={set('peakP')} />
            <Field id="contFP" label="Contratada fora de ponta" hint="Demanda contratada fora ponta" value={vals.contFP} onChange={set('contFP')} />
            <Field id="peakFP" label="Maior registrada fora de ponta (12 meses)" hint="Histórico: demanda medida fora ponta" value={vals.peakFP} onChange={set('peakFP')} />
          </>
        )}
      </div>

      <div className={styles.calcResult} aria-live="polite">
        {!result ? (
          <p className={styles.calcPlaceholder}>Preencha os campos para ver a estimativa.</p>
        ) : (
          <>
            <div className={styles.calcBig}>
              {result.yearly > 0 ? brl(result.yearly) : result.overrun ? 'Risco de multa' : 'Contrato adequado'}
              {result.yearly > 0 && <span className={styles.calcBigSub}> por ano em demanda paga e não usada</span>}
            </div>
            {result.posts.map((p, i) => <PostLine key={i} title={'title' in p ? p.title : undefined} r={p.r} />)}
            <a href={waHref} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
              Enviar estes números e pedir o diagnóstico
            </a>
          </>
        )}
      </div>

      <p className={styles.calcNote}>
        Estimativa só da parcela de demanda, com a tarifa Copel A4 da {COPEL_A4.source} sem ICMS, PIS e COFINS — na conta, o
        valor é maior. Considera o maior pico dos últimos 12 meses e o contrato mínimo de 30 kW. O diagnóstico completo
        também verifica ultrapassagem mês a mês, energia reativa, modalidade e tributos. Os números ficam só no seu navegador.
      </p>
    </div>
  )
}
