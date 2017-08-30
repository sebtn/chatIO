var socket = io()

socket.on('connect', function() {
  console.log('connected to server from HTML script')
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})

//paired with emit
socket.on('newMessage', function(newMessage) {
  console.log('New message', newMessage)
  var li = jQuery('<li></li>')
  li.text(`${newMessage.from}: ${newMessage.text}`)
  jQuery('#messages-list').append(li)
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function() {

  })
})