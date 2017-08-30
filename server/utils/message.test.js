var expect = require('expect')
var { generateMessage, 
    generateLocationMessage } = require('./message')

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

describe('generateLocationMessage', () => {

  it('should generate correct location object', () => {
    const from = 'Seb'
    const latitude = 1
    const longitude = 1
    const url = 'https://www.google.ca/maps/?q=1,1'
    const message = generateLocationMessage(from, latitude, longitude)
   
    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, url})
  })

})