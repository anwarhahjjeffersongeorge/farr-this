'use strict'
import test from 'ava'
import { FarrThis, Farr } from '..'

test('can import Farr and FarrThis', t => {
  t.not(typeof Farr, 'undefined', 'is something')
  t.is(typeof Farr, 'function', 'is a something type')
  t.not(typeof FarrThis, 'undefined', 'is something')
  t.is(typeof FarrThis, 'function', 'is a something type')
})
