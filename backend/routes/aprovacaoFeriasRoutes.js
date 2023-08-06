const express = require('express');
const router = express.Router();

const { createConnection } = require('../config/config');
router.post('/', async (req, res) => {
  const {aprovacao, id_gerente, id_solicitacaoFerias} = req.body;
  
  console.log(req.body);
  const connection = createConnection();
  connection.query(
    'INSERT INTO aprovacaoFerias (aprovacao, id_gerente, id_solicitacaoFerias) VALUES (?, ?, ?)',
    [aprovacao, id_gerente, id_solicitacaoFerias],
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

router.get('/:id', async (req, res) => {
  const idSolicitacao = req.params.id;
  // Rota que cadastra um report no banco de dados
  const { createConnection } = require('../config/config');
  const connection = createConnection();
  connection.query(
    'select * from solicitacaoFerias where id = ?',
    idSolicitacao,
    (err, result) => {
      if (err) {
        console.error('Erro ao realizar select:', err);
        res
          .status(500)
          .json({ error: 'Erro ao realizar select' });
      } else {
        const resultado = result;
        if (resultado.length == 0) {
          res
            .status(500)
            .json({ error: 'Erro ao realizar select' });
          return
        }
        res.status(200).json(resultado[0])
      }
    }
  );
}
);
module.exports = router;