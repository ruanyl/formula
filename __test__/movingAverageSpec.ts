import { range } from 'ramda'
import { sma, ma, ema, llv, hhv, wma } from '../src/movingAverage'

const PRICE = (v: KData) => v.close

describe('movingAverage', () => {
  it('Simple Moving Avarage', () => {
    const arr = range(1, 20)
    const fiveDaysSMA = sma(5)
    const expectResults = [1, 1.2, 1.56, 2.05, 2.64, 3.31, 4.05, 4.84, 5.67, 6.54, 7.43, 8.34, 9.27, 10.22, 11.18, 12.14, 13.11, 14.09, 15.07]
    const returnedResults = fiveDaysSMA(arr).map(v => Math.round(100 * v) / 100)

    expect(returnedResults).toEqual(expectResults)
  })

  it('Moving Avarage', () => {
    const arr = range(1, 20)
    const fiveDaysMA = ma(5)
    const expectResults = [0, 0, 0, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

    expect(fiveDaysMA(arr)).toEqual(expectResults)
  })

  it('LLV', () => {
    const arr = range(1, 20).map(v => ({ close: v }))
    const periods = 5
    const startFrom = 10
    const fiveDaysLLV = llv(PRICE, periods, startFrom)
    const expectResults = 7

    expect(fiveDaysLLV(arr)).toEqual(expectResults)
  })

  it('HHV', () => {
    const arr = range(1, 20).map(v => ({ close: v }))
    const periods = 5
    const startFrom = 10
    const fiveDaysHHV = hhv(PRICE, periods, startFrom)
    const expectResults = 11

    expect(fiveDaysHHV(arr)).toEqual(expectResults)
  })

  it('Exponential Moving Avarage', () => {
    const arr = [22.81, 23.09, 22.91, 23.23, 22.83, 23.05, 23.02, 23.29, 23.41, 23.49, 24.60]
    const nineDaysEMA = ema(9)
    const expectResults = [22.81, 22.87, 22.87, 22.95, 22.92, 22.95, 22.96, 23.03, 23.10, 23.18, 23.47]
    const returnedResults = nineDaysEMA(arr).map(v => Math.round(100 * v) / 100)

    expect(returnedResults).toEqual(expectResults)
  })

  it('Weighted Moving Avarage', () => {
    const arr = [32.52, 35.19, 48.63, 45.54, 31.17, 41.77, 25.07, -1.67, 25.60, 8.42, 4.07, 10.05, 11.60, 12.80, 9.24, -1.95, 5.30, 15.70]
    const tenDaysWMA = wma(10)
    const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 23.89, 19.32, 16.35, 14.12, 12.78, 11.39, 8.37, 7.45, 8.79]
    const returnedResults = tenDaysWMA(arr).map(v => Math.round(100 * v) / 100)

    expect(returnedResults).toEqual(expectResults)
  })
});
