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
const { compressPdf } = require('../Util/CompactarArquivos');

router.post('/cadastrarAreaOuEquipamento', upload.single('anexo'), async (req, res) => {
  // Rota que cadastra um report no banco de dados
  const { codigo, descricao, status } = req.body;
  const anexo = req.file ? req.file.filename : '';

  console.log(anexo)
  await compressPdf(anexo);
  const connection = createConnection();
  connection.query(
    'INSERT INTO areaOuEquipamento (codigo, descricao, status, anexo) VALUES (?, ?, ?, ?)',
    [codigo, descricao, status, anexo],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        console.log('Area ou Equipamento Cadastrado com sucesso!');
        res.status(200).json({ message: 'Dados inseridos com sucesso!' });
      }
    }
  );
});

module.exports = router;
