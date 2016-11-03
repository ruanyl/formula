import test from 'ava'
import { range } from 'ramda'
import { preSum } from '../src/arrayMath'

test('Pre Sum', t => {
  const arr = range(1, 20)
  t.is(preSum(3, 5, arr), 15)
})
