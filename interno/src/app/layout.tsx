import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import Menu from './components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Painel Interno Alfa',
  description: 'Painel para assuntos internos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Menu />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
