'use client';
import React, { SetStateAction, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import TabelaCandidatos from '@/src/components/Tabelas/CandidatoTable';


export default function CandidatosPage() {

  return (
    <>
     <div>
        <h2>Candidatos Cadastrados</h2>
        <TabelaCandidatos></TabelaCandidatos>
     </div>
       
    </>
  );
}
