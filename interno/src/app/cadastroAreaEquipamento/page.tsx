'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CadastroAreaEquipamentoPage() {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('NÃO');
  const [anexo, setAnexo] = useState<File | null>(null);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session) {
    router.push('/');
  }

  const handleCodigoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodigo(event.target.value);
  };

  const handleDescricaoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescricao(event.target.value);
  };

  const handleAnexoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAnexo(file || null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!descricao || !anexo) {
      alert('Por favor, preencha a descrição e anexe um PDF.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('codigo', codigo);
      formData.append('descricao', descricao);
      formData.append('status', status);
      if (anexo) {
        formData.append('anexo', anexo);
      }
      // Faça a requisição para o backend aqui usando axios ou fetch
      await axios.post(
        'http://localhost:4000/cadastrarAreaOuEquipamento/cadastrarAreaOuEquipamento',
        formData
      );

      alert('Área ou equipamento cadastrado com sucesso');
      router.push('/');
      // Limpar os campos após o envio bem-sucedido, se necessário
      setCodigo('');
      setDescricao('');
      setStatus('NÃO');
      setAnexo(null);
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
      // Lógica para tratamento de erro
    }
  };

  return (
    <div className="isolate bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cadastro de Áreas ou Equipamentos
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Cadastre as áreas ou equipamentos de trabalho da Alfa Engenharia.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-10" onSubmit={handleSubmit}>
        <div className="gap-x-8 gap-y-6">
          <div>
            <label
              htmlFor="codigo"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Código da Área ou Equipamento
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="codigo"
                id="codigo"
                value={codigo}
                onChange={handleCodigoChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="descricao"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Descrição da Área ou Equipamento
            </label>
            <div className="mt-2.5">
              <textarea
                name="descricao"
                id="descricao"
                value={descricao}
                onChange={handleDescricaoChange}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
              />
            </div>
          </div>
          <div className="mt-2.5">
            <label
              htmlFor="descricao"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Área ou Equipamento liberado?
            </label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="status"
                  value="SIM"
                  checked={status === 'SIM'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-radio text-indigo-600 h-4 w-4"
                />
                <span className="ml-2 text-[#003A65]">Sim</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="NÃO"
                  checked={status === 'NÃO'}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-radio text-indigo-600 h-4 w-4"
                />
                <span className="ml-2 text-[#003A65]">Não</span>
              </label>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="anexo"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Anexo (PDF)
            </label>
            <div className="mt-2.5">
              <input
                type="file"
                name="anexo"
                id="anexo"
                onChange={handleAnexoChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            Cadastrar Área ou Equipamento
          </button>
        </div>
      </form>
    </div>
  );
}
