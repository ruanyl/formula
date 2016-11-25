import test from 'ava'
import { rsv, k, d, j, kdj } from '../src/kdj'
import sh603101 from './sh603101.json'

test('RSV', t => {
  const nineDaysRSV = rsv(9)
  const expectResults = [0, 100, 100, 100, 100, 100, 100, 100, 90.784, 72.871, 63.269, 63.214, 44.560, 42.33, 39.272, 44.253, 30.402, 82.521, 100, 85.25]
  const returnedResults = nineDaysRSV(sh603101).map(v => Math.round(1000 * v) / 1000)

  t.deepEqual(returnedResults, expectResults)
})

test('K', t => {
  const rn = 9
  const kn = 3
  const expectResults = [0, 33.333, 55.556, 70.37, 80.247, 86.831, 91.221, 94.147, 93.026, 86.308, 78.628, 73.49, 63.847, 56.675, 50.874, 48.667, 42.578, 55.893, 70.595, 75.48]
  const returnedResults = k(kn, rn)(sh603101).map(v => Math.round(1000 * v) / 1000)

  t.deepEqual(returnedResults, expectResults)
})

test('D', t => {
  const rn = 9
  const kn = 3
  const dn = 3
  const dList = d(dn, kn, rn)(sh603101).map(v => Math.round(1000 * v) / 1000)
  const expectResults = [0, 11.111, 25.926, 40.741, 53.909, 64.883, 73.663, 80.491, 84.669, 85.215, 83.02, 79.843, 74.511, 68.566, 62.668, 58.001, 52.86, 53.871, 59.446, 64.791]

  t.deepEqual(dList, expectResults)
})

test('J', t => {
  const rn = 9
  const kn = 3
  const dn = 3
  const kList = k(kn, rn)(sh603101)
  const dList = d(dn, kn, rn)(sh603101)
  const jList = j(kList, dList).map(v => Math.round(1000 * v) / 1000)
  const expectResults = [0, 77.778, 114.815, 129.63, 132.922, 130.727, 126.337, 121.46, 109.74, 88.493, 69.845, 60.784, 42.518, 32.893, 27.285, 29.998, 22.015, 59.936, 92.894, 96.859]

  t.deepEqual(jList, expectResults)
})

test('KDJ', t => {
  const rn = 9
  const kn = 3
  const dn = 3
  const kList = k(kn, rn)(sh603101)
  const dList = d(dn, kn, rn)(sh603101)
  const jList = j(kList, dList)
  const kdjList = kdj(dn, kn, rn)(sh603101)
  const expectResults = [kList, dList, jList]

  t.deepEqual(kdjList, expectResults)
})
