import test from 'ava'
import { range } from 'ramda'
import { sum, subArray, max, min, average, low, high } from '../src/arrayMath'

test('Sub Array', t => {
  const arr = range(1, 20)
  t.deepEqual(subArray(3, 5, arr), [4, 5, 6])
})

test('max', t => {
  const arr = range(1, 20)
  t.deepEqual(max(arr), 19)
})

test('min', t => {
  const arr = range(1, 20)
  t.deepEqual(min(arr), 1)
})

test('Pre Sum', t => {
  const arr = range(1, 20)
  t.is(sum(3, 5, arr), 15)
})

test('Pre Average ', t => {
  const arr = range(1, 20)
  t.is(average(3, 5, arr), 5)
})

test('low ', t => {
  const arr = range(1, 20)
  t.is(low(3, 5, arr), 4)
})

test('high ', t => {
  const arr = range(1, 20)
  t.is(high(3, 5, arr), 6)
})
