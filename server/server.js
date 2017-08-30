const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public') 
const app = express()
const server = http.createServer(app)
// server - client
const io = socketIO(server) 
// serve static HTML
app.use(express.static(publicPath)) 

// persistent connection open
io.on('connection', (socket) =>  {
  console.log('new user connected and logged from server')

  // message from one user to all users
  socket.on('createMessage', (message) => {
    console.log('created message server looks', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('newMessage', (newMessage) => {
    console.log('from client logged into server', newMessage)
  })

  socket.on('disconnect', () =>  {
    console.log('disconnected client and logged from server')
  })

})

server.listen(port, () =>  {
  console.log(`Express is now in charge of port: ${port}`)
})
