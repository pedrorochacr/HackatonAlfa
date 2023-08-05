'use client';
import React, { useState } from 'react';
import "./page.css";
import { useRouter } from 'next/navigation';
import axios from "axios";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
function criarUsuario(nome: string, email: string, senha: string) {
    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    
    axios.post("http://localhost:3001/criaUsuario", novoUsuario)
    .then(response => {
      console.log('Usuário criado com sucesso');
      
      // Faça o tratamento adicional necessário após a criação do usuário
    })
    .catch(error => {
      console.error('Erro ao criar usuário', error);
      // Faça o tratamento de erro necessário
    });
  } 
export default function CreateAccount() {
  const [agreed, setAgreed] = useState(false)
  const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const router = useRouter();
  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };
  const handleSenhaChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSenha(event.target.value);
  };
  const handleNomeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNome(event.target.value);
  };
  return (
    <div
        className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        style={{ height: '100vh', flexGrow: 1, backgroundColor: '#003A65' }}
    >
      <div
        className="absolute inset-x-0 top-[-10rem]  -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-80rem]"
        aria-hidden="true"
      >
        { <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        /> }
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Crie sua conta</h2>
       
      </div>
        <div className="grid inputs grid-cols-1 gap-x-30 gap-y-6 sm:grid-cols-2 justify-center">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6">
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
                className="block nomeInput rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
         
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                className="block emailInput w-300 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6">
              Senha
            </label>
            <div className="mt-2.5">
              <input
                id="password"
                name="password"
                type="password"
                value={senha}
                onChange={handleSenhaChange}
                autoComplete="current-password"
                required
                className="block senhaInput w-300 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block botaoCriar w-full rounded-md bg-indigo-600 px-3.5 py-2.5  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={()=>{
                criarUsuario(nome, email, senha) 
                router.push('/')  
            }}
          >
            Criar Conta
          </button>
        </div>
    </div>
  )
}