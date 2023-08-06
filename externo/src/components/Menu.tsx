import Image from 'next/image';
import Link from 'next/link';

export default function Menu() {
  return (
    <nav className="bg-[#003A65] p-4 gap-2 flex flex-col md:flex-row items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="Logo da Empresa"
          width={50}
          height={50}
        />
      </Link>

      {/* Middle Items */}
      <ul className="flex space-x-4 text-white">
        <li>
          <Link className="hover:text-gray-300" href="/">
            Home
          </Link>
        </li>
      </ul>

      {/* Buttons */}
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
