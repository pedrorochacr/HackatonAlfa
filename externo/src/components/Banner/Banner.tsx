// components/Menu.js
import React from 'react';
import Link from 'next/link';
import "./Banner.css"
export default function Banner(){
  return (
        <>
            <div className="bg-[url('/assets/banner.jpg')] h-[650px] bg-cover bg-center flex items-center justify-center">
                
                <div className="absolute gradient pt-20 flex w-screen bg-gradient-to-b from-transparent via-[#003A65] to-[#003A65] h-3/4">
                    <img src="/assets/logo.png" alt="Logo da Empresa" className="h-[220px]" />
                   <h1 className="text-white text-4xl mx-5 font-bold">Bem-vindo ao nosso portal</h1>
                </div>
            </div>
        
        </>
  );
};


