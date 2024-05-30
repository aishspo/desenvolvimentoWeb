/* eslint-disable @typescript-eslint/no-var-requires */
 const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jas12/mil13',
  database: 'sagu',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão bem sucedida ao banco de dados MySQL');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

module.exports = {
  pool, getConnection
};