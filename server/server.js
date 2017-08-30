const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public') 
const app = express()
const server = http.createServer(app)
const io = socketIO(server) // server - client

app.use(express.static(publicPath)) // serve static HTML

// persistent connection
io.on('connection', (socket) => {
  console.log('new user connected and logged from server')

  socket.on('disconnect', () => {
    console.log('disconnected and logged from server')
  })

})

server.listen(port, () => {
  console.log(`Express is now in charge of port: ${port}`)
})
