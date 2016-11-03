import { preSum } from './arrayMath'

export const sma = (n = 5, f) => (data = []) => {
  const finalData = f === undefined ? data : data.map(f)
  return finalData.reduce((pv, cv, idx) => (idx < n - 1 ? pv.concat([null]) : pv.concat([preSum(n, idx, finalData) / n])), [])
}
