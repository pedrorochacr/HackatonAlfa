

const express = require('express');
const router = express.Router();

const { createConnection } = require('../config/config'); 
router.post('/cadastrarCandidato', (req, res) => { // rota definida com post para passar os dados no corpo
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
        arquivoIdentidade ,
        arquivoCpf ,
        arquivoCurriculo ,
        arquivoCnh,
        arquivoReservista ,
        parenteOuAmigo ,
    
   }   = req.body
   
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