import { isNil, last, subtract, compose } from 'ramda'
import { VOLUME, HIGH, LOW, CLOSE } from './cons'
import { ema } from './movingAverage'
import { mix } from './functional'
import { sum } from './arrayMath'

// Money Flow Multiplier
// [(close - low) - (high - close)] / (high - low)
const mfm = data => (HIGH(data) - LOW(data) === 0 ? 0 : ((CLOSE(data) - LOW(data)) - (HIGH(data) - CLOSE(data))) / (HIGH(data) - LOW(data)))

// Money Flow Volume
const mfv = data => mfm(data) * VOLUME(data)

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

/**
 * Chaikin Money Flow
 */
export const cmf = periods => data => {
  const mfvs = data.map(mfv)
  const volumes = data.map(VOLUME)
  return mfvs.map((m, i) => (i < periods - 1 ? 0 : sum(periods, i, mfvs) / sum(periods, i, volumes)))
}
