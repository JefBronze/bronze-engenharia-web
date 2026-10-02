// Copel-DIS, subgrupo A4 (2,3 a 25 kV). TUSD de demanda, tarifas de aplicação SEM tributos (R$/kW).
// Fonte: ANEEL Resolução Homologatória nº 3.472/2025, Tabela 1, vigente desde 24/06/2025.
export const COPEL_A4 = {
  source: 'REH ANEEL 3.472/2025',
  verde: { na: 20.78 },
  azul: { ponta: 44.93, foraPonta: 20.78 },
} as const

// REN ANEEL 1.000/2021: tolerância de 5% antes de cobrar ultrapassagem; a parcela que excede o contrato
// é cobrada a 2× a tarifa de demanda. Contrato mínimo no Grupo A: 30 kW.
export const OVERRUN_TOLERANCE = 0.05
export const OVERRUN_MULTIPLIER = 2
export const MIN_CONTRACT_KW = 30

export type PostResult = {
  contracted: number
  peak: number
  tariff: number
  status: 'over' | 'ok' | 'overrun'
  recommendedKw: number
  idleKw: number
  idleCostYear: number // R$/ano pagos por kW contratado acima do pico
  overrunKw: number
  overrunCostMonth: number // R$ de multa num mês em que o pico ocorre
}

export function evaluatePost(contracted: number, peak: number, tariff: number): PostResult {
  const recommendedKw = Math.max(MIN_CONTRACT_KW, Math.ceil(peak))
  if (peak > contracted * (1 + OVERRUN_TOLERANCE)) {
    const overrunKw = peak - contracted
    return {
      contracted, peak, tariff, status: 'overrun', recommendedKw,
      idleKw: 0, idleCostYear: 0,
      overrunKw, overrunCostMonth: overrunKw * tariff * OVERRUN_MULTIPLIER,
    }
  }
  const idleKw = Math.max(0, contracted - recommendedKw)
  return {
    contracted, peak, tariff, status: idleKw > 0 ? 'over' : 'ok', recommendedKw,
    idleKw, idleCostYear: idleKw * tariff * 12,
    overrunKw: 0, overrunCostMonth: 0,
  }
}

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const kw = (v: number) => `${v.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kW`
