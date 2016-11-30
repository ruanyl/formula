import test from 'ava'
import { cci } from '../src/cci'
import sh603101 from './sh603101.json'

test('Commodity Channel Index', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51.161, 48.458, 68.711, 25.796, 78.207, 154.937, 206.515]
  const returnedResults = cci(14)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})
