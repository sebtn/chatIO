const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {isString} = require('./utils/validation')
const {Users} = require('./utils/users')
const {generateMessage,
  generateLocationMessage} = require('./utils/message')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public') 
const app = express()
const server = http.createServer(app)
// server - client
const io = socketIO(server) 
const users = new Users()
// serve static HTML
app.use(express.static(publicPath)) 

/*
  Server emit events:
=================================================================
  io.emit 
    -> emits to every connected user (connections in socket??)
=================================================================
  socket.broadcast.emit 
    -> emits to everyone connected to the socket but current user
=================================================================
  socket.emit -> emit specifically event to one user
------------------------------------------------------------------
  Specific room use '.to'
=================================================================
  io.emit -> io.to('room').emit
    -> Ever person connected to the room
=================================================================
  socket.broadcast.to('room').emit
    -> Everybody in room except current user 
      calling socket.broadcast
 */

/*-----------------------------------------------------*/
// persistent connection open
io.on('connection', (socket) => {
  console.log('new user connected and logged from server')

/*-----------------------------------------------------*/
  // note 'on' used here since the chat.js has emit
  socket.on('join', (params, cb) => {
    if(!isString(params.name) || !isString(params.room)) {
      return cb('Name and room required')
    }
    // emit to peps in same room using user class
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    // target specific user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'))
    // emit to a all users in room but broadcaster
    socket.broadcast.to(params.room)
      .emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
    cb()
  })
  
/*-----------------------------------------------------*/
  // message from one user to all users
  socket.on('createMessage', (message, cb) => {
    console.log('created message server looks', message)
    // listener for create msg
    io.emit('newMessage', generateMessage(message.from, message.text))
    cb()
  })
  // event lister create location msg
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', 
      `${coords.latitude}`, `${coords.longitude}`))
  })

/*-----------------------------------------------------*/
// persistent connection closed
  socket.on('disconnect', () =>  {
    var user = users.removeUser(socket.id)
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room)) //update list
      io.to(user.room).emit('newMessage', generateMessage('Admin', 
        `${user.name} has left`) ) // print msg
    }
    console.log('disconnected client and logged from server')
  })
})

/*-----------------------------------------------------*/
/*
  Make nodemon run:
    -> ./node_modules/.bin/nodemon server/server.js
*/
server.listen(port, () =>  {
  console.log(`Express is now in charge of port: ${port}`)
})
