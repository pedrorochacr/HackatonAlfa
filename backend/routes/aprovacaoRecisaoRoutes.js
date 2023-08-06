const express = require('express');
const router = express.Router();

const { createConnection } = require('../config/config'); //faz o insert dos dados de aprovacao na tabela aprovacao do banco de dados, para manutencao de registro
router.post('/', async (req, res) => {
  const {aprovacao, rank, id_gerente, id_solicitacaoRecisao} = req.body;
  console.log(req.body);
  const connection = createConnection();
  connection.query(
    'INSERT INTO aprovacaoRecisao (aprova, placar, idGerente, idSolicitacaoRevisao) VALUES (?, ?, ?, ?)',
    [aprovacao, rank, id_gerente, id_solicitacaoRecisao],
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

router.get('/:id', async (req, res) => { //realiza select na solicitacao para que o coordenador avalie a aprovação
  const idSolicitacao = req.params.id;
  // Rota que cadastra um report no banco de dados
  const { createConnection } = require('../config/config');
  const connection = createConnection();
  connection.query(
    'select * from solicitacaoRecisao where id = ?',
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