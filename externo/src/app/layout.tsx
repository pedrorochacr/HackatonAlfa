import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Menu from '@/components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portal Externo Alfa',
  description: 'Tela inicial do portal externo da empresa Alfa',
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
        {children}
      </body>
    </html>
  );
}
