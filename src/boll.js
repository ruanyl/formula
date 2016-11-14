import { compose, map } from 'ramda'
import { ma } from './movingAverage'
import { stdp } from './arrayMath'
import { CLOSE } from './cons'

export const mid = periods => compose(ma(periods), map(CLOSE))
export const dis = periods => compose(c => map((v, idx) => stdp(periods, idx, c)), map(CLOSE))
