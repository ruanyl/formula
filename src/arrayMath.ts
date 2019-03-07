import { sum as _sum, mean, compose, curry, subtract, partial, map, flip, nth } from 'ramda'
import { Callback, KData, PropFunction } from './types';

export const subArray = <T = number>(n: number = 1, idx: number = 0, arr: T[] = []) => {
  const end = idx + 1
  const start = end - n < 0 ? 0 : end - n
  return arr.slice(start, end)
}

export const max = (arr: number[]) => Math.max(...arr)

export const min = (arr: number[]) => Math.min(...arr)

export const sum = curry(compose<number, number, number[], number[], number>(_sum, subArray))

export const average = curry(compose<number, number, number[], number[], number>(mean, subArray))

export const low = curry(compose<number, number, number[], number[], number>(min, subArray))

export const high = curry(compose<number, number, number[], number[], number>(max, subArray))

export const variance = (arr: number[]) => compose(
  mean,
  m => map(compose(partial(flip(Math.pow), [2]), partial<number, number, number>(subtract, [m])), arr),
  mean
)(arr)

export const stdp = curry(compose<number, number, number[], number[], number, number>(Math.sqrt, variance, subArray))

// e.g., max of previous N days' CLOSE price
export const prev = (
  periods: number,
  mapping: Callback<KData, number>,
  selector: (arr: number[]) => number
) => (data: KData[]) => data.map((d, i) => selector(subArray(periods, i, data).map<number>(mapping)))

export const meanDeviation = (arr: number[]) => mean(arr.map(v => Math.abs(v - mean(arr))))

// data: Array
// e.g., prev N's mean
export const move = (
  n: number,
  f: (arr: number[]) => any
) => (data: number[]) => data.map((d, i) => (i < (n - 1) ? 0 : f(subArray(n, i, data))))

// e.g., N days agos CLOSE price
export const ref = (f: PropFunction, periods: number) =>
  (data: KData[]) => (data.length <= periods ? 0 : f(nth(-(periods + 1), data) as KData))
