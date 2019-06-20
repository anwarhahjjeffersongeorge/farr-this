'use strict'
import test from 'ava'
import kindOf from 'kind-of'
import { FarrThis as Ft } from '..'

test('accepts objects', t => {
  const o = {
    something: 'ooops'
  }
  const f = new Ft({ o })
  t.deepEqual(f.o, o, 'should have added specified object')
})

test('accepts iterables', t => {
  const iterables = [
    'stringgggg',
    [0, 2, 4, 6, 8]
  ]
  const fs = iterables.map((a) => new Ft({ a }))
  let i = 0
  for (let iterable of iterables) {
    const fres = fs[i]
    for (let ii = 0; ii < iterable.length; ii++) {
      t.is(fres[ii](), iterable[ii], 'should have added functions that produce the elements of the source iterable')
    }
    i++
  }
})

test('new instance starts empty', t => {
  t.is(new Ft().length, 0, 'length must be zero')
})

test('constructor accepts arrays, converting elements to functions', t => {
  const types = [
    '',
    33,
    {},
    [],
    new Int16Array(),
    null
  ]
  const f = new Ft(types)
  // t.log(f)
  for (var i = 0; i < f.length; i++) {
    t.is(kindOf(f[i]), 'function', 'should have been function type')
    t.is(f[i](), types[i], 'bound function should have returned original value')
  }
})

test('constructor accepts arrays, leaving function elements as is', t => {
  const types = [
    '',
    33,
    {},
    () => 5,
    [],
    new Int16Array(),
    null
  ]
  const f = new Ft(types)
  // t.log(f)
  for (var i = 0; i < f.length; i++) {
    t.is(kindOf(f[i]), 'function', 'should have been function type')
    switch (kindOf(types[i])) {
      case 'function':
        t.is(f[i](), types[i](), 'function should return same value as source function')
        break
      default:
        t.is(f[i](), types[i], 'function should have returned original value')
    }
  }
})
