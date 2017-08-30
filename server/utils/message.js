const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}
// https://www.google.ca/maps/?q=45.5016889,-73.56725599999999
const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.ca/maps/?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage, generateLocationMessage} 