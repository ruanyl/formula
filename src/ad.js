/**
 * Accumulation Distribution Line
 * http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:accumulation_distribution_line
 */
import { isNil, last, subtract, compose } from 'ramda'
import { VOLUME, HIGH, LOW, CLOSE } from './cons'
import { ema } from './movingAverage'
import { mix } from './functional'

export const ad = data => data.reduce((p, c) => {
  // [(close - low) - (high - close)] / (high - low)
  const mfm = HIGH(c) - LOW(c) === 0 ? 0 : ((CLOSE(c) - LOW(c)) - (HIGH(c) - CLOSE(c))) / (HIGH(c) - LOW(c))
  const mfv = mfm * VOLUME(c)
  const adl = isNil(last(p)) ? mfv : last(p) + mfv
  return p.concat(Math.round(adl))
}, [])

export const adosc = (shortPeriods = 3, longPeriods = 10) => data => {
  const adList = ad(data)
  return mix(compose(Math.round, subtract), ema(shortPeriods, adList), ema(longPeriods, adList))
}
