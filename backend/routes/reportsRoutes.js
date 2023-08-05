

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


const { createConnection } = require('../config/config'); 
router.post('/cadastrarReport', upload.fields([
    { name: 'foto1', maxCount: 1 },
    { name: 'foto2', maxCount: 1 },
    { name:'foto3', maxCount: 1 },
  ]),
  async (req, res) => {

    // Rota que cadastra um report no banco de dados
   const {
        nome ,
        centroDeCustos ,
        refAreaAtuacao ,
        descricao ,
        localizacao 
   }   = req.body
   const foto1 = req.files['arquivoIdentidade'].filename;
    const foto2 = req.files['arquivoCpf'].filename;
    const foto3 = req.files['arquivoCurriculo'].filename;
  
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


});

module.exports = router;
