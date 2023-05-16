
const http = require('http')
const app = require("./controller/app");
const port = 3001
const server = http.createServer(app)

server.listen(port,()=>{
    console.warn('Servidor escutando na porta 3001')
})
