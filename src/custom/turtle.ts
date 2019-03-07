import { prev, max, min } from '../arrayMath'
import { Callback, KData } from '../types';

export const prevhl = (f: Callback<KData, number>, shortPeriods: number, longPeriods: number) => (data: KData[]) => ({
  longPeriodsHigh: prev(longPeriods, f, max)(data),
  shortPeriodsHigh: prev(shortPeriods, f, max)(data),
  longPeriodsLow: prev(longPeriods, f, min)(data),
  shortPeriodsLow: prev(shortPeriods, f, min)(data),
})
