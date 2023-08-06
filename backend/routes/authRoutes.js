const express = require('express');
const router = express.Router();

const { createConnection } = require('../config/config');
router.post('/register', async (req, res) => {
  const { email, senha, nome, cargo } = req.body;

  const connection = createConnection();
  connection.query(
    'INSERT INTO usuario (email, senha, nome, cargo) VALUES (?, ?, ?, ?)',
    [email, senha, nome, cargo],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res
          .status(500)
          .json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        console.log('Usuário cadastrado com sucesso!');
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      }
    }
  );
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const connection = createConnection();
  connection.query(
    'SELECT nome, cargo, email FROM usuario WHERE email = ? AND senha = ?',
    [email, senha],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res
          .status(500)
          .json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
      
          res.status(200).json(result[0]);
        }
      }
    }
  );
});

module.exports = router;
