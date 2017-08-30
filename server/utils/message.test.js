var expect = require('expect')
var {generateMessage} = require('./message')

describe('generateMessage', () => {

  it('should generate correct object', () => {
    const from = 'Seb'
    const text = 'Some text'
    const message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message.from).toMatch('Seb')
    expect(message.text).toMatch('Some text')
  })

})