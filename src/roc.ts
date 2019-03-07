import { multiply, compose, map, take } from 'ramda'
import { ref } from './arrayMath'
import { CLOSE, divideZero } from './cons'
import { KData } from './types';

export const rocr = (periods: number) => (data: KData[]) => data.map((v, i) => {
  const refClose = ref(CLOSE, periods)(take(i + 1, data))
  return divideZero(CLOSE(v), refClose)
})

export const rocp = (periods: number) => (data: KData[]) => data.map((v, i) => {
  const refClose = ref(CLOSE, periods)(take(i + 1, data))
  return divideZero(CLOSE(v) - refClose, refClose)
})

export const roc = (periods: number) => compose(map(multiply(100)), rocp(periods))
