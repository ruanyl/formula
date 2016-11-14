import test from 'ava'
import { mid } from '../src/boll'
import sh603101 from './sh603101.json'

test('Mid Of Boll', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 19.472, 20.49, 21.437, 22.145, 22.787, 23.334, 23.721, 23.83, 23.843, 23.991, 24.51]
  const returnedResults = mid(10)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})
