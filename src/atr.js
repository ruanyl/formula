import { ema } from './movingAverage'
import { CLOSE, HIGH, LOW } from './cons'

// True Range
export const tr = data => data.map((s, i) => {
  if (i === 0) {
    return HIGH(s) - LOW(s)
  }
  const p = data[i - 1]
  return Math.max(HIGH(s) - LOW(s), HIGH(s) - CLOSE(p), CLOSE(p) - LOW(s))
})

// Avarage True Range
export const atr = periods => data => ema(periods, tr(data))
