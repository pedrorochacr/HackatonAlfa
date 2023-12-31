const express = require('express');
const router = express.Router();
const multer = require('multer');
const utils = require('../lib/utils');

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
router.post(
  '/cadastrarCandidato',
  upload.fields([
    { name: 'arquivoIdentidade', maxCount: 1 },
    { name: 'arquivoCpf', maxCount: 1 },
    { name: 'arquivoCurriculo', maxCount: 1 },
    { name: 'arquivoCnh', maxCount: 1 },
    { name: 'arquivoReservista', maxCount: 1 },
  ]),
  async (req, res) => {
    const {
      nomeCompletoMae,
      nomeCompletoPai,
      nomeCompleto,
      sexo,
      estadoCivil,
      grauInstrucao,
      raca,
      dataNascimento,
      nacionalidade,
      paisNascimento,
      estadoNascimento,
      cidadeNascimento,
      numeroBotina,
      numeroCalca,
      tamanhoCamisa,
      telefone1,
      telefone2,
      email,
      cep,
      pais,
      estado,
      cidade,
      bairro,
      tipoLogradouro,
      enderecoResidencial,
      numero,
      complementoEndereco,
      rg,
      emissorRg,
      estadoOrgaoEmissor,
      cidadeEmissorRg,
      dataEmissao,
      numeroCpf,
      numeroPis,
      funcao,
      alojado,
      pcd,
      parenteOuAmigo,
      conhecidoNome,
      conhecidoCidade,
      conhecidoFuncao,
    } = req.body;
    let dependentes;
    if (req.body.dependentes) {
      dependentes = JSON.parse(req.body.dependentes);
    }

    let similaridadeIdentidade = 0,
      similaridadeCnh = 0,
      similaridadeReservista = 0;

    const arquivoIdentidade = req.files['arquivoIdentidade'][0].filename;
    if (arquivoIdentidade !== '')
      parseInt(
        (similaridadeIdentidade = await utils.execShellCommand(
          `python main.py uploads/${arquivoIdentidade} rg`
        ))
      );

    const arquivoCpf = req.files['arquivoCpf'][0].filename;
    const arquivoCurriculo = req.files['arquivoCurriculo'][0].filename;

    const arquivoCnh = req.files['arquivoCnh']
      ? req.files['arquivoCnh'][0].filename
      : '';
    if (arquivoCnh !== '')
      parseInt(
        (similaridadeCnh = await utils.execShellCommand(
          `python main.py uploads/${arquivoCnh} cnh`
        ))
      );

    const arquivoReservista = req.files['arquivoReservista']
      ? req.files['arquivoReservista'][0].filename
      : '';
    if (arquivoReservista !== '')
      similaridadeReservista = parseInt(
        await utils.execShellCommand(
          `python main.py uploads/${arquivoReservista} reservista`
        )
      );

    if (similaridadeIdentidade < 10 && similaridadeIdentidade != 0) {
      res
        .status(400)
        .json({ error: 'Identidade não está legível. Adicione outra imagem' });
      return;
    }

    if (similaridadeCnh < 10 && similaridadeCnh != 0) {
      res
        .status(400)
        .json({ error: 'CNH não está legível. Adicione outra imagem' });
      return;
    }

    if (similaridadeReservista < 10 && similaridadeReservista != 0) {
      res
        .status(400)
        .json({ error: 'Reservista não está legível. Adicione outra imagem' });
      return;
    }

    const connection = createConnection();
    connection.query(
      'INSERT INTO CANDIDATO (nomeCompletoMae, nomeCompletoPai, nomeCompleto, sexo, estadoCivil, grauInstrucao, raca, dataNascimento, nacionalidade, paisNascimento, estadoNascimento, cidadeNascimento, numeroBotina, numeroCalca, tamanhoCamisa, telefone1, telefone2, email, cep, pais, estado, cidade, bairro, tipoLogradouro, enderecoResidencial, numero, complementoEndereco, rg, emissorRg, estadoOrgaoEmissor, cidadeEmissorRg, dataEmissao, numeroCpf, numeroPis, funcao, alojado, pcd, arquivoIdentidade, arquivoCpf, arquivoCurriculo, arquivoCnh, arquivoReservista, parenteOuAmigo, admitido, conhecidoNome, conhecidoCidade, conhecidoFuncao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nomeCompletoMae,
        nomeCompletoPai,
        nomeCompleto,
        sexo,
        estadoCivil,
        grauInstrucao,
        raca,
        dataNascimento,
        nacionalidade,
        paisNascimento,
        estadoNascimento,
        cidadeNascimento,
        numeroBotina,
        numeroCalca,
        tamanhoCamisa,
        telefone1,
        telefone2,
        email,
        cep,
        pais,
        estado,
        cidade,
        bairro,
        tipoLogradouro,
        enderecoResidencial,
        numero,
        complementoEndereco,
        rg,
        emissorRg,
        estadoOrgaoEmissor,
        cidadeEmissorRg,
        dataEmissao,
        numeroCpf,
        numeroPis,
        funcao,
        alojado,
        pcd,
        arquivoIdentidade,
        arquivoCpf,
        arquivoCurriculo,
        arquivoCnh,
        arquivoReservista,
        parenteOuAmigo,
        false,
        conhecidoNome,
        conhecidoCidade,
        conhecidoFuncao,
      ],
      (err, result) => {
        if (err) {
          console.error('Erro ao inserir os dados:', err);
          res
            .status(500)
            .json({ error: 'Erro ao inserir os dados no banco de dados.' });
        } else {
          console.log('Candidato cadastrado com sucesso!');
          if (dependentes && dependentes.length > 0) {
            // Se o candidato for cadastrado com sucesso e esse possui dependentes, eles serão inseridos
            insertDependentes(result.insertId, dependentes, (err) => {
              if (err) {
                console.error('Erro ao inserir os dependentes:', err);
                res.status(500).json({
                  error: 'Erro ao inserir os dependentes no banco de dados.',
                });
              } else {
                console.log('Dependentes cadastrados com sucesso!');
              }
            });
          }
          res.status(200).json({
            message: 'Candidato cadastrado com sucesso!',
            nomeCompleto: nomeCompleto,
            similaridadeIdentidade: similaridadeIdentidade,
            similaridadeCnh: similaridadeCnh,
            similaridadeReservista: similaridadeReservista,
          });
        }
      }
    );
  }
);
router.get('/', async (req, res) => {
  // Rota que cadastra um report no banco de dados
  const connection = createConnection();
  connection.query('select * from CANDIDATO', (err, result) => {
    if (err) {
      console.error('Erro ao pesquisar candidatos:', err);
      res.status(500).json({ error: 'Erro ao pesquisar candidatos' });
    } else {
      const resultado = result;

      res.send(resultado);
    }
  });
});

