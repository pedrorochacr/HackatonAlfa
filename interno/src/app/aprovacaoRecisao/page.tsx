'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import TabelaSolicitacaoRecisao from '../components/Tabelas/solicitacaoRecisaoTable';
import { useSession } from 'next-auth/react';

export default function aprovacaoFerias() {
  const [aprovacao, setAprovacao] = useState('');
  const [rank, setRank] = useState('');
  const [id_gerente, setId_gerente] = useState('');
  const [id_solicitacaoRecisao, setId_solicitacaoRecisao] = useState('');
  const [visualizacao, setVisualizacao] = useState(false);
  const [visualizacaoResponsavel, setVisualizacaoResponsavel] = useState(false);
  const [solicitacao, setSolicitacao] = useState(null);
  const router = useRouter();
  const {data :session} = useSession();
  const dado = session?.user.id
  
  useEffect(() => {
    // console.log("entrou aqui");
    if(session?.user.nome && aprovacao == "Sim"){
      //setId_gerente(session?.user.nome);
      setVisualizacaoResponsavel(true);
    }else {
      setVisualizacaoResponsavel(false);
    }
  },[aprovacao])
  



  async function pesquisarSolicitacao() {
      const response = await axios.get(
          `http://localhost:4000/aprovacaoRecisao/${id_solicitacaoRecisao}`,
      );
      console.log(response.data)

      alert('Buscando dados no banco');
      if (response.status == 200) {
          setVisualizacao(true);
          setSolicitacao(response.data);
      } else alert('ID inválido');
  }

  const handleAprovacaoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAprovacao(event.target.value);
  };

  const handleRankChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setRank(event.target.value);
  };

  const handleId_gerenteChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setId_gerente(event.target.value);
  };

  const handleId_solicitacaoRecisaoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setId_solicitacaoRecisao(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (visualizacao && ( !aprovacao || !rank || !id_gerente || !id_solicitacaoRecisao)) {
      alert('Todos campos são obrigatórios.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('aprovacao', aprovacao);
      formData.append('rank', rank);
      formData.append('dataFim', id_gerente);
      formData.append('id_solicitacaoFerias', id_solicitacaoRecisao);
      // Faça a requisição para o backend aqui usando axios ou fetch
      await axios.post(
        'http://localhost:4000/aprovacaoRecisao',
        formData
      );

      alert('Solicitação respondida com sucesso');
      router.push('/');
      // Limpar os campos após o envio bem-sucedido, se necessário
      setAprovacao('');
      setRank('');
      setId_gerente('');
      setId_solicitacaoRecisao('');
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
      // Lógica para tratamento de erro
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 bg-[#003A65] lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-40 w-auto"
            width={200}
            height={200}
            src="/alfa_engenharia_logo_vertical_fundo_azul.jpg"
            alt="Alfa Engenharia"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Realize a aprovação de recisão.
          </h2>
        </div>
        <div className="flex items-center justify-between">
            <label
              htmlFor="id_solicitacaoFerias"
              className="block text-sm font-medium leading-6"
            >
              ID para identificação da solicitação:
            </label>
          </div>
          <div className="mt-2">
            <input
              id="id_solicitacaoFerias"
              name="id_solicitacaoFerias"
              type="int"
              required
              value={id_solicitacaoRecisao}
              onChange={handleId_solicitacaoRecisaoChange}
              className="input input-bordered w-full"
            />
            <button onClick={pesquisarSolicitacao} className="btn btn-secondary">
              PESQUISAR
            </button>
          </div>
          <TabelaSolicitacaoRecisao solicitacao={solicitacao}></TabelaSolicitacaoRecisao>
        {visualizacao && (
          <form
            className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
            onSubmit={handleSubmit}
          >
              <div className="flex items-center justify-between">
                  <label
                  htmlFor="aprovacao"
                  className="block text-sm font-medium leading-6"
                  >
                  Aprovado:
                  </label>
              </div>
              <div className="mt-2">
                  <select
                  id="aprovacao"
                  name="aprovacao"
                  value={aprovacao}
                  onChange={handleAprovacaoChange}
                  className="input input-bordered w-full"
                  required
                  >
                  <option value="">Selecione a aprovação</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                  </select>
              </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="rank"
                className="block text-sm font-medium leading-6"
              >
                De 0 a 5 o quanto vc recomendaria essa recontratação:
              </label>
            </div>
            <div className="mt-2">
              <select
                id="rank"
                name="rank"
                value={rank}
                onChange={handleAprovacaoChange}
                className="input input-bordered w-full"
                required
              >
                <option value="">Escolha o ranking</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            {visualizacaoResponsavel && (
            <>
            <div className="flex items-center justify-between">
              <label
                htmlFor="id_gerente"
                className="block text-sm font-medium leading-6"
              >
                Responsável pela aprovação de recisão:
              </label>
            </div>
            <div className="mt-2">
              <input
                id="id_gerente"
                name="id_gerente"
                type="int"
                autoComplete="current-id_gerente"
                required
                value={session?.user.nome}
                onChange={handleId_gerenteChange}
                readOnly // Definindo o campo como somente leitura
                className="input input-bordered w-full"
              />
            </div>
            </>
            )}
            <button className="btn btn-primary btn-block mt-4" type="submit">
              Enviar
            </button>
          </form>
        )}
      </div>
    </>
  );
}
