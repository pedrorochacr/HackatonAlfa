'use client';
import React, { SetStateAction, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TabelaReports from '../components/Tabelas/ReportsTable';

export default function ReportsPage() {
  return (
    <>
      <div className="bg-[#003A65] h-screen flex justify-center flex-col items-center">
        <h2 className="text-4xl mb-5">Reports Enviados</h2>
        <TabelaReports></TabelaReports>
      </div>
    </>
  );
}
