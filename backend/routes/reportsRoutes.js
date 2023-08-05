

const express = require('express');
const router = express.Router();

const { createConnection } = require('../config/config'); 
router.post('/cadastrarReport', (req, res) => {

    // Rota que cadastra um report no banco de dados
   const {
        nome ,
        centroDeCustos ,
        refAreaAtuacao ,
        descricao ,
        foto1 ,
        foto2 ,
        foto3 ,
        localizacao 
   }   = req.body

   const connection = createConnection();
   connection.query(
    'INSERT INTO reports (nome, centroDeCustos, refAreaAtuacao, descricao, foto1, foto2, foto3, localizacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nome ,centroDeCustos ,refAreaAtuacao ,descricao ,foto1 ,foto2 ,foto3 , localizacao ],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        console.log('Report Cadastrado com sucesso com sucesso!');
        res.status(200).json({ message: 'Dados inseridos com sucesso!' });
      }
    }
  );

  res.json(usuarios);
});

module.exports = router;
