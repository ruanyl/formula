import { subtract, multiply, map } from 'ramda'
import { emaF as ema } from './ema'
import { ema as _ema } from './movingAverage'
import { CLOSE } from './cons'
import { mix } from './functional'

export const dif = (short: number = 12, long: number = 26) =>
  (data: KData[]) => mix<number, number, number>(subtract, ema(CLOSE, short)(data), ema(CLOSE, long)(data))

export const dea = (dif: (d: KData[]) => number[], m: number = 9) => (data: KData[]) => _ema(m, dif(data))

export const macd = (
  dif: (d: KData[]) => number[],
  dea: (d: KData[]) => number[]
) => (data: KData[]) => map(multiply(2), mix(subtract, dif(data), dea(data)))
