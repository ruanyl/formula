import test from 'ava'
import { mid, boll } from '../src/boll'
import { formatT } from '../src/cons'
import sh603101 from './sh603101.json'

test('Mid Of Boll', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 19.472, 20.49, 21.437, 22.145, 22.787, 23.334, 23.721, 23.83, 23.843, 23.991, 24.51]
  const returnedResults = mid(10)(sh603101).map(formatT)
  t.deepEqual(returnedResults, expectResults)
})

test('Boll', t => {
  const upper = [0, 0, 0, 0, 0, 0, 0, 0, 0, 28.352, 28.296, 28.051, 27.377, 26.695, 26.105, 25.755, 25.701, 25.741, 26.602, 28.385]
  const lower = [0, 0, 0, 0, 0, 0, 0, 0, 0, 10.592, 12.684, 14.823, 16.913, 18.879, 20.563, 21.687, 21.959, 21.945, 21.38, 20.635]
  const mid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 19.472, 20.49, 21.437, 22.145, 22.787, 23.334, 23.721, 23.83, 23.843, 23.991, 24.51]
  const bandWidth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 91.209, 76.192, 61.707, 47.25, 34.298, 23.747, 17.153, 15.705, 15.923, 21.764, 31.618]
  const returnedResults = boll(10, 2)(sh603101)
  t.deepEqual(returnedResults.upper.map(formatT), upper)
  t.deepEqual(returnedResults.lower.map(formatT), lower)
  t.deepEqual(returnedResults.mid.map(formatT), mid)
  t.deepEqual(returnedResults.bandWidth.map(formatT), bandWidth)
})
