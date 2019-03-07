import { KData } from './types';

export const CLOSE = (s: KData) => s.close
export const HIGH = (s: KData) => s.high
export const LOW = (s: KData) => s.low
export const VOLUME = (s: KData) => s.volume
export const formatT = (v: number) => Math.round(1000 * v) / 1000
// Typical Price
export const TYP = (s: KData) => (HIGH(s) + LOW(s) + CLOSE(s)) / 3

export const divideZero = (a: number, b: number) => (b === 0 ? 0 : a / b)
