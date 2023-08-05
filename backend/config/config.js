

const mysql = require('mysql2');

// Função para criar e retornar a conexão com o banco de dados
function createConnection() {
  return mysql.createConnection(process.env.DATABASE_URL);
}

module.exports = { createConnection };
