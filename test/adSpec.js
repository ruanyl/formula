import test from 'ava'
import { ad } from '../src/ad'
import sh603101 from './sh603101.json'

test('Chaikin A/D Line', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, -20865717, -35060492, -24084998, -21025769, -27834240, -26266116, -11499981, -19335746, -13705617, -7201948, 10433838, 22425782]
  const returnedResults = ad(sh603101)
  t.deepEqual(returnedResults, expectResults)
})
