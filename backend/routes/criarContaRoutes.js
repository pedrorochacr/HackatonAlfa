const express = require('express');
const router = express.Router();


const { createConnection } = require('../config/config');
router.post(
  '/cadastrarUsuario',
  async (req, res) => {
    // Rota que cadastra um report no banco de dados
    const { nome, cargo, email, senha } =
      req.body;

    const connection = createConnection();
    connection.query(
      'INSERT INTO usuario (nome, cargo, email, senha) VALUES (?, ?, ?, ?)',
      [
        nome,
        cargo,
        email,
        senha,
      ],
      (err, result) => {
        if (err) {
          console.error('Erro ao inserir os dados:', err);
          res
            .status(500)
            .json({ error: 'Erro ao inserir os dados no banco de dados.' });
        } else {
          console.log('Usuário Cadastrado com sucesso com sucesso!');
          res.status(200).json({ message: 'Dados inseridos com sucesso!' });
        }
      }
    );
  }
);

module.exports = router;
