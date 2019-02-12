import { lastIndexOf, subtract } from 'ramda'
import { HIGH, LOW } from './cons'
import { max, min, subArray } from './arrayMath'
import { mix } from './functional'

const aroonUp = (periods: number, data: KData[]) => {
  const high = data.map(HIGH)
  const p = periods + 1
  return high.map((h, i) => {
    const subHigh = subArray(p, i, high)
    return (periods - (subHigh.length - lastIndexOf(max(subHigh), subHigh) - 1)) / periods * 100
  })
}

const aroonDown = (periods: number, data: KData[]) => {
  const low = data.map(LOW)
  const p = periods + 1
  return low.map((h, i) => {
    const subLow = subArray(p, i, low)
    return (periods - (subLow.length - lastIndexOf(min(subLow), subLow) - 1)) / periods * 100
  })
}

/**
 * Aroon
 */
export const aroon = (periods: number) => (data: KData[]) => ({ up: aroonUp(periods, data), down: aroonDown(periods, data) })

/**
 * Aroon Oscillator
 */
export const aroonosc = (periods: number) => (data: KData[]) => mix(subtract, aroonUp(periods, data), aroonDown(periods, data))
