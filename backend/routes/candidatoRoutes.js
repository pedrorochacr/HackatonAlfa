

const express = require('express');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage })
const { createConnection } = require('../config/config'); 
router.post('/cadastrarCandidato', upload.fields([
    { name: 'arquivoIdentidade', maxCount: 1 },
    { name: 'arquivoCpf', maxCount: 1 },
    { name: 'arquivoCurriculo', maxCount: 1 },
    { name: 'arquivoCnh', maxCount: 1 },
    { name: 'arquivoReservista', maxCount: 1 },
  ]), async (req, res) => { // rota definida com post para passar os dados no corpo
    // Rota que cadastra um candidato no banco de dados
   const {
        nomeCompletoMae ,
        nomeCompletoPai ,
        nomeCompleto ,
        sexo ,
        dependentes,
        estadoCivil ,
        grauInstrucao ,
        raca ,
        dataNascimento ,
        nacionalidade ,
        paisNascimento ,
        estadoNascimento ,
        cidadeNascimento ,
        numeroBotina ,
        numeroCalca ,
        tamanhoCamisa ,
        telefone1 ,
        telefone2 ,
        email ,
        cep ,
        pais,
        estado ,
        cidade ,
        bairro ,
        tipoLogradouro ,
        enderecoResidencial ,
        numero,
        complementoEndereco ,
        rg ,
        emissorRg ,
        estadoOrgaoEmissor ,
        cidadeEmissorRg ,
        dataEmissao,
        numeroCpf,
        numeroPis,
        funcao ,
        alojado ,
        pcd,
        parenteOuAmigo ,
    
   }   = req.body
   const arquivoIdentidade = req.files['arquivoIdentidade'][0].filename;
  const arquivoCpf = req.files['arquivoCpf'][0].filename;
  const arquivoCurriculo = req.files['arquivoCurriculo'][0].filename;
  const arquivoCnh = req.files['arquivoCnh'] ? req.files['arquivoCnh'][0].filename : null;
  const arquivoReservista = req.files['arquivoReservista'] ? req.files['arquivoReservista'][0].filename : null;


  
   const connection = createConnection();
   connection.query(
    'INSERT INTO Candidato (nomeCompletoMae, nomeCompletoPai, nomeCompleto, sexo, estadoCivil, grauInstrucao, raca, dataNascimento, nacionalidade, paisNascimento, estadoNascimento, cidadeNascimento, numeroBotina, numeroCalca, tamanhoCamisa, telefone1, telefone2, email, cep, pais, estado, cidade, bairro, tipoLogradouro, enderecoResidencial, numero, complementoEndereco, rg, emissorRg, estadoOrgaoEmissor, cidadeEmissorRg, dataEmissao, numeroCpf, numeroPis, funcao, alojado, pcd, arquivoIdentidade, arquivoCpf, arquivoCurriculo, arquivoCnh, arquivoReservista, parenteOuAmigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nomeCompletoMae, nomeCompletoPai, nomeCompleto, sexo, estadoCivil, grauInstrucao, raca, dataNascimento, nacionalidade, paisNascimento, estadoNascimento, cidadeNascimento, numeroBotina, numeroCalca, tamanhoCamisa, telefone1, telefone2, email, cep, pais, estado, cidade, bairro, tipoLogradouro, enderecoResidencial, numero, complementoEndereco, rg, emissorRg, estadoOrgaoEmissor, cidadeEmissorRg, dataEmissao, numeroCpf, numeroPis, funcao, alojado, pcd, arquivoIdentidade, arquivoCpf, arquivoCurriculo, arquivoCnh, arquivoReservista, parenteOuAmigo],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res.status(500).json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        console.log('Candidato cadastrado com sucesso!');
        if(dependentes){ // se o candidato for cadastrado com sucesso e esse possui dependentes, eles serão inseridos
            insertDependentes(result.insertId, dependentes, (err) => {
                if (err) {
                  console.error('Erro ao inserir os dependentes:', err);
                  res.status(500).json({ error: 'Erro ao inserir os dependentes no banco de dados.' });
                } else {
                  console.log('Dependentes cadastrados com sucesso!');
                  res.status(200).json({ message: 'Candidato e dependentes cadastrados com sucesso!' });
                }
              });
        }
        res.status(200).json({ message: 'Candidato cadastrado com sucesso!', nomeCompleto: nomeCompleto ,});
      }
    }
  );
  
  
});

// Função para inserir os dependentes na tabela "dependentes" usando callbacks
async function insertDependentes (idCandidato, dependentes) {
    
      // Monta os valores para o INSERT na tabela "dependentes"
      const values = dependentes.map((dependente) => [idCandidato, dependente.nome, dependente.parentesco]);
      
      // Executa o INSERT
      const sql = 'INSERT INTO dependentes (idCandidato, nome, parentesco) VALUES ?';
      connection.query(sql, [values], (err, result) => {
        if (err) {
         console.error("Falha ao cadastrar candidatos :" ,err)
        }
      });
    
  }
  



module.exports = router;