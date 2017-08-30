var socket = io()

socket.on('connect', function() {
  console.log('connected to server from HTML script')

  socket.emit('createMessage', {
    from: 'cat@cat.cat',
    text: 'Hey, thi is me'
  })
})

socket.on('disconnect', function() {
  console.log('disconnected from server')
})

//paired with emit
socket.on('newMessage', function(newMessage) {
  console.log('New message', newMessage)
})