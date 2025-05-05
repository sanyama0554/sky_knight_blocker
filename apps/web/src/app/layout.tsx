import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Header, Footer } from './components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '騎空士ブロッカー',
  description: '',
};

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
