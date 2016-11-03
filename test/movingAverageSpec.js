import test from 'ava'
import { range } from 'ramda'
import { sma } from '../src/movingAverage'

test('Simple Moving Avarage', t => {
  const arr = range(1, 20)
  const fiveDaysSMA = sma(5)
  const expectResults = [null, null, null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  t.deepEqual(fiveDaysSMA(arr), expectResults)
})

test('Simple Moving Avarage with selector', t => {
  const arr = range(1, 20).map(v => ({ price: v }))
  const f = v => v.price
  const fiveDaysSMA = sma(5, f)
  const expectResults = [null, null, null, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  t.deepEqual(fiveDaysSMA(arr), expectResults)
})
