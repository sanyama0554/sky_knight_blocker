import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Container } from '@mui/material';
import { AuthProvider } from '../lib/contexts/AuthContext';
import { Footer, Header } from './components/common';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '騎空士ブロッカー',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={inter.className}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AuthProvider>
          <Header />
          <Container maxWidth="md">{children}</Container>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
