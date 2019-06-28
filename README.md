[![Version](https://img.shields.io/github/package-json/v/anwarhahjjeffersongeorge/farr-this/master.svg)](https://github.com/anwarhahjjeffersongeorge/farr-this)[![Build Status](https://travis-ci.com/anwarhahjjeffersongeorge/farr-this.svg?branch=master)](https://travis-ci.com/anwarhahjjeffersongeorge/farr-this) [![codecov](https://codecov.io/gh/anwarhahjjeffersongeorge/farr-this/branch/master/graph/badge.svg)](https://codecov.io/gh/anwarhahjjeffersongeorge/farr-this)
------------

[![license](https://img.shields.io/github/license/anwarhahjjeffersongeorge/farr-this.svg)](UNLICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brown.svg)](https://standardjs.com)

--------------

# &mdash; `farr-this` &mdash;

### Documentation
Please see: [Documentation](https://anwarhahjjeffersongeorge.github.io/farr-this/)

### Arrays of _bound_ functions with shared `this` parameters.

This module exports a class `FarrThis`, that extends the native Array class (via its parent class [Farr](https://anwarhahjjeffersongeorge.github.io/farr/)).

Anytime an [array-index](http://ecma-international.org/ecma-262/9.0/index.html#array-index)-valued property of a `FarrThis` is set, the provided value gets filtered:
- If the value is a `function`, it's bound.
- If the value is not a `function`, it's replaced by a new bound function that produces the value when called.

This means that `FarrThis` arrays only store bound `function` elements or empty slots.

### `this` Binding
Each function element has a bound `this` property corresponding to a plain object with some common parameters:

1. `a`: the containing instance (`FarrThis`)
2. `i`: the index of this element in the containing instance (`integer`)
3. `f`: a reference to this element (`function`)
4. `o`: any user-specified object, also accessible as the `o` property of the containing instance ('object')

### `Farr`
For convienience, this module also exports its parent class, [Farr](https://anwarhahjjeffersongeorge.github.io/farr/)).

-------

## Installation

Run `npm install farr-this`

## Usage

    import { FarrThis as Ft } from 'farr'
    const n = 5
    function e () {
      return this.i
    }
    const a = new Array(n).fill(e)
    const f = new Ft({ a })
    f.push(e)
    const result = await f.all() // [ 0, 1, 2, 3, 4, 5 ]

## Testing

Run `npm test`. This will also trigger a download of the tests from the `farr` dependency. These tests will be stored and run in the `test/farrtest` directory, so don't put anything there.

## Incompatibilities
The following features of `farr` are incompatible with `farr-this`:

- `generated`: all elements undergo mutation
- `givenFunc`: all elements undergo mutation
