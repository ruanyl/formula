/* Correlation Coefficient */
import { multiply } from 'ramda'

import { ma } from './movingAverage'
import { mix } from './functional'
import { divideZero } from './cons'

const variance = (a, b) => a - b * b
const coVariance = (a, b, c) => a - b * c
const corrcoefFunc = (a, b, c) => divideZero(a, Math.sqrt(b * c))

export const corrcoef = periods => (data1, data2) => {
  const maOfPeriods = ma(periods)
  const maData1 = maOfPeriods(data1)
  const maData2 = maOfPeriods(data2)
  const maSqrtData1 = maOfPeriods(data1.map(d => d * d))
  const maSqrtData2 = maOfPeriods(data2.map(d => d * d))
  const maMixedData = maOfPeriods(mix(multiply, data1, data2))
  const varianceData1 = mix(variance, maSqrtData1, maData1)
  const varianceData2 = mix(variance, maSqrtData2, maData2)
  const coVarianceData = mix(coVariance, maMixedData, maData1, maData2)
  const cc = mix(corrcoefFunc, coVarianceData, varianceData1, varianceData2)
  return cc
}
