'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

export default function solocitacaoFerias() {
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('');
  const [id_colaborador, setId_colaborador] = useState('');
  const router = useRouter();

  const handleDataChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setData(event.target.value);
  };

  const handleTipoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTipo(event.target.value);
  };

  const handleId_colaboradorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setId_colaborador(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!data || !tipo || !id_colaborador) {
      alert('Todos campos são obrigatórios.');
      return;
    }
    try {  
      console.log(data, tipo, id_colaborador);    // Faça a requisição para o backend aqui usando axios ou fetch
      const res = await fetch('http://localhost:4000/solicitacaoRecisao/', {
        method: 'POST',
        body: JSON.stringify({
            "data": data,
            "tipo": tipo,
            "id_colaborador": id_colaborador 
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      
      alert('Solicitação de Recisão enviada para aprovação com sucesso');
      router.push('/');
      // Limpar os campos após o envio bem-sucedido, se necessário
      setData('');
      setTipo('');
      setId_colaborador('');
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
            Faça uma solicitação de recisão.
          </h2>
        </div>

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="data"
            className="block text-sm font-medium leading-6"
          >
            Data da recisão:
          </label>
          <div className="mt-2">
            <input
              id="data"
              name="data"
              type="date"
              autoComplete="data"
              required
              value={data}
              onChange={handleDataChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="tipo"
              className="block text-sm font-medium leading-6"
            >
              Tipo de recisão:
            </label>
          </div>
          <div className="mt-2">
            <select
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={handleTipoChange}
              className="input input-bordered w-full"
              required
            >
              <option value="">Selecione</option>
              <option value="Redução de efetivo">Redução de efetivo</option>
              <option value="Demissão por desempenho">Demissão por desempenho</option>
              <option value="Justa causa">Justa causa</option>
              <option value="Pedido de demissão">Pedido de demissão</option>
              <option value="Acordo legal">Acordo legal</option>
            </select>
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
