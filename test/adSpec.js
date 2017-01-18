import test from 'ava'
import { ad, adosc } from '../src/ad'
import sh603101 from './sh603101.json'

test('Chaikin A/D Line', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, -20865717, -35060492, -24084998, -21025769, -27834240, -26266116, -11499981, -19335746, -13705617, -7201948, 10433838, 22425782]
  const returnedResults = ad(sh603101)
  t.deepEqual(returnedResults, expectResults)
})

test('Chaikin A/D Oscillator', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, -6639092, -13268049, -11281507, -8469848, -8715969, -7525346, -1655834, -1597338, 363209, 3201582, 9683067, 15269924]
  const returnedResults = adosc(3, 10)(sh603101)
  t.deepEqual(returnedResults, expectResults)
})
