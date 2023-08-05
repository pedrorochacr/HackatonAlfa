// components/Menu.js
import React from 'react';
import Link from 'next/link';

export default function Menu(){
  return (
    <nav className={`bg-gray-800 p-4`}>
      <ul className={`flex space-x-4 text-white`}>
        <li>
          <Link   href="/">
             Home
          </Link>
        </li>
        <li>
        <Link  href="/">
             Cadastro de Candidatos
          </Link>
        </li>
        <li>
        <Link   href="/">
             Cadastro de Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};