router.post('/aprovaCandidato', (req, res) => {
  const candidato = req.body;
  const query = 'UPDATE CANDIDATO SET admitido = 1 where id = ?';
  const connection = createConnection();
  connection.query(query, candidato.id, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar candidato:', err.message);
      return;
    }
    console.log('Candidato atualizado com sucesso.');
    const venom = require('venom-bot');
    venom
      .create({
        session: 'bot',
        headless: false,
      })
      .then((client) => start(client))
      .catch((erro) => {
        console.log(erro);
      });
    function start(client) {
      telefone = candidato.telefone1.replace(/"/g, '');

      client
        .sendText(
          `55${telefone}@c.us`,
          'Olá, voce foi aprovado no processo seletivo!'
        )
        .then((result) => {})
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    res.status(200).json({ message: 'Sucesso!' });
  });
});

router.get('/listarFuncoes', async (req, res) => {
  const connection = createConnection();
  connection.query(
    'SELECT * FROM funcao ORDER BY descricao ASC',
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        res
          .status(500)
          .json({ error: 'Erro ao inserir os dados no banco de dados.' });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Função para inserir os dependentes na tabela "dependentes" usando callbacks
function insertDependentes(idCandidato, dependentes) {
  // Monta os valores para o INSERT na tabela "dependentes"
  const values = dependentes.map((dependente) => [
    idCandidato,
    dependente.nomeCompleto,
    dependente.cpf,
    dependente.sexo,
    dependente.dataNascimento,
    dependente.grauParentesco,
  ]);
  const connection = createConnection();

  for (const dependente of values) {
    // Executa o INSERT
    const sql =
      'INSERT INTO dependente (idCandidato, nome, cpf, sexo, dataNascimento, grauParentesco) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, dependente, (err, result) => {
      if (err) {
        console.error('Falha ao cadastrar candidatos :', err);
      }
    });
  }
}

module.exports = router;
