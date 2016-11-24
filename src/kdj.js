import { compose, nth } from 'ramda'
import { hhv, llv, sma, close } from './movingAverage'
import { LOW, HIGH } from './cons'
import { mapCompose } from './functional'

export const rsv = n => data => data.map((record, idx) => {
  const closePrice = close(idx, data)
  const highPrice = hhv(HIGH, n, idx)(data)
  const lowPrice = llv(LOW, n, idx)(data)
  return highPrice === lowPrice ? 0 : 100 * ((closePrice - lowPrice) / (highPrice - lowPrice))
})

export const k = n => rsvN => compose(sma(n), rsvN)
export const d = n => kN => sma(n, kN)
export const j = (kN, dN) => kN.map((kv, idx) => (3 * kv) - (2 * nth(idx, dN)))
export const kdj = (rPeriods, kPeriods, dPeriods) => mapCompose([k(kPeriods)(rsv(rPeriods)), d(dPeriods), j])
