import { map } from 'ramda'
import { ema as _ema } from './movingAverage'

export const ema = (f, periods) => data => _ema(periods, map(f, data))
