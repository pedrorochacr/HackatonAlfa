'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const [nome, setNome] = useState('');
  const [centroDeCustos, setCentroDeCustos] = useState('');
  const [refAreaAtuacao, setRefAreaAtuacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState<{ file: File | null; filled: boolean; }[]>([{ file: null, filled: false }]);
  const router = useRouter();

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleCentroDeCustosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCentroDeCustos(event.target.value);
  };

  const handleRefAreaAtuacaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefAreaAtuacao(event.target.value);
  };

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(event.target.value);
  };

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    const newFotos = [...fotos];
    if (file) {
      newFotos[index] = { file, filled: true };
      setFotos(newFotos);
    }
  };

  const handleAddFoto = () => {
    if (fotos.length < 3) {
      setFotos([...fotos, { file: null, filled: false }]);
    }
  };

  const handleRemoveFoto = (index: number) => {
    if (fotos.length > 1) {
      const newFotos = fotos.filter((_, i) => i !== index);
      setFotos(newFotos);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('centroDeCustos', centroDeCustos);
      formData.append('refAreaAtuacao', refAreaAtuacao);
      formData.append('descricao', descricao);
      fotos.forEach((foto, index) => {
        if (foto.file) {
          formData.append(`foto${index + 1}`, foto.file);
        }
      });

      await axios.post('/api/submit-report', formData);

      // Após o envio bem-sucedido, redirecionar para a página inicial
      router.push('/');
    } catch (error) {
      // Lógica para tratamento de erro
      console.error('Erro ao enviar relato:', error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Entre em contato</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Reporte seu relato sobre segurança do trabalho na Alfa Engenharia.
          (Ocorrências, críticas e ideias).
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Nome
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={nome}
                onChange={handleNomeChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="centro-de-custos" className="block text-sm font-semibold leading-6 text-gray-900">
              Centro de Custos
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="centro-de-custos"
                id="centro-de-custos"
                value={centroDeCustos}
                onChange={handleCentroDeCustosChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ref-area-atuacao" className="block text-sm font-semibold leading-6 text-gray-900">
              Referência da Área de Atuação
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="ref-area-atuacao"
                id="ref-area-atuacao"
                value={refAreaAtuacao}
                onChange={handleRefAreaAtuacaoChange}
                autoComplete="email"
                className="block w-300 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-semibold leading-6 text-gray-900">
              Descrição do Relato
            </label>
            <div className="mt-2.5">
              <textarea
                name="descricao"
                id="descricao"
                value={descricao}
                onChange={handleDescricaoChange}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {fotos.map((foto, index) => (
            <div key={index} className="sm:col-span-2">
              <label htmlFor={`foto${index + 1}`} className="block text-sm font-semibold leading-6 text-gray-900">
                Foto {index + 1}
              </label>
              <div className="mt-2.5 flex items-center">
                <input
                  type="file"
                  name={`foto${index + 1}`}
                  id={`foto${index + 1}`}
                  onChange={(event) => handleFotoChange(event, index)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFoto(index)}
                    className="ml-2 px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddFoto}
            className="inline-flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Adicionar Foto
          </button>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Contate-nos
          </button>
        </div>
      </form>
    </div>
  );
}