import Image from 'next/image';
import Link from 'next/link';

export default function Menu() {
  return (
    <nav className="bg-[rgb(0,58,101)] p-4 gap-2 flex flex-col md:flex-row items-center justify-between">
    
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="Logo da Empresa"
          width={50}
          height={50}
        />
      </Link>
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
      <div className="flex items-center space-x-4">
        <Link
          href="/inscricao"
          className="btn btn-primary"
        >
          Cadastro de Candidatos
        </Link>
        <Link
          href="/reports"
          className="btn btn-secondary"
        >
          Reportar
        </Link>
      </div>
    </nav>
  );
}
