export interface KData {
  open: number
  close: number
  low: number
  high: number
  volume: number
  [key: string]: any
}

export type Callback<V = any, U = any> = (value: V, index: number, array: V[]) => U
export type PropFunction = (v: KData) => number
