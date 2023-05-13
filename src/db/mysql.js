const mysql = require('mysql2');

//create the connection to database
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'db_bliblioteca'
});

exports.pool = pool;