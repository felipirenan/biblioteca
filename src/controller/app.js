const express = require('Express');
//const cors = require('cors')
const morgan = require('morgan')
const rotaAutores = require('../routes/autores')
const app = express()
const bodyParser = require('body-parser')

//app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json()) // pode utilizar o app.use(express.json())

app.use('/autores',rotaAutores)

module.exports = app