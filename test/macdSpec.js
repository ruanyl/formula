import test from 'ava'
import { dif, dea, macd } from '../src/macd'
import sh603101 from './sh603101.json'

test('dif of macd', t => {
  const expectResults = [0, 0.101, 0.291, 0.56, 0.898, 1.302, 1.766, 2.29, 2.765, 2.925, 2.957, 2.993, 2.908, 2.878, 2.881, 2.872, 2.773, 2.767, 2.93, 3.139]
  const returnedResults = dif(12, 26)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(returnedResults, expectResults)
})

test('dea of macd', t => {
  const expectResults = [0, 0.02, 0.074, 0.171, 0.317, 0.514, 0.764, 1.069, 1.409, 1.712, 1.961, 2.167, 2.315, 2.428, 2.519, 2.589, 2.626, 2.654, 2.709, 2.795]
  const _dif = dif(12, 26)
  const deaData = dea(_dif, 9)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(deaData, expectResults)
})

test('macd', t => {
  const expectResults = [0, 0.162, 0.434, 0.776, 1.163, 1.576, 2.004, 2.441, 2.713, 2.427, 1.992, 1.651, 1.185, 0.901, 0.725, 0.565, 0.294, 0.226, 0.441, 0.688]
  const _dif = dif(12, 26)
  const _dea = dea(_dif, 9)
  const macdData = macd(_dif, _dea)(sh603101).map(v => Math.round(1000 * v) / 1000)
  t.deepEqual(macdData, expectResults)
})
