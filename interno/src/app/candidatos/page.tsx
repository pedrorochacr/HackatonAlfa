'use client';
import React, { SetStateAction, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import TabelaCandidatos from '@/src/components/Tabelas/CandidatoTable';


export default function CandidatosPage() {

  return (
    <>
     <div className='bg-[#003A65] h-screen flex justify-center flex-col items-center'>
        <h2 className='text-4xl mb-7'>Candidatos Cadastrados</h2>
        <TabelaCandidatos></TabelaCandidatos>
     </div>
       
    </>
  );
}
