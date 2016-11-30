import { map } from 'ramda'
import { ema as _ema, sma as _sma } from './movingAverage'

export const emaF = (f, periods) => data => _ema(periods, map(f, data))
export const smaF = (f, periods) => data => _sma(periods, map(f, data))
