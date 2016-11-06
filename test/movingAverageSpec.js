import test from 'ava'
import { range, compose, nth } from 'ramda'
import { sma, ma, ema, rsv, k, d, j, kdj, llv, hhv } from '../src/movingAverage'
import sh603101 from './sh603101.json'

const LOW = v => v.low
const HIGH = v => v.high
const PRICE = v => v.close
const CLOSE = (data, idx) => compose(PRICE, nth(idx))(data)

test('Simple Moving Avarage', t => {
  const arr = range(1, 20)
  const fiveDaysSMA = sma(5)
  const expectResults = [1, 1.2, 1.56, 2.05, 2.64, 3.31, 4.05, 4.84, 5.67, 6.54, 7.43, 8.34, 9.27, 10.22, 11.18, 12.14, 13.11, 14.09, 15.07]
  const returnedResults = fiveDaysSMA(arr).map(v => Math.round(100 * v) / 100)

  t.deepEqual(returnedResults, expectResults)
})

test('Moving Avarage', t => {
  const arr = range(1, 20)
  const fiveDaysMA = ma(5)
  const expectResults = [null, null, null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  t.deepEqual(fiveDaysMA(arr), expectResults)
})

test('Moving Avarage with selector', t => {
  const arr = range(1, 20).map(v => ({ price: v }))
  const f = v => v.price
  const fiveDaysMA = ma(5)
  const expectResults = [null, null, null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  t.deepEqual(fiveDaysMA(arr, f), expectResults)
})

test('LLV', t => {
  const arr = range(1, 20).map(v => ({ close: v }))
  const periods = 5
  const startFrom = 10
  const fiveDaysLLV = llv(periods, PRICE, startFrom)
  const expectResults = 7

  t.deepEqual(fiveDaysLLV(arr), expectResults)
})

test('HHV', t => {
  const arr = range(1, 20).map(v => ({ close: v }))
  const periods = 5
  const startFrom = 10
  const fiveDaysHHV = hhv(periods, PRICE, startFrom)
  const expectResults = 11

  t.deepEqual(fiveDaysHHV(arr), expectResults)
})

test('Exponential Moving Avarage', t => {
  const arr = [22.81, 23.09, 22.91, 23.23, 22.83, 23.05, 23.02, 23.29, 23.41, 23.49, 24.60]
  const nineDaysEMA = ema(9)
  const expectResults = [22.81, 22.87, 22.87, 22.95, 22.92, 22.95, 22.96, 23.03, 23.10, 23.18, 23.47]
  const returnedResults = nineDaysEMA(arr).map(v => Math.round(100 * v) / 100)

  t.deepEqual(returnedResults, expectResults)
})

test('RSV', t => {
  const nineDaysRSV = rsv(9)
  const expectResults = [0, 100, 100, 100, 100, 100, 100, 100, 90.784, 72.871, 63.269, 63.214, 44.560, 42.33, 39.272, 44.253, 30.402, 82.521, 100, 85.25]
  const returnedResults = nineDaysRSV(CLOSE, LOW, HIGH)(sh603101).map(v => Math.round(1000 * v) / 1000)

  t.deepEqual(returnedResults, expectResults)
})

test('K', t => {
  const nineDaysRSV = rsv(9)(CLOSE, LOW, HIGH)
  const threeDaysK = k(3)
  const expectResults = [0, 33.333, 55.556, 70.37, 80.247, 86.831, 91.221, 94.147, 93.026, 86.308, 78.628, 73.49, 63.847, 56.675, 50.874, 48.667, 42.578, 55.893, 70.595, 75.48]
  const returnedResults = threeDaysK(nineDaysRSV)(sh603101).map(v => Math.round(1000 * v) / 1000)

  t.deepEqual(returnedResults, expectResults)
})

test('D', t => {
  const nineDaysRSV = rsv(9)(CLOSE, LOW, HIGH)
  const threeDaysK = k(3)
  const kN = threeDaysK(nineDaysRSV)(sh603101)
  const threeDaysD = d(3)
  const dN = threeDaysD(kN).map(v => Math.round(1000 * v) / 1000)
  const expectResults = [0, 11.111, 25.926, 40.741, 53.909, 64.883, 73.663, 80.491, 84.669, 85.215, 83.02, 79.843, 74.511, 68.566, 62.668, 58.001, 52.86, 53.871, 59.446, 64.791]

  t.deepEqual(dN, expectResults)
})

test('D', t => {
  const nineDaysRSV = rsv(9)(CLOSE, LOW, HIGH)
  const threeDaysK = k(3)
  const kN = threeDaysK(nineDaysRSV)(sh603101)
  const threeDaysD = d(3)
  const dN = threeDaysD(kN)
  const jN = j(kN, dN).map(v => Math.round(1000 * v) / 1000)
  const expectResults = [0, 77.778, 114.815, 129.63, 132.922, 130.727, 126.337, 121.46, 109.74, 88.493, 69.845, 60.784, 42.518, 32.893, 27.285, 29.998, 22.015, 59.936, 92.894, 96.859]

  t.deepEqual(jN, expectResults)
})

test('KDJ', t => {
  const nineDaysRSV = rsv(9)(CLOSE, LOW, HIGH)
  const threeDaysK = k(3)
  const kN = threeDaysK(nineDaysRSV)(sh603101)
  const threeDaysD = d(3)
  const dN = threeDaysD(kN)
  const jN = j(kN, dN)
  const kdjN = kdj(9, 3, 3)(CLOSE, LOW, HIGH)(sh603101)
  const expectResults = [kN, dN, jN]

  t.deepEqual(kdjN, expectResults)
})
