var express = require('express')
var app = express()

require('./middlewares/db')
const path = require('path')

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.json())

const setHeaders = require('./middlewares/headers')
app.use(setHeaders)

const testRoutes = require('./routes/tests')
app.use('/api/tests', testRoutes)

const userRoutes = require('./routes/users')
app.use('/api', userRoutes)

const bookRoutes = require('./routes/books')
app.use('/api/books', bookRoutes)

module.exports = app

