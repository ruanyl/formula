import { subtract } from 'ramda'
import { TYP, divideZero } from './cons'
import { ma } from './movingAverage'
import { mix } from './functional'
import { meanDeviation, move } from './arrayMath'

/**
 * Commodity Channel Index
 */
export const cci = periods => data => {
  const typ = data.map(TYP)
  const maTyp = ma(periods, typ)
  const mdTyp = move(periods, meanDeviation)(typ)
  return mix(divideZero, mix(subtract, typ, maTyp), mdTyp.map(v => 0.015 * v))
}
