import { map } from 'ramda'
import { ema as _ema, sma as _sma, ma as _ma } from './movingAverage'
import { PropFunction, KData } from './types';

export const emaF = (f: PropFunction, periods: number) => (data: KData[]) => _ema(periods, map<KData, number>(f, data))
export const smaF = (f: PropFunction, periods: number) => (data: KData[]) => _sma(periods, map(f, data))
export const maF = (f: PropFunction, periods: number) => (data: KData[]) => _ma(periods, map(f, data))
