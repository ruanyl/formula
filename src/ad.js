/**
 * Accumulation Distribution Line
 * http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:accumulation_distribution_line
 */
import { isNil, last } from 'ramda'
import { VOLUME, HIGH, LOW, CLOSE } from './cons'

export const ad = data => data.reduce((p, c) => {
  // [(close - low) - (high - close)] / (high - low)
  const mfm = HIGH(c) - LOW(c) === 0 ? 0 : ((CLOSE(c) - LOW(c)) - (HIGH(c) - CLOSE(c))) / (HIGH(c) - LOW(c))
  const mfv = mfm * VOLUME(c)
  const adl = isNil(last(p)) ? mfv : last(p) + mfv
  return p.concat(Math.round(adl))
}, [])
