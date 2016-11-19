import { compose, map } from 'ramda'
import { ma } from './movingAverage'
import { stdp } from './arrayMath'
import { CLOSE } from './cons'
import { mix } from './functional'

export const mid = periods => compose(ma(periods), map(CLOSE))
export const dis = periods => compose(c => c.map((v, idx) => stdp(periods, idx, c)), map(CLOSE))
export const boll = (periods, width) => data => {
  const midArr = mid(periods)(data)
  const disArr = dis(periods)(data)
  const upperF = (a, b) => (a === 0 ? 0 : a + (width * b))
  const lowerF = (a, b) => (a === 0 ? 0 : a - (width * b))
  const bandWidthF = (a, b, m) => (m === 0 ? 0 : ((a - b) / m) * 100)
  const upperArr = mix(upperF, midArr, disArr)
  const lowerArr = mix(lowerF, midArr, disArr)
  const bandWidthArr = mix(bandWidthF, upperArr, lowerArr, midArr)
  return { upper: upperArr, lower: lowerArr, mid: midArr, bandWidth: bandWidthArr }
}

