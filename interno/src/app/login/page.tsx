'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSenha(event.target.value);
  };

  async function login(event: { preventDefault: () => void }) {
    event.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      senha: senha,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    window.location.href = '/';
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
            Faça login na sua conta
          </h2>
        </div>

        {error && (
          <div className="mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </div>
        )}

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={login}
        >
          <div>
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
          </div>

          <div>
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
                value={senha}
                onChange={handleSenhaChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button className="btn btn-primary w-full mt-2" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
