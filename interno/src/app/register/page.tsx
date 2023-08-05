'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signUp } from '@/src/lib/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cargo, setCargo] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleCargoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCargo(event.target.value);
  };

  const handleNomeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNome(event.target.value);
  };

  async function register(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      const data = {
        email: email,
        senha: password,
        nome: nome,
        cargo: cargo,
      };

      const status = await signUp(data);
      if (status === 201) {
        alert('Usuário criado com sucesso! Prossiga para o login');
        router.push('/login');
      } else {
        setError('Erro ao criar usuário');
      }
    } catch (e) {
      setError('Erro ao criar usuário');
    }
  }

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
            Crie sua conta
          </h2>
        </div>

        {error && (
          <div className="mt-6 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={register}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
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
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Nome
            </label>
          </div>
          <div className="mt-2">
            <input
              id="nome"
              name="nome"
              type="text"
              required
              value={nome}
              onChange={handleNomeChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Senha
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Cargo
            </label>
          </div>
          <div className="mt-2">
            <input
              id="cargo"
              name="cargo"
              type="text"
              required
              value={cargo}
              onChange={handleCargoChange}
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary btn-block mt-4" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </>
  );
}
