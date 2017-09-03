var socket = io()

function scrollToBottom () {
  // selector
  var messages = jQuery('#messages-list')
  var newMessage = messages.children('li:last-child')
  // heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  var sum = clientHeight + scrollTop + lastMessageHeight +newMessageHeight
  if(sum >= scrollHeight)  messages.scrollTop(scrollHeight)  
  
}

/*-----------------------------------------------------*/
// emit event join
socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search)
  socket.emit('join', params, function (err) {
    if(err) {
      alert(err)
      window.location.href = '/'
    }
    else {
      console.log('No error from join emitted in chat')
    }
  })
})

/*-----------------------------------------------------*/
socket.on('disconnect', function () {
  console.log('disconnected from server')
})

/*-----------------------------------------------------*/
  socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>')
    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#users').html(ol)
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
  scrollToBottom()
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
  scrollToBottom()
})

/*-----------------------------------------------------*/
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()
  var messageTextBox = jQuery('[name=message]')
  socket.emit('createMessage', {
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
