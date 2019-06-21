module.exports = {
  files: 'test/farrtest/*.test.js',
  from: ['import { Farr } from \'..\'', /const\stolerance\s=\s\d*\.\d*/],
  to: [(...args) => {
    const filePath = args[args.length - 1]
    const constructorTestPath = 'test/farrtest/constructor.test.js'
    const replacements = {
      constructorTest: 'import { Farr } from \'../..\'',
      default: 'import { FarrThis as Farr } from \'../..\''
    }
    return filePath === constructorTestPath ? replacements.constructorTest : replacements.default
  }, (...args) => {
    const match = args[0]
    const filePath = args[args.length - 1]
    const periodicTestPath = 'test/farrtest/periodic.test.js'
    const replacements = {
      periodicTest: 'const tolerance = .2',
      match
    }
    return filePath === periodicTestPath ? replacements.periodicTest : replacements.match
  }]
}
