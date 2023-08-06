'use client';
import React, { SetStateAction, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import TabelaReports from '../components/Tabelas/ReportsTable';




export default function ReportsPage() {
    const [mostrarPopup, setMostrarPopup] = useState(false);
  return (
    <>
     <div className='bg-[#003A65] h-screen flex justify-center flex-col items-center'>
        <div className='flex justify-between w-screen px-7'>
            <h2 className='text-4xl mb-5  text-white'>Reports Enviados</h2>
            <button onClick={() => setMostrarPopup(true)} className='px-3 py-1 bg-red-500 text-white rounded'>Abrir Mapa de Calor</button>
        </div>
    
        <TabelaReports mostrarPopup={mostrarPopup} setMostrarPopup={setMostrarPopup} ></TabelaReports>
        
     </div>
       
    </>
  );
}
