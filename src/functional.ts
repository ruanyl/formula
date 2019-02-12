import { transpose, head, juxt, drop } from 'ramda'

export interface Mix {
  (f: Function, arg1: any[], arg2: any[]): any[]
  <T1, T2, U>(f: (v1: T1, v2: T2) => U, arg1: T1[], arg2: T2[]): U[]
  <T1, T2, T3, U>(f: (v1: T1, v2: T2, v3: T3) => U, arg1: T1[], arg2: T2[], arg3: T3[]): U[]
  <T1, T2, T3, T4, U>(f: (v1: T1, v2: T2, v3: T3, v4: T4) => U, arg1: T1[], arg2: T2[], arg3: T3[], arg4: T4[]): U[]
}

export const mix: Mix = (f: Function, ...args: any[]) => transpose(args).map(arg => f(...arg))

/**
 * funcs: [f1, f2, f3, f4]
 * return [f1(v), f2(v), f3(v), f4([f1(v), f2(v), f3(v)])]
 */
interface MapMix {
  (funcs: Function[]): (d: any) => any[]
  <T1, T2, U0, U1, U2, D, U>(func0: (u1: U1, u2: U2) => U0, func1: (t1: T1) => U1, func2: (t2: T2) => U2): (d: D) => U
}
export const mapMix: MapMix = (...funcs: any[]) => (d: any) => {
  const mixFn = head(funcs)
  const mapFns = drop(1, funcs)
  const mapL = juxt(mapFns)(d)
  return [...mapL, mixFn(...mapL)]
}
