import { last, compose, partial, partialRight, curry, nth, range, multiply, sum } from 'ramda'
import { average, low, high, subArray } from './arrayMath'
import { CLOSE } from './cons'
import { mix } from './functional'
import { Callback, KData } from './types';

export const mapF = (data: any[] = [], f: Callback) => (f === undefined ? data : data.map(f))

const emaFormula = (n: number, today: number, yesterday: number) => {
  const k = 2 / (n + 1)
  return (k * today) + (yesterday * (1 - k))
}
const smaFormula = (n: number, today: number, yesterday: number) => {
  const k = 1 / n
  return (k * today) + (yesterday * (1 - k))
}
const wmaFormula = (n: number, data: number[]) => sum(mix(multiply, range(1, n + 1), data)) / (n * (n + 1) / 2)

// Moving Avarage
const _ma = (n: number, data: number[]) =>
  data.reduce(
    (pv: number[], cv, idx: number) => (idx < (n - 1) ? pv.concat([0]) : pv.concat([average(n, idx, data)])), []
  )
// Smooth Moving Avarage
const _sma = (n: number, data: number[]) =>
  data.reduce(
    (pv: number[], cv) => (last(pv) === undefined ? pv.concat(cv) : pv.concat(smaFormula(n, cv, last(pv) as number))), []
  )
// Exponential Moving Avarage
const _ema = (n: number, data: number[]) =>
  data.reduce(
    (pv: number[], cv) => (last(pv) === undefined ? pv.concat(cv) : pv.concat(emaFormula(n, cv, last(pv) as number))), []
  )
// Weighted moving average
const _wma = (n: number, data: number[]) =>
  data.reduce(
    (pv: number[], cv, idx) => (idx < (n - 1) ? pv.concat([0]) : pv.concat([wmaFormula(n, subArray(n, idx, data))])), []
  )
const _llv = (f: Function, n: number, idx: number) => compose(partial(low, [n, idx]), partialRight(mapF, [f]))
const _hhv = (f: Function, n: number, idx: number) => compose(partial(high, [n, idx]), partialRight(mapF, [f]))
const _close = (idx: number, data: KData[]) => compose(CLOSE, nth(idx))(data)

export const ma = curry(_ma)
export const sma = curry(_sma)
export const ema = curry(_ema)
export const wma = curry(_wma)
export const llv = curry(_llv)
export const hhv = curry(_hhv)
export const close = curry(_close)
