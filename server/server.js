const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {isString} = require('./utils/validation')
const {generateMessage,
  generateLocationMessage} = require('./utils/message')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public') 
const app = express()
const server = http.createServer(app)
// server - client
const io = socketIO(server) 
// serve static HTML
app.use(express.static(publicPath)) 

// persistent connection open
io.on('connection', (socket) => {
  console.log('new user connected and logged from server')

  // new user can see this
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'))

  // all but new user can see this
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  // here is on the chat.js has emit
  socket.on('join', (params, cb) => {
    if(!isString(params.name) || !isString(params.room)) {
      cb('Name and room required')
    }
    cb()
  })

  // message from one user to all users
  socket.on('createMessage', (message, cb) => {
    console.log('created message server looks', message)
    // listener for create msg
    io.emit('newMessage', generateMessage(message.from, message.text))
    cb()
  })
  // event lister create location msg
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`))
  })

  socket.on('disconnect', () =>  {
    console.log('disconnected client and logged from server')
  })

})

server.listen(port, () =>  {
  console.log(`Express is now in charge of port: ${port}`)
})
