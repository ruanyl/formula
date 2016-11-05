import test from 'ava'
import { range } from 'ramda'
import { sma, ema } from '../src/movingAverage'

test('Simple Moving Avarage', t => {
  const arr = range(1, 20)
  const fiveDaysSMA = sma(5)
  const expectResults = [null, null, null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  t.deepEqual(fiveDaysSMA(arr), expectResults)
})

test('Simple Moving Avarage with selector', t => {
  const arr = range(1, 20).map(v => ({ price: v }))
  const f = v => v.price
  const fiveDaysSMA = sma(5)
  const expectResults = [null, null, null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  t.deepEqual(fiveDaysSMA(arr, f), expectResults)
})

test('Exponential Moving Avarage', t => {
  const arr = [22.81, 23.09, 22.91, 23.23, 22.83, 23.05, 23.02, 23.29, 23.41, 23.49, 24.60]
  const nineDaysEMA = ema(9)
  const expectResults = [22.81, 22.87, 22.87, 22.95, 22.92, 22.95, 22.96, 23.03, 23.10, 23.18, 23.47]
  const returnedResults = nineDaysEMA(arr).map(v => Math.round(100 * v) / 100)

  t.deepEqual(returnedResults, expectResults)
})
