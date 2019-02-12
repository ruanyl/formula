import { compose, nth, curry } from 'ramda'
import { hhv, llv, sma, close } from './movingAverage'
import { LOW, HIGH } from './cons'
import { mapMix } from './functional'

export const rsv = (n: number) => (data: KData[]) => data.map((record, idx) => {
  const closePrice = close(idx, data)
  const highPrice = hhv(HIGH, n, idx)(data)
  const lowPrice = llv(LOW, n, idx)(data)
  return highPrice === lowPrice ? 0 : 100 * ((closePrice - lowPrice) / (highPrice - lowPrice))
})

export const k = curry((kn: number, rn: number) => compose(sma(kn), rsv(rn)))
export const d = curry((dn: number, kn: number, rn: number) => compose(sma(dn), k(kn, rn)))
export const j = (kN: number[], dN: number[]) => kN.map((kv, idx) => (3 * kv) - (2 * nth(idx, dN)!))
export const kdj = (dn: number, kn: number, rn: number) =>
  mapMix<KData[], KData[], number[], number[], number[], KData[], number[]>(j, k(kn, rn), d(dn, kn, rn))
