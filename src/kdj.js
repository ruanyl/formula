import { compose, nth, curry } from 'ramda'
import { hhv, llv, sma, close } from './movingAverage'
import { LOW, HIGH } from './cons'
import { mapMix } from './functional'

export const rsv = curry(n => data => data.map((record, idx) => {
  const closePrice = close(idx, data)
  const highPrice = hhv(HIGH, n, idx)(data)
  const lowPrice = llv(LOW, n, idx)(data)
  return highPrice === lowPrice ? 0 : 100 * ((closePrice - lowPrice) / (highPrice - lowPrice))
}))

export const k = curry((kn, rn) => compose(sma(kn), rsv(rn)))
export const d = curry((dn, kn, rn) => compose(sma(dn), k(kn, rn)))
export const j = (kN, dN) => kN.map((kv, idx) => (3 * kv) - (2 * nth(idx, dN)))
export const kdj = (dn, kn, rn) => mapMix([j, k(kn, rn), d(dn, kn, rn)])
