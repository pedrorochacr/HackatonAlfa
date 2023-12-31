const express = require('express');
const router = express.Router();

const { createConnection } = require('../config/config');
router.post('/', async (req, res) => { //insert de solicitacao de férias no banco de dados
  const {dataInicio, dataFinal, id_colaborador} = req.body;
  const connection = createConnection();
  connection.query(
    'INSERT INTO solicitacaoFerias (dataInicio, dataFinal, id_colaborador) VALUES (?, ?, ?)',
    [dataInicio, dataFinal, id_colaborador],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res
          .status(500)
          .json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        console.log('Solicitação salva com sucesso!');
        res.status(200).json({ message: 'Solicitação salva com sucesso!' });
      }
    }
  );
});

module.exports = router;
