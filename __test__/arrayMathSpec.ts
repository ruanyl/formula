import { range, mean } from 'ramda'
import { sum, subArray, max, min, average, low, high, variance, stdp, meanDeviation, move } from '../src/arrayMath'

describe('arrayMath', () => {
  it('Sub Array', () => {
    const arr = range(1, 20)
    expect(subArray(3, 5, arr)).toEqual([4, 5, 6])
  })

  it('max', () => {
    const arr = range(1, 20)
    expect(max(arr)).toEqual(19)
  })

  it('min', () => {
    const arr = range(1, 20)
    expect(min(arr)).toEqual(1)
  })

  it('Pre Sum', () => {
    const arr = range(1, 20)
    expect(sum(3, 5, arr)).toEqual(15)
  })

  it('Pre Average ', () => {
    const arr = range(1, 20)
    expect(average(3, 5, arr)).toEqual(5)
  })

  it('low ', () => {
    const arr = range(1, 20)
    expect(low(3, 5, arr)).toEqual(4)
  })

  it('high ', () => {
    const arr = range(1, 20)
    expect(high(3, 5, arr)).toEqual(6)
  })

  it('variance ', () => {
    const arr = [2, 4, 4, 4, 5, 5, 7, 9]
    expect(variance(arr)).toEqual(4)
  })

  it('standard deviation ', () => {
    const arr = [2, 4, 4, 4, 5, 5, 7, 9]
    expect(stdp(arr.length, arr.length - 1, arr)).toEqual(2)
  })

  it('Mean Deviation', () => {
    const arr = [3, 6, 6, 7, 8, 11, 15, 16]
    expect(meanDeviation(arr)).toEqual(3.75)
  })

  it('move', () => {
    const arr = [3, 6, 6, 7, 8, 11, 15, 16]
    expect(move(2, mean)(arr)).toEqual([0, 4.5, 6, 6.5, 7.5, 9.5, 13, 15.5])
  })
});
