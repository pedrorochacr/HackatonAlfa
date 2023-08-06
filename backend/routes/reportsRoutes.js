const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({//define o nome do arquivo que será armazenado
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '.' +
        file.originalname.split('.').pop()
    );
  },
});
const upload = multer({ storage: storage });

const { createConnection } = require('../config/config'); //realiza insert de reports no banco
router.post(
  '/cadastrarReport',
  upload.fields([ //configuração para envio de imagens anexas
    { name: 'foto1', maxCount: 1 },
    { name: 'foto2', maxCount: 1 },
    { name: 'foto3', maxCount: 1 },
  ]),
  async (req, res) => {
    // Rota que cadastra um report no banco de dados
    const { nome, centroDeCustos, refAreaAtuacao, descricao, localizacao } =
      req.body;
    const foto1 = req.files['foto1'][0].filename;
    const foto2 = req.files['foto2'] ? req.files['foto2'][0].filename : '';
    const foto3 = req.files['foto3'] ? req.files['foto3'][0].filename : '';

    const connection = createConnection();
    connection.query(
      'INSERT INTO reports (nome, centroDeCustos, refAreaAtuacao, descricao, foto1, foto2, foto3, localizacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nome,
        centroDeCustos,
        refAreaAtuacao,
        descricao,
        foto1,
        foto2,
        foto3,
        localizacao,
      ],
      (err, result) => {
        if (err) {
          console.error('Erro ao inserir os dados:', err);
          res
            .status(500)
            .json({ error: 'Erro ao inserir os dados no banco de dados.' });
        } else {
          console.log('Report Cadastrado com sucesso com sucesso!');
          res.status(200).json({ message: 'Dados inseridos com sucesso!' });
        }
      }
    );
  }
);
router.get('/',async (req, res) => { //select para visualização de reports externos nas página do sistema interno
  // Rota que cadastra um report no banco de dados
  const connection = createConnection();
  connection.query(
    'select * from reports',
    (err, result) => {
      if (err) {
        console.error('Erro ao pesquisar reports:', err);
        res
          .status(500)
          .json({ error: 'Erro ao pesquisar reports' });
      } else {
        const resultado = result;
        
        res.send(resultado);
      }
    }
  );
}
);
module.exports = router;
