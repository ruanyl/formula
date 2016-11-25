import { T, compose, reverse, last, cond, equals, transpose, head, juxt, drop } from 'ramda'

/**
 * funcs = [func1, func2, func3]
 * v1 = func1()
 * v2 = func2(v1)
 * v3 = func3(v1, v2)
 *
 * return [v1, v2, v3]
 *
 * @returns {undefined}
 */
export const mapCompose = funcs => {
  const mappedFuncs = funcs.map((f, idx) =>
    cond([
      [equals(0), () => compose(arr => [arr], f)],
      [equals(funcs.length - 1), () => arr => [...arr, f(...arr)]],
      [T, () => arr => [...arr, f(last(arr))]],
    ])(idx)
  )
  return compose(...reverse(mappedFuncs))
}

export const mix = (f, ...args) => args[0].map((v, i) => f(...args.map(a => a[i])))

export const mixAll = (fns, ...args) => transpose(
  args[0].map(
    (v, i) => fns.map(
      fn => fn(...args.map(a => a[i]))
    )
  )
)

/**
 * funcs: [f1, f2, f3, f4]
 * return [f1(v), f2(v), f3(v), f4([f1(v), f2(v), f3(v)])]
 */
export const mapMix = funcs => d => {
  const mixFn = head(funcs)
  const mapFns = drop(1, funcs)
  const mapL = juxt(mapFns)(d)
  return [...mapL, mixFn(...mapL)]
}
