import { prev, max, min } from '../arrayMath'

export const prevhl = (f, shortPeriods, longPeriods) => data => ({
  longPeriodsHigh: prev(longPeriods, f, max)(data),
  shortPeriodsHigh: prev(shortPeriods, f, max)(data),
  longPeriodsLow: prev(longPeriods, f, min)(data),
  shortPeriodsLow: prev(shortPeriods, f, min)(data),
})
