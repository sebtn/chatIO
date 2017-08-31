const expect = require('expect')
var { isString } = require('./validation')

describe('validation', () => {

  it('Should reject non-strings', () => {
    const nonString = 1
    const result = isString(nonString)
    expect(result).toBe(false)    
  })  

  it('Should reject strings with spaces', () => {
    const stringSpaced = '    '
    const result = isString(stringSpaced)
    expect(result).toBe(false)
  })  

  it('Should allow non space chars', () => {
    const nonSpaced = ' somethingHere '
    const result = isString(nonSpaced)
    expect(result).toBe(true)
  })

})