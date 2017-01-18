import test from 'ava'
import { cmf } from '../src/cmf'
import sh603101 from './sh603101.json'
import { formatT } from '../src/cons'

test('Chaikin Money Flow', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, -0.578, -0.308, -0.219, -0.257, -0.209, -0.081, -0.118, -0.078, -0.037, 0.176, 0.307]
  const returnedResults = cmf(10)(sh603101).map(formatT)
  t.deepEqual(returnedResults, expectResults)
})
