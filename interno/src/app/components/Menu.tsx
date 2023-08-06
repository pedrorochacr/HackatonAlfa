import Link from 'next/link';
import { LogoutButton } from './LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';

export default async function Menu() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-[#003A65] p-4 gap-2 flex flex-col md:flex-row items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/assets/logo.png"
          alt="Logo da Empresa"
          className="h-[50px]"
        />
      </div>
      {/* Buttons */}
      <div className="flex items-center space-x-4">
        {session ? (
          <LogoutButton />
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
        {session && (
          <Link
            href="/reports"
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-blue-600"
          >
            Reports
          </Link>
        )}
        {session && (
          <Link
            href="/candidatos"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Candidatos
          </Link>
        )}
        {session && (
          <Link
            href="/cadastroAreaEquipamento"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Equipamentos
          </Link>
        )}
      </div>
    </nav>
  );
}
