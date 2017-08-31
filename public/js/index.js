var socket = io()

socket.on('connect', function() {
  console.log('connected to server from HTML script')
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})

/*-----------------------------------------------------*/
// new msg lsitener
// value passed into moment
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  })
  jQuery('#messages-list').append(html)
})

/*-----------------------------------------------------*/
// markup to render location
socket.on('newLocationMessage', function(message) { 
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })
  jQuery('#messages-list').append(html)
})

/*-----------------------------------------------------*/
var messageTextBox = jQuery('[name=message]')
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
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