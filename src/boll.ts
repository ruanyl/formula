import { compose, map } from 'ramda'
import { ma } from './movingAverage'
import { stdp } from './arrayMath'
import { CLOSE } from './cons'
import { mix } from './functional'
import { KData } from './types';

export const mid = (periods: number) => compose(ma(periods), map(CLOSE))
export const dis = (periods: number) => compose(c => c.map((v, idx) => stdp(periods, idx, c)), map(CLOSE))
export const boll = (periods: number, width: number) => (data: KData[]) => {
  const midArr = mid(periods)(data)
  const disArr = dis(periods)(data)
  const upperF = (a: number, b: number) => (a === 0 ? 0 : a + (width * b))
  const lowerF = (a: number, b: number) => (a === 0 ? 0 : a - (width * b))
  const bandWidthF = (a: number, b: number, m: number) => (m === 0 ? 0 : ((a - b) / m) * 100)
  const upperArr = mix<number, number, number>(upperF, midArr, disArr)
  const lowerArr = mix<number, number, number>(lowerF, midArr, disArr)
  const bandWidthArr = mix<number, number, number, number>(bandWidthF, upperArr, lowerArr, midArr)
  return { upper: upperArr, lower: lowerArr, mid: midArr, bandWidth: bandWidthArr }
}

