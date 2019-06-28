// ESM syntax is supported.
import { Farr } from 'farr'
import isIterable from 'is-iterable'

/**
 * Arrays of functions with shared 'this' properties.
 */
class FarrThis extends Farr {
  /**
   * o - an object shared by all bound function elements
   * @memberof FarrThis#
   * @name o
   */
  o = {}
  #P
  #premapper = null
  #funcWrapper = (w, i) => {
    w = typeof this.#premapper === 'function' ? this.#premapper(w) : w
    let f = typeof w === 'function' ? w : function () {
      return w
    }
    // console.log(f)
    f = f.bind(Object.defineProperties({
      f,
      i,
      a: this.#P
    }, {
      o: {
        get: () => this.o
      }
    }))
    return f
  }
  #unsupportedInheritances = ['generated', 'givenFunc']
  /**
   * constructor - create a FarrThis instance that can contain bound functions, where each function's this value is a plain object with some common parameters:
   *
   * 1. `a`: the containing instance (`FarrThis`)
   * 2. `i`: the index of this element in the containing instance (`integer`)
   * 3. `f`: a reference to this element (`function`)
   * 4. `o`: any user-specified object, also accessible as the `o` property of the containing instance ('object')
   *
   *
   * @param {(object|iterable|number)} [p = { a: [], o: {} }] if a number, creates instance of that length. if an iterable, use its elements to generate new bound functions
   * @param {iterable} p.a iterable source for generating elements
   * @param {object} p.o object to use for shared this binding
   */
  constructor (p = { a: [], o: {} }) {
    if (typeof p === 'number') {
      super(p)
      return
    } else {
      super()
    }
    p = isIterable(p) ? { a: p } : p
    this.#P = new Proxy(this, {
      set (target, prop, value) {
        if (Farr.isSafeIndex(prop)) {
          return Reflect.set(target, prop, target.#funcWrapper(value, parseInt(prop)))
        }
        return Reflect.set(target, prop, value)
      },
      get (target, prop, value) {
        if (Farr.nonTerminalKeys.includes(prop)) {
          // console.log(prop)
          return (...args) => {
            if (prop === 'premap') {
              target.#premapper = typeof args[0] === 'function' ? args[0] : null
            } else {
              target[prop](...args)
            }
            return target.#P
          }
        }
        return Reflect.get(target, prop, value)
      }
    })
    this.o = typeof p.o === 'object' ? p.o : this.o
    const arr = isIterable(p.a) ? Array.from(p.a) : []
    for (let x of arr) {
      this.#P.push(x)
    }
    return this.#P
  }
}
export { FarrThis, Farr }
