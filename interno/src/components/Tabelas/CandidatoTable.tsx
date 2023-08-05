import React, { useEffect, useState } from 'react';




interface Candidato {
    id: number;
    nomeCompletoMae: string;
    nomeCompletoPai: string;
    nomeCompleto: string;
    sexo: string;
    estadoCivil: string;
    grauInstrucao: string;
    raca: string;
    dataNascimento: string;
    nacionalidade: string;
    paisNascimento: string;
    estadoNascimento: string;
    cidadeNascimento: string;
    numeroBotina: number;
    numeroCalca: number;
    tamanhoCamisa: string;
    telefone1: string;
    telefone2: string;
    email: string;
    cep: string;
    pais: string;
    estado: string;
    cidade: string;
    bairro: string;
    tipoLogradouro: string;
    enderecoResidencial: string;
    numero: string;
    complementoEndereco: string;
    rg: string;
    emissorRg: string;
    estadoOrgaoEmissor: string;
    cidadeEmissorRg: string;
    dataEmissao: string;
    numeroCpf: string;
    numeroPis: string;
    funcao: string;
    alojado: string;
    pcd: string;
    
  }

export default function TabelaCandidatos () {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  // Função para fazer o request dos candidatos na URL
  useEffect(() => {
    fetch('http://localhost:4000/candidato/')
      .then((response) => response.json())
      .then((data) => setCandidatos(data))

      .catch((error) => console.error('Erro ao recuperar os candidatos:', error));
  }, []);

  // Função para renderizar os candidatos em uma tabela
  const renderCandidatesTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Sexo</th>
            <th>Estado Civil</th>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        </thead>
        <tbody>
          {candidatos.map((candidato) => (
            <tr key={candidato.id}>
              <td>{candidato.id}</td>
              <td>{candidato.nomeCompleto}</td>
              <td>{candidato.sexo}</td>
              <td>{candidato.estadoCivil}</td>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderCandidatesTable()}
    </div>
  );
};


