import { ema } from './movingAverage'
import { CLOSE, HIGH, LOW } from './cons'
import { KData } from './types';

// True Range
export const tr = (data: KData[]) => data.map((s, i) => {
  if (i === 0) {
    return HIGH(s) - LOW(s)
  }
  const p = data[i - 1]
  return Math.max(HIGH(s) - LOW(s), Math.abs(HIGH(s) - CLOSE(p)), Math.abs(CLOSE(p) - LOW(s)))
})

// Avarage True Range
export const atr = (periods: number) => (data: KData[]) => ema(periods, tr(data))
