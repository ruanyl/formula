import { multiply, compose, map } from 'ramda'
import { ref } from './arrayMath'
import { CLOSE, divideZero } from './cons'

export const rocr = periods => data => data.map((v, i) => {
  const refClose = ref(CLOSE, periods)(data, i)
  return divideZero(CLOSE(v), refClose)
})

export const rocp = periods => data => data.map((v, i) => {
  const refClose = ref(CLOSE, periods)(data, i)
  return divideZero(CLOSE(v) - refClose, refClose)
})

export const roc = periods => compose(map(multiply(100)), rocp(periods))
