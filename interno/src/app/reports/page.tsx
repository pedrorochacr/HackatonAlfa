'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TabelaReports from '../components/Tabelas/ReportsTable';
import { useSession } from 'next-auth/react';

export default function ReportsPage() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session || session.user.cargo !== 'admin') {
    router.push('/');
  }

  return (
    <>
      <div className="bg-[#003A65] flex justify-center flex-col items-center">
        <div className="flex justify-between w-screen px-7">
          <h2 className="text-4xl mb-5  text-white">Reports Enviados</h2>
        </div>
        <TabelaReports
          mostrarPopup={mostrarPopup}
          setMostrarPopup={setMostrarPopup}
        ></TabelaReports>
      </div>
    </>
  );
}
