const { pool } = require('../db/mysql');

const path = require('path')
const mysql = require('../db/mysql').pool;

class dbController {
    index(request, response){
        try{
            mysql.getConnection(function(err, conn) {
                if (err) throw err;
                mysql.query("SELECT * FROM tbl_vendas", function (err, result, fields) {
                if (err) throw err;
               // const data = JSON.parse(result)
                return response.status(200).send({ response: result})
                });
                });
        } catch (e) {
            console.log(e)
            return response.status(500).json({ erro: 'Erro de execução' })
        }
    }
}

module.exports = dbController