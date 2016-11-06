import { last, compose, partial, partialRight, curry, nth } from 'ramda'
import { average, low, high } from './arrayMath'

export const mapF = (data = [], f) => (f === undefined ? data : data.map(f))

const emaFormula = (n, today, yesterday) => {
  const k = 2 / (n + 1)
  return (k * today) + (yesterday * (1 - k))
}
const smaFormula = (n, today, yesterday) => (today + ((n - 1) * yesterday)) / n

const _ma = (n, data) => data.reduce((pv, cv, idx) => (idx < n - 1 ? pv.concat([null]) : pv.concat([average(n, idx, data)])), [])
const _sma = (n, data) => data.reduce((pv, cv) => (last(pv) === undefined ? pv.concat(cv) : pv.concat(smaFormula(n, cv, last(pv)))), [])
const _ema = (n, data) => data.reduce((pv, cv) => (last(pv) === undefined ? pv.concat(cv) : pv.concat(emaFormula(n, cv, last(pv)))), [])
const _llv = (n, f, idx) => compose(partial(low, [n, idx]), partialRight(mapF, [f]))
const _hhv = (n, f, idx) => compose(partial(high, [n, idx]), partialRight(mapF, [f]))
const _close = (f, idx) => data => f(data, idx)

export const ma = (n = 5) => compose(partial(_ma, [n]), mapF)

export const sma = (n = 5) => compose(partial(_sma, [n]), mapF)

export const ema = (n = 5) => compose(partial(_ema, [n]), mapF)

export const llv = curry(_llv)

export const hhv = curry(_hhv)

export const close = curry(_close)

const _rsv = (n, closeF, llvF, hhvF) => data => data.map(
  (record, idx) => {
    const closePrice = close(closeF, idx)(data)
    const highPrice = _hhv(n, hhvF, idx)(data)
    const lowPrice = _llv(n, llvF, idx)(data)
    return highPrice === lowPrice ? 0 : 100 * ((closePrice - lowPrice) / (highPrice - lowPrice))
  }
)

export const rsv = curry(_rsv)

export const k = n => rsvN => compose(partial(_sma, [n]), rsvN)

export const d = n => kN => _sma(n, kN)

export const j = (kN, dN) => kN.map((kv, idx) => (3 * kv) - (2 * nth(idx, dN)))
