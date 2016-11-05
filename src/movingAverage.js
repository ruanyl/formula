import { last, compose, partial } from 'ramda'
import { average } from './arrayMath'

export const mapF = (data = [], f) => (f === undefined ? data : data.map(f))

const emaFormula = (n, today, yesterday) => {
  const k = 2 / (n + 1)
  return (k * today) + (yesterday * (1 - k))
}
const _sma = (n, data) => data.reduce((pv, cv, idx) => (idx < n - 1 ? pv.concat([null]) : pv.concat([average(n, idx, data)])), [])
const _ema = (n, data) => data.reduce((pv, cv) => (last(pv) === undefined ? pv.concat(cv) : pv.concat(emaFormula(n, cv, last(pv)))), [])

export const sma = (n = 5) => compose(partial(_sma, [n]), mapF)
export const ema = (n = 5) => compose(partial(_ema, [n]), mapF)
