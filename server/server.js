/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jas12/mil13',
  database: 'teste'
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão bem sucedida ao banco de dados MySQL');
});

module.exports = connection;
