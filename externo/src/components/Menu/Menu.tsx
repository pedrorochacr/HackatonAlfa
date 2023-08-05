// components/Menu.js
import React from 'react';
import Link from 'next/link';

export default function Menu(){
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/path/to/your-logo.png"  // Replace with the path to your logo image
          alt="Logo"
          className="w-8 h-8"
        />
        <span className="text-white font-semibold">Your Logo</span>
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Cadastro</button>
      </div>
    </nav>
  );
};


