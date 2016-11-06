import test from 'ava'
import { reverse, map, concat } from 'ramda'
import { mapCompose } from '../src/functional'

test('Map Compose', t => {
  const mapFuncs = mapCompose([reverse, map(v => 2 * v), concat])
  const results = mapFuncs([1, 2, 3])
  t.deepEqual(results, [[3, 2, 1], [6, 4, 2], [3, 2, 1, 6, 4, 2]])
})
