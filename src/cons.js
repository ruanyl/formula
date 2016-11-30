export const CLOSE = s => s.close
export const HIGH = s => s.high
export const LOW = s => s.low
export const VOLUME = s => s.volume
export const formatT = v => Math.round(1000 * v) / 1000
// Typical Price
export const TYP = s => (HIGH(s) + LOW(s) + CLOSE(s)) / 3

export const divideZero = (a, b) => (b === 0 ? 0 : a / b)
