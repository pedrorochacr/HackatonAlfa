// components/Menu.js
import React from 'react';
import Link from 'next/link';

export default function Menu(){
  return (
    <nav className="bg-[#003A65] p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
          <img src="/assets/logo.png" alt="Logo da Empresa" className="h-[50px]" />
        
      </div>

      {/* Middle Items */}
      <ul className="flex space-x-4 text-white">
        <li>
          <Link className="hover:text-gray-300" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:text-gray-300" href="/">
               Nossa Empresa
            </Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <Link href="/inscricao" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Cadastro de Candidatos</Link>
        <Link href="/" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Reportar</Link>
      </div>
    </nav>
  );
};


