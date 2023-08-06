const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
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

const { createConnection } = require('../config/config');

router.get('/:codigo', async (req, res) => {  //realiza select no equipamento do link no qrCode
  const codigo = req.params.codigo;
  const connection = createConnection();
  connection.query(
    'select * from areaOuEquipamento where codigo = ?',
    codigo,
    (err, result) => {
      if (err) {
        console.error('Erro ao pesquisar area ou equipamento:', err);
        res
          .status(500)
          .json({ error: 'Erro ao pesquisar area ou equipamento' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: 'Area ou equipamento não encontrado' });
          return;
        }
        res.status(200).json(result[0]);
      }
    }
  );
});

router.post( //cadastra uma nova area ou novo quipamento no banco de dados
  '/cadastrarAreaOuEquipamento',
  upload.single('anexo'),
  async (req, res) => {
    // Rota que cadastra um report no banco de dados
    const { codigo, descricao, status, tipo } = req.body;
    const anexo = req.file ? req.file.filename : ''; //configurações específicas para envio de anexo
    const connection = createConnection();
    connection.query(
      'INSERT INTO areaOuEquipamento (codigo, descricao, status, anexo, tipo) VALUES (?, ?, ?, ?, ?)',
      [codigo, descricao, status, anexo, tipo],
      (err, result) => {
        if (err) {
          console.error('Erro ao inserir os dados:', err);
          res
            .status(500)
            .json({ error: 'Erro ao inserir os dados no banco de dados.' });
        } else {
          console.log('Area ou Equipamento Cadastrado com sucesso!');
          res.status(200).json({ message: 'Dados inseridos com sucesso!' });
        }
      }
    );
  }
);

module.exports = router;
