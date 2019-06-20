module.exports = {
  files: 'test/farrtest/*.test.js',
  from: 'import { Farr } from \'..\'',
  to: (...args) => {
    const filePath = args[args.length - 1]
    const constructorTestPath = 'test/farrtest/constructor.test.js'
    const replacements = {
      constructorTest: 'import { Farr } from \'../..\'',
      default: 'import { FarrThis as Farr } from \'../..\''
    }
    return filePath === constructorTestPath ? replacements.constructorTest : replacements.default
  }
}
