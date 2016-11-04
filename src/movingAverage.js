import { last } from 'ramda'
import { preSum } from './arrayMath'

export const sma = (n = 5, f) => (data = []) => {
  const finalData = f === undefined ? data : data.map(f)
  return finalData.reduce((pv, cv, idx) => (idx < n - 1 ? pv.concat([null]) : pv.concat([preSum(n, idx, finalData) / n])), [])
}

const emaFormula = (n, today, yesterday) => {
  const k = 2 / (n + 1)
  return (k * today) + (yesterday * (1 - k))
}

export const ema = (n = 5, f) => (data = []) => {
  const finalData = f === undefined ? data : data.map(f)
  return finalData.reduce((pv, cv) => (last(pv) === undefined ? pv.concat(cv) : pv.concat(emaFormula(n, cv, last(pv)))), [])
}
