import { authOptions } from '@/src/lib/auth';
import TabelaCandidatos from '../components/Tabelas/CandidatoTable';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CandidatosPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <div className="bg-[#003A65] flex justify-center flex-col items-center">
        <h2 className="text-4xl mb-5">Candidatos Cadastrados</h2>
        <TabelaCandidatos></TabelaCandidatos>
      </div>
    </>
  );
}
