/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jas12/mil13',
  database: 'teste',
});

pool.getConnection()
  .then(connection => {
    console.log('Conexão bem sucedida ao banco de dados MySQL');
    connection.release();
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = pool;
