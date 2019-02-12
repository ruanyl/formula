type KData = {
  open: number
  close: number
  low: number
  high: number
  volume: number
  [key: string]: any
}

type Callback<V = any, U = any> = (value: V, index: number, array: V[]) => U
type PropFunction = (v: KData) => number
