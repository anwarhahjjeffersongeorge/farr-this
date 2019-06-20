'use strict'
import test from 'ava'
import { FarrThis as Ft } from '..'

test('this.o › function elements can access bound objects', async t => {
  function e () {
    this.o.base = this.o.base * mul
    return this.o.base
  }
  const o = {
    base: 8
  }
  const { base } = o
  const mul = 3
  const n = 5
  const a = new Array(n).fill(e)
  const expected = base * mul ** (n + 1)
  const f = new Ft({ o, a })
  f.push(e)
  const result = await f.cascade()
  t.deepEqual(o.base, expected, 'should have done operation using start value from source object, mutating source object')
  t.deepEqual(result, expected, 'should have done operation using start value from source object, returning mutated result')
})

test('this.i › function elements can access bound index', async t => {
  const n = 5
  function e () {
    return this.i
  }
  const a = new Array(n).fill(e)
  const f = new Ft({ a })
  f.push(e)
  const result = await f.all()
  const expected = [ 0, 1, 2, 3, 4, 5 ]
  t.deepEqual(result, expected, 'should have done operation using start value from source object, returning mutated result')
})

test('this.a › function elements can access bound FarrThis instance', async t => {
  const n = 55
  function e () {
    t.is(this.a, f, 'must have reference to instance in this object')
  }
  const f = new Ft(new Array(n).fill(e))
  return f.cascade()
})

test('this.f › function elements can access bound selves', async t => {
  const n = 55
  function e (recursing = false) {
    if (recursing) {
      return this
    } else {
      t.is(this.f(true), this, 'must have callable reference to bound self')
    }
  }
  const f = new Ft(new Array(n).fill(e))
  return f.cascade()
})
