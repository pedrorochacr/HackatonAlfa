'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SolicitacaoFerias() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [id_colaborador, setId_colaborador] = useState('');
  const router = useRouter();

  const handleDataInicioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDataInicio(event.target.value);
  };

  const handleDataFinalChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDataFinal(event.target.value);
  };

  const handleId_colaboradorChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setId_colaborador(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!dataInicio || !dataFinal || !id_colaborador) {
      alert('Todos campos são obrigatórios.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/solicitacaoFerias/', {
        method: 'POST',
        body: JSON.stringify({
          dataInicio: dataInicio,
          dataFinal: dataFinal,
          id_colaborador: id_colaborador,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Solicitação de Férias enviada para aprovação com sucesso');
      router.push('/');
      // Limpar os campos após o envio bem-sucedido, se necessário
      setDataInicio('');
      setDataFinal('');
      setId_colaborador('');
    } catch (error) {
      console.error('Erro ao enviar relato:', error);
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
            Faça sua solicitação de férias.
          </h2>
        </div>

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="dataInicio"
            className="block text-sm font-medium leading-6"
          >
            Data do início do período de férias:
          </label>
          <div className="mt-2">
            <input
              id="dataInicio"
              name="dataInicio"
              type="date"
              autoComplete="dataInicio"
              required
              value={dataInicio}
              onChange={handleDataInicioChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="dataFinal"
              className="block text-sm font-medium leading-6"
            >
              Data do fim do período de férias:
            </label>
          </div>
          <div className="mt-2">
            <input
              id="dataFinal"
              name="dataFinal"
              type="date"
              autoComplete="current-dataFinal"
              required
              value={dataFinal}
              onChange={handleDataFinalChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="id_colaborador"
              className="block text-sm font-medium leading-6"
            >
              ID para identificação do colaborador:
            </label>
          </div>
          <div className="mt-2">
            <input
              id="id_colaborador"
              name="id_colaborador"
              type="text"
              required
              value={id_colaborador}
              onChange={handleId_colaboradorChange}
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary btn-block mt-4" type="submit">
            Solicitar
          </button>
        </form>
      </div>
    </>
  );
}
