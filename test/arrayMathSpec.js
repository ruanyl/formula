import test from 'ava'
import { range, mean } from 'ramda'
import { sum, subArray, max, min, average, low, high, variance, stdp, meanDeviation, move } from '../src/arrayMath'

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

test('variance ', t => {
  const arr = [2, 4, 4, 4, 5, 5, 7, 9]
  t.is(variance(arr), 4)
})

test('standard deviation ', t => {
  const arr = [2, 4, 4, 4, 5, 5, 7, 9]
  t.is(stdp(arr.length, arr.length - 1, arr), 2)
})

test('Mean Deviation', t => {
  const arr = [3, 6, 6, 7, 8, 11, 15, 16]
  t.is(meanDeviation(arr), 3.75)
})

test('move', t => {
  const arr = [3, 6, 6, 7, 8, 11, 15, 16]
  t.deepEqual(move(2, mean)(arr), [0, 4.5, 6, 6.5, 7.5, 9.5, 13, 15.5])
})
