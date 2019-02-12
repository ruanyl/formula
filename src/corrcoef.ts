/* Correlation Coefficient */
import { multiply } from 'ramda'

import { ma } from './movingAverage'
import { mix } from './functional'
import { divideZero } from './cons'

const variance = (a: number, b: number) => a - b * b
const coVariance = (a: number, b: number, c: number) => a - b * c
const corrcoefFunc = (a: number, b: number, c: number) => divideZero(a, Math.sqrt(b * c))

export const corrcoef = (periods: number) => (data1: number[], data2: number[]) => {
  const maOfPeriods = ma(periods)
  const maData1 = maOfPeriods(data1)
  const maData2 = maOfPeriods(data2)
  const maSqrtData1 = maOfPeriods(data1.map(d => d * d))
  const maSqrtData2 = maOfPeriods(data2.map(d => d * d))
  const maMixedData = maOfPeriods(mix(multiply, data1, data2))
  const varianceData1 = mix<number, number, number>(variance, maSqrtData1, maData1)
  const varianceData2 = mix<number, number, number>(variance, maSqrtData2, maData2)
  const coVarianceData = mix<number, number, number, number>(coVariance, maMixedData, maData1, maData2)
  const cc = mix<number, number, number, number>(corrcoefFunc, coVarianceData, varianceData1, varianceData2)
  return cc
}
