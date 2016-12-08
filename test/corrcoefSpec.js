import test from 'ava'
import { corrcoef } from '../src/corrcoef'
import { formatT } from '../src/cons'

test('Correlation Coefficient', t => {
  const expectResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.958]
  const data1 = [21.40, 21.71, 21.20, 21.34, 21.49, 21.39, 22.16, 22.53, 22.44, 22.75, 23.23, 23.09, 22.85, 22.45, 22.48, 22.27, 22.37, 22.28, 23.06, 22.99]
  const data2 = [54.83, 55.34, 54.38, 55.25, 56.07, 56.30, 57.05, 57.91, 58.20, 58.39, 59.19, 59.03, 57.96, 57.52, 57.76, 57.09, 57.85, 57.54, 58.85, 58.60]
  const returnedResults = corrcoef(20)(data1, data2).map(formatT)
  t.deepEqual(returnedResults, expectResults)
})
