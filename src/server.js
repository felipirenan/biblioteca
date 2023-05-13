
const express = require('Express');
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use('/',routes)

app.listen(3001, ()=>{
    console.warn('Servidor rodando na porta 3001')
})

