import { isNil, last, subtract, compose } from 'ramda'
import { ema } from './movingAverage'
import { mix } from './functional'
import { mfv } from './cmf'

/**
 * Accumulation Distribution Line
 */
export const ad = data => data.reduce((p, c) => {
  const mfvs = mfv(c)
  const adl = isNil(last(p)) ? mfvs : last(p) + mfvs
  return p.concat(Math.round(adl))
}, [])

/**
 * Chaikin Oscillator
 */
export const adosc = (shortPeriods = 3, longPeriods = 10) => data => {
  const adList = ad(data)
  return mix(compose(Math.round, subtract), ema(shortPeriods, adList), ema(longPeriods, adList))
}

