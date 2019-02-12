import { ema } from './movingAverage'
import { atr } from './atr'
import { mix } from './functional'
import { HIGH, LOW, divideZero } from './cons'

const dmPlus = (data: KData[]) => data.map((today, i) => {
  if (i === 0) return 0
  const yesterday = data[i - 1]
  return (HIGH(today) - HIGH(yesterday)) > (LOW(yesterday) - LOW(today)) ? Math.max(HIGH(today) - HIGH(yesterday), 0) : 0
})

const dmMinus = (data: KData[]) => data.map((today, i) => {
  if (i === 0) return 0
  const yesterday = data[i - 1]
  return (LOW(yesterday) - LOW(today)) > (HIGH(today) - HIGH(yesterday)) ? Math.max(LOW(yesterday) - LOW(today), 0) : 0
})

// const sumPeriods = (periods, data) => data.map((t, i) => (i < periods ? 0 : sum(periods, i, data)))

/**
 * https://www.tradingview.com/wiki/Directional_Movement_(DMI)#CALCULATION
 */
export const adx = (periods: number) => (data: KData[]) => {
  const atrD = ema(periods, atr(periods)(data))
  const diPlus = ema(periods, mix(divideZero, dmPlus(data), atrD)).map(m => 100 * m)
  const diMinus = ema(periods, mix(divideZero, dmMinus(data), atrD)).map(m => 100 * m)
  return ema(periods, diPlus.map((p, i) => Math.abs(divideZero((diPlus[i] - diMinus[i]), (diPlus[i] + diMinus[i]))) * 100))
}
