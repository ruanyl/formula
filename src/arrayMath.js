import { sum as _sum, mean, compose, curry, subtract, partial, map, flip } from 'ramda'

/**
 * arr: [1, 2, 3, 4, 5, 6]
 * n = 3
 * idx = 4
 * return: [3, 4, 5]
 *
 * @returns {Array}
 */
export const subArray = (n = 1, idx = 0, arr = []) => {
  const end = idx + 1
  const start = end - n < 0 ? 0 : end - n
  return arr.slice(start, end)
}

export const max = arr => Math.max(...arr)

export const min = arr => Math.min(...arr)

export const sum = curry(compose(_sum, subArray))

export const average = curry(compose(mean, subArray))

export const low = curry(compose(min, subArray))

export const high = curry(compose(max, subArray))

export const variance = arr => compose(mean, m => map(compose(partial(flip(Math.pow), [2]), partial(subtract, [m])), arr), mean)(arr)

export const stdp = curry(compose(Math.sqrt, variance, subArray))

export const prev = (periods, mapping, selector) => data => data.map((d, i) => selector(subArray(periods, i, data).map(mapping)))
