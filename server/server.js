const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public') 
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicPath)) // serve static HTML
app.listen(port)
console.log('Express is now in charge of port: ' + port)
