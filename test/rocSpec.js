import test from 'ava'
import { roc } from '../src/roc'
import sh603101 from './sh603101.json'

test('Rate of Change (ROC)', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 89.598, 74.212, 53.581, 47.219, 47.23, 40.929]
  const returnedResults = roc(14)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})
