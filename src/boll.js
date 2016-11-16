import { compose, map } from 'ramda'
import { ma } from './movingAverage'
import { stdp } from './arrayMath'
import { CLOSE, formatT } from './cons'
import { mix } from './functional'

export const mid = periods => compose(ma(periods), map(CLOSE))
export const dis = periods => compose(c => c.map((v, idx) => stdp(periods, idx, c)), map(CLOSE))
export const boll = (periods, width) => data => {
  const midArr = mid(periods)(data)
  const disArr = dis(periods)(data)
  const upperF = (a, b) => (a === 0 ? 0 : a + (width * b))
  const lowerF = (a, b) => (a === 0 ? 0 : a - (width * b))
  const upperArr = mix(midArr, disArr, upperF)
  const lowerArr = mix(midArr, disArr, lowerF)
  return { upper: map(formatT, upperArr), lower: map(formatT, lowerArr), mid: map(formatT, midArr) }
}
