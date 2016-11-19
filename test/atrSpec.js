import test from 'ava'
import { tr, atr } from '../src/atr'
import sh603101 from './sh603101.json'

test('tr of atr', t => {
  const expectResults = [0, 1.27, 1.4, 1.54, 1.69, 1.86, 2.05, 2.25, 2.48, 2.59, 1.62, 1.33, 1.21, 1.54, 1.97, 1.71, 2.32, 1.87, 2.76, 3.65]
  const returnedResults = tr(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})

test('atr', t => {
  const expectResults = [0, 0.121, 0.243, 0.366, 0.492, 0.623, 0.759, 0.901, 1.051, 1.198, 1.238, 1.247, 1.243, 1.271, 1.338, 1.373, 1.464, 1.502, 1.622, 1.815]
  const returnedResults = atr(20)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})
