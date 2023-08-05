'use client';
import React, { SetStateAction, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

function verificaLogin(email: string, senha: string) {
  const url = 'http://localhost:3001/verificaUsuario'; // Substitua pela sua URL correta

  const data = {
    email: email,
    senha: senha,
  };

  return axios
    .post(url, data)
    .then(response => {
      // Se a resposta for bem-sucedida, você pode tratar a resposta aqui
      if (response.status === 200) {
        return true;
      } else if (response.status === 201) {
        alert('Email ou senha inválidos');
        return false;
      }
    })
    .catch(error => {
      // Se ocorrer um erro na requisição, você pode tratar o erro aqui
      console.error(error);
      throw error;
    });
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false); // Estado de autorização como boolean
  const router = useRouter();

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSenha(event.target.value);
  };

  return (
    <>
      <div
        className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        style={{ height: '100vh', flexGrow: 1, backgroundColor: '#003A65' }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src="alfa_engenharia_logo_vertical_fundo_azul.jpg"
            alt="Alfa Engenharia"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Faça login na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Senha
              </label>

              <div className="text-sm">
                <label
                  onClick={() => router.push('/criarConta')}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Criar Conta
                </label>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={senha}
                onChange={handleSenhaChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                verificaLogin(email, senha)
                  .then(result => {
                    if (result === true) {
                      // Login bem-sucedido, atualiza o estado para autorizado
                      setIsAuthorized(true);
                      // Outras ações, caso necessário
                    } else {
                      // Login inválido, atualiza o estado para não autorizado
                      setIsAuthorized(false);
                      console.log('Email ou senha inválidos');
                    }
                  })
                  .catch(error => {
                    // Tratar o erro da Promise, se necessário
                    console.error(error);
                  });
              }}
            >
              Login
            </button>
          </div>

          {/* Exemplo de exibição condicional com base no estado de autorização */}
          {isAuthorized ? (
            <p className="text-green-600 mt-4 text-center">Login bem-sucedido! Você está autorizado.</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
