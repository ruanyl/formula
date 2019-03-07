import { isNil, last, subtract, compose } from 'ramda'
import { ema } from './movingAverage'
import { mix } from './functional'
import { mfv } from './cmf'
import { KData } from './types';

/**
 * Accumulation Distribution Line
 */
export const ad = (data: KData[]) => data.reduce((p, c) => {
  const mfvs = mfv(c)
  const adl = isNil(last(p)) ? mfvs : last(p)! + mfvs
  return p.concat(Math.round(adl))
}, [] as number[])

/**
 * Chaikin Oscillator
 */
export const adosc = (shortPeriods: number = 3, longPeriods: number = 10) => (data: KData[]) => {
  const adList = ad(data)
  return mix<number, number, number>(compose(Math.round, subtract), ema(shortPeriods, adList), ema(longPeriods, adList))
}

