import { sum } from 'ramda'

/**
 * arr: [1, 2, 3, 4, 5, 6]
 * n = 3
 * idx = 4
 * return: sum of 3 numbers before value of idx = 4, include value of idx 4
 * in this case, it would be 12
 *
 * @returns {Number}
 */
export const preSum = (n = 1, idx = 0, arr = []) => {
  const end = idx + 1
  const start = end - n < 0 ? 0 : end - n
  return sum(arr.slice(start, end))
}
