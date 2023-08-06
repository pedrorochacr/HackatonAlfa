'use client';

import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

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
  admitido: boolean;
  funcao: string;
  alojado: string;
  pcd: string;
}

export default function TabelaCandidatos() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidato>();
  const regex = /"/g;
  const [atualizou, setAtualizou] = useState(false);
  // Função para fazer o request dos candidatos na URL
  useEffect(() => {
    setAtualizou(false);
    fetch('http://localhost:4000/candidato/')
      .then((response) => response.json())
      .then((data) => setCandidatos(data))
      .catch((error) =>
        console.error('Erro ao recuperar os candidatos:', error)
      );
  }, [atualizou]);
  const togglePopup = (candidato: Candidato | null) => {
    setShowPopup(!showPopup);
    if (candidato) {
      setSelectedCandidate(candidato);
    }
  };
  function aprovarCandidato(candidato: Candidato) {
    axios
      .post('http://localhost:4000/candidato/aprovaCandidato', candidato)
      .then((response) => {
        if (response.status === 200) {
          setAtualizou(true);
        }
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Erro ao aprovar candidato:', error);
      });
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Sexo </th>
              <th>Email</th>
              <th>Admitido</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((candidato) => (
              <tr
                className=" cursor-pointer btn-ghost"
                key={candidato.id}
                onClick={() => togglePopup(candidato)}
              >
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">
                        {candidato.nomeCompleto.replace(regex, '')}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">
                        {candidato.sexo.replace(regex, '')}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">
                        {candidato.email.replace(regex, '')}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div
                        className={`font-bold ${
                          candidato.admitido ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {candidato.admitido ? 'SIM' : 'NÃO'}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {candidato.admitido ? (
                    <p className="font-bold text-yellow-500">Admitido!</p>
                  ) : (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        aprovarCandidato(candidato);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      Aprovar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && selectedCandidate && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
            <div className="bg-white p-12 rounded-md popup">
              <h2 className="text-xl font-bold mb-4 text-[#003A65]">
                Detalhes do Candidato
              </h2>
              <p className="text-[#003A65]">
                Nome Completo da Mãe:{' '}
                {selectedCandidate.nomeCompletoMae.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Nome Completo do Pai:{' '}
                {selectedCandidate.nomeCompletoPai.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Telefone 1: {selectedCandidate.telefone1.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Telefone 2: {selectedCandidate.telefone2.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                CEP: {selectedCandidate.cep.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                País: {selectedCandidate.pais.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Estado: {selectedCandidate.estado.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Cidade: {selectedCandidate.cidade.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Bairro: {selectedCandidate.bairro.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Tipo de Logradouro:{' '}
                {selectedCandidate.tipoLogradouro.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Endereço Residencial:{' '}
                {selectedCandidate.enderecoResidencial.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Número: {selectedCandidate.numero.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Complemento do Endereço:{' '}
                {selectedCandidate.complementoEndereco.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                RG: {selectedCandidate.rg.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Órgão Emissor do RG:{' '}
                {selectedCandidate.emissorRg.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Estado do Órgão Emissor:{' '}
                {selectedCandidate.estadoOrgaoEmissor.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Cidade do Órgão Emissor do RG:{' '}
                {selectedCandidate.cidadeEmissorRg.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Data de Emissão do RG:{' '}
                {selectedCandidate.dataEmissao.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Número do CPF: {selectedCandidate.numeroCpf.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Número do PIS: {selectedCandidate.numeroPis.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Admitido: {selectedCandidate.admitido ? 'Sim' : 'Não'}
              </p>
              <p className="text-[#003A65]">
                Função: {selectedCandidate.funcao.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Alojado: {selectedCandidate.alojado.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                PCD (Pessoa com Deficiência):{' '}
                {selectedCandidate.pcd.replace(regex, '')}
              </p>
              <p className="text-[#003A65]">
                Número da Calça: {selectedCandidate.numeroCalca}
              </p>
              <p className="text-[#003A65]">
                Tamanho da Camisa:{' '}
                {selectedCandidate.tamanhoCamisa.replace(regex, '')}
              </p>
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={() => togglePopup(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
