var socket = io()

socket.on('connect', function() {
  console.log('connected to server from HTML script')
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})

/*-----------------------------------------------------*/
socket.on('newMessage', function(newMessage) {
  var li = jQuery('<li></li>')
  li.text(`${newMessage.from}: ${newMessage.text}`)
  jQuery('#messages-list').append(li)
})

/*-----------------------------------------------------*/
// generate dom
socket.on('newLocationMessage', function(message) { 
  var li = jQuery('<li></li>')
  var a = jQuery('<a target="_blank">Current location</a>')
  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a)
  jQuery('#messages-list').append(li)
})

/*-----------------------------------------------------*/
var messageTextBox = jQuery('[name=message]')
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.val()
  }, function() { //cb is acknowledgment
    messageTextBox.val('')
  })
})

/*-----------------------------------------------------*/
var locationButton = jQuery('#send-location')
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('No geo-location support')
  }
  locationButton.attr('disabled', 'disabled').text('Sending ...')
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
      locationButton.removeAttr('disabled').text('Send Location')
      alert('Unable to fetch location!')
  })
})

/*-----------------------------------------------------*/