import test from 'ava'
import { adx } from '../src/adx'
import sh603101 from './sh603101.json'

test('Average Directional Index', t => {
  const expectResults = [0, 13.333, 24.889, 34.904, 43.583, 51.105, 57.625, 63.275, 68.171, 70.829, 72.304, 73.64, 74.51, 75.324, 75.797, 76.326, 75.351, 74.686, 74.381, 74.458]
  const returnedResults = adx(14)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})
