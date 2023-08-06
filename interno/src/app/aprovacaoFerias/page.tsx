'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import TabelaSolicitacao from '../components/Tabelas/solicitacaoFeriasTable';
import TabelaSolicitacaoFerias from '../components/Tabelas/solicitacaoFeriasTable';
import { useSession } from 'next-auth/react';

export default function aprovacaoFerias() {
    const [aprovacao, setAprovacao] = useState('');
    const [id_gerente, setId_gerente] = useState('');
    const [idSolicitacaoFerias, setIdSolicitacaoFerias] = useState('');
    const [visualizacao, setVisualizacao] = useState(false);
    const [visualizacaoResponsavel, setVisualizacaoResponsavel] = useState(false);
    const [solicitacao, setSolicitacao] = useState(null);
    const router = useRouter();
    const {data :session} = useSession();
    
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
            `http://localhost:4000/aprovacaoFerias/${idSolicitacaoFerias}`,
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

    const handleId_gerenteChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setId_gerente(event.target.value);
    };

    const handleId_solicitacaoFeriasChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setIdSolicitacaoFerias(event.target.value);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (visualizacao && (!aprovacao || !id_gerente || !idSolicitacaoFerias)) {
            alert('Todos campos são obrigatórios.');
            return;
        }

        try {  
            console.log(aprovacao, id_gerente, idSolicitacaoFerias);    // Faça a requisição para o backend aqui usando axios ou fetch
            const res = await fetch('http://localhost:4000/aprovacaoFerias/', {
              method: 'POST',
              body: JSON.stringify({
                  "aprovacao": aprovacao,
                  "id_gerente": id_gerente,
                  "id_solicitacaoFerias": idSolicitacaoFerias
               }),
               headers: {
                  'Content-Type': 'application/json'
               }
            });
            
            alert('Solicitação de Férias enviada para aprovação com sucesso');
            //router.push('/');
          } catch (error) {
            console.error('Erro ao salvar resposta:', error);
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
                Realize a aprovação de férias.
              </h2>
            </div>
    
            <div className="flex items-center justify-between mt-4">
              <label
                htmlFor="id_solicitacaoFerias"
                className="block text-sm font-medium leading-6"
              >
                ID para identificação da solicitação:
              </label>
            </div>
            <div className="flex flex-row mt-2 gap-2">
              <input
                id="id_solicitacaoFerias"
                name="id_solicitacaoFerias"
                type="int"
                required
                value={idSolicitacaoFerias}
                onChange={handleId_solicitacaoFeriasChange}
                className="input input-bordered w-full"
              />
              <button onClick={pesquisarSolicitacao} className="btn btn-secondary">
                PESQUISAR
              </button>
            </div>
            <TabelaSolicitacaoFerias solicitacao={solicitacao}></TabelaSolicitacaoFerias>
    
            <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${visualizacao ? '' : 'hidden'}`}>
              <form onSubmit={handleSubmit}>
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
            </div>
          </div>
        </>
      );
}